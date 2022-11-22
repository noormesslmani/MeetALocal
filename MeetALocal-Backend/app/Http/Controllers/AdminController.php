<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Ban;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Country;
use App\Models\EventCategory;
use App\Models\Event;
use App\Models\FavoriteLocal;
use App\Models\Highlight;
use App\Models\LocalCategory;
use App\Models\Message;
use App\Models\Notification;
use App\Models\PostCategory;
use App\Models\Post;
use App\Models\SavedEvent;
use App\Models\UserType;
use App\Models\Language;
use App\Models\UserLanguage;
use Illuminate\Support\Facades\Auth;
use Validator;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function toggleBan(Request $request){
        $user_type=User::find($request->user_id)->type()->pluck('user_type')[0];
        if($user_type=='Admin'){
            return response()->json([
                'message' => 'action forbidden',
            ], 403);
        }
        if(Ban::where('banned_id',$request->user_id)->exists()){
            Ban::where('banned_id',$request->user_id)->delete();
            return response()->json([
                'message' => 'ok',
            ], 201);
        }
        else{
            Ban::create([
                'banner_id' => Auth::id(),
                'banned_id'=> $request->user_id
            ]);
            return response()->json([
                'message' => 'ok',
            ], 201);
        }
    }
    public function getBans(){
        $bans=Ban::join('users','users.id','banned_id')->get();
        foreach($bans as $ban){
           $ban['ban']=true;   
        }
        return response()->json([
            'message' => 'ok',
            'data' => $bans,
        ], 201);
    }
    public function getAppStat(){
        $users=User::count();
        $events=Event::count();
        $posts=Post::count();
        $comments=Comment::count();
        $data = array(
            'users_nb' => $users,
            'events_nb' => $events,
            'posts_nb' => $posts,
            'comments_nb' => $comments,
        );
        return response()->json([
            'message' => 'ok',
            'data' => $data,
        ], 201);
    }
   
    public function getUsers(Request $request){
        $type=$request->query('type');
        $offset=$request->query('offset');
        $validator = Validator::make(['type' => $type], [
            'type' => 'required|in:Local,Foreigner',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $type_id=UserType::where('user_type',$type)->pluck('id')[0];
        $users=User::join('countries','residence_id','countries.id')->where('type_id',$type_id)->orderBy('created_at', 'desc')->offset($offset)
        ->limit(10)->get(['users.id','name','email','created_at','country', 'gender']);
        foreach($users as $user){
            $user['ban']=false;
            if(Ban::where('banned_id', $user->id)->exists()){
                $user['ban']=true;
            }
            
        }
        return response()->json([
            'message' => 'ok',
            'data' => $users,
        ], 201);
    }
    public function searchUsers(Request $request){
        $search=$request->query('name');
        $type=$request->query('type');
        $offset=$request->query('offset');
        $validator = Validator::make(['type' => $type], [
            'type' => 'required|in:Local,Foreigner',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $type_id=UserType::where('user_type',$type)->pluck('id')[0];
        $results=User::join('countries','residence_id','countries.id')->where('type_id',$type_id)->where('name', 'LIKE', '%'.$search.'%')->orderBy('created_at', 'desc')->offset($offset)->limit(10)->get(['users.id','name','email','created_at','country', 'gender']);
        return response()->json([
            'message' => 'ok',
            'data' => $results,
        ], 201);
    }


    public function getLocalsStat(){
        $young=0;
        $middle=0;
        $old=0;
        foreach(User::where('type_id',1)->get() as $local){
            if($local->age()<30)
                $young ++;
            else if($local->age()>=60)
                $old ++;
            else 
                $middle ++;
        }
        $total=User::where('type_id',1)->count();
        $males=User::where('type_id',1)->where('gender','Male')->count();
        $females=$total-$males;
        $top_categories=LocalCategory::join('categories','categories.id','category_id')->selectRaw('category, COUNT(*) as count') ->groupBy('category')->orderBy('count', 'desc')->take(3)->get();
        $top_languages=UserLanguage::whereIn('user_id',User::where('type_id',1)->pluck('id'))->join('languages','languages.id','language_id')->selectRaw('language, COUNT(*) as count') ->groupBy('language')->orderBy('count', 'desc')->take(3)->get();
        $data = array(
            'locals_nb' => $total,
            'male%' => $males/$total*100,
            'female%' => $females/$total*100,
            'top_categories' => $top_categories,
            'top_languages' =>$top_languages,
            'ages' =>[$young, $middle, $old]
        );
        return response()->json([
            'message' => 'ok',
            'data' => $data,
        ], 201);
    }
    public function getForeignersStat(){
        $young=0;
        $middle=0;
        $old=0;
        foreach(User::where('type_id',2)->get() as $foreigner){
            if($foreigner->age()<30)
                $young ++;
            else if($foreigner->age()>=60)
                $old ++;
            else 
                $middle ++;
        }
        $total=User::where('type_id',2)->count();
        $males=User::where('type_id',2)->where('gender','Male')->count();
        $females=$total-$males;
        $top_languages=UserLanguage::whereIn('user_id',User::where('type_id',2)->pluck('id'))->join('languages','languages.id','language_id')->selectRaw('language, COUNT(*) as count') ->groupBy('language')->orderBy('count', 'desc')->take(3)->get();
        $top_countries=Country::join('users','countries.id','residence_id')->whereIn('users.id',User::where('type_id',2)->pluck('id'))->selectRaw('country, COUNT(*) as count') ->groupBy('country')->orderBy('count', 'desc')->take(3)->get();
        $data = array(
            'locals_nb' => $total,
            'male%' => $males/$total*100,
            'female%' => $females/$total*100,
            'top_languages' =>$top_languages,
            'top_countries' =>$top_countries,
            'ages' =>[$young, $middle, $old]
        );
        return response()->json([
            'message' => 'ok',
            'data' => $data,
        ], 201);
    }
    public function getLocations(){
        $locations=User::where('type_id',1)->get(['latitude','longitude']);
        return response()->json([
            'message' => 'ok',
            'data' => $locations,
        ], 201);
    }
}
