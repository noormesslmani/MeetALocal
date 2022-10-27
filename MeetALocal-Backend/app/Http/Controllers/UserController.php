<?php

namespace App\Http\Controllers;

use App\Models\User;
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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    public function getLocals($country, $fees, $category){
        $country!='all'? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        if($fees=='all')
            $fees=100;
        $category!='all'? $category_id=Category::where('category',$category)->pluck('id'):$category_id=Category::pluck('id');
        $data= User::join('local_categories','users.id','=','local_id')->where('users.type_id',1)->whereIn('users.residence_id',$country_id)->where('users.fees','<=',$fees)->whereIn('local_categories.category_id',$category_id)->get();
        return response()->json([
            'message' => 'ok',
            'data' => $data
        ], 201);
    }

    public function getEvents($country, $fees, $category){
        $country!='all'? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        if($fees=='all')
            $fees=100;
        $category!='all'? $category_id=Category::where('category',$category)->pluck('id'):$category_id=Category::pluck('id');
        $data= Event::join('event_categories','events.id','=','event_id')->whereIn('events.country_id',$country_id)->where('events.fees','<=',$fees)->whereIn('event_categories.category_id',$category_id)->get();
        return response()->json([
            'message' => 'ok',
            'data' => $data
        ], 201);
    }
    public function toggleSavedEvents(Request $request){
        if(SavedEvent::where('user_id',Auth::id())->where('event_id',$request->event_id)->exists())
            SavedEvent::where('user_id',Auth::id())->where('event_id',$request->event_id)->delete();
        else{
            SavedEvent::create([
                'user_id' => Auth::id(),
                'event_id'=> $request->event_id,
            ]);
        }
        return response()->json([
            'message' => 'ok',
        ], 201);
    }
    public function getSavedEvents(){
        $data= Auth::user()->savedEvents()->get();
        return response()->json([
            'message' => 'ok',
            'data' => $data,
        ], 201);
    }
    public function getPosts($country, $category){
        $country!='all'? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        $category!='all'? $category_id=Category::where('category',$category)->pluck('id'):$category_id=Category::pluck('id');
        $data= Post::join('post_categories','posts.id','=','post_id')->join('categories','post_categories.category_id','=','categories.id')->join('countries','posts.country_id','=','countries.id')->join('users','posts.user_id','=','users.id')->whereIn('posts.country_id',$country_id)->whereIn('post_categories.category_id',$category_id)->orderBy('posts.id', 'desc')->select('posts.*','post_categories.category_id','categories.category','countries.country','users.name')->distinct()->get();
        return response()->json([
            'message' => 'ok',
            'data' => $data,
        ], 201);
    }
}
