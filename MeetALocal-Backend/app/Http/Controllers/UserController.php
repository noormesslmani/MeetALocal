<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Country;
use App\Models\EventCategory;
use App\Models\Event;
use App\Models\EventBooking;
use App\Models\FavoriteLocal;
use App\Models\Highlight;
use App\Models\LocalCategory;
use App\Models\Message;
use App\Models\Notification;
use App\Models\PostCategory;
use App\Models\Post;
use App\Models\Language;
use App\Models\SavedEvent;
use App\Models\UserType;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
class UserController extends Controller
{
    public function getLocals(Request $request){
        $country=$request->query('country');
        $category=$request->query('category');
        $offset=$request->query('offset');
        $country!='all'? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        $category!='all'? $category_id=Category::where('category',$category)->pluck('id'):$category_id=Category::pluck('id');
        $locals= User::join('local_categories','users.id','=','local_id')->join('categories','local_categories.category_id','=','categories.id')->join('countries','users.residence_id','=','countries.id')->where('type_id',1)->whereNotIn('users.id', [Auth::id()])->whereIn('users.residence_id',$country_id)->whereIn('local_categories.category_id',$category_id)->distinct()->orderBy('created_at', 'desc')->offset($offset)->limit(15)->get(['users.*','countries.country']);
        foreach($locals as $local){
            $local['likes']=FavoriteLocal::where('local_id',$local->id)->count();
            $local['categories']=$local->categories()->pluck('category');
            $local['languages']=$local->languages()->pluck('language');
            $local['highlights']=$local->highlights()->pluck('photo');
        } 
        return response()->json([
            'message' => 'ok',
            'data' => $locals
        ], 201);
    }
    public function getUser($id){
        $user= User::find($id);
        return response()->json([
            'message' => 'ok',
            'data' => $user
        ], 201);
    }
    public function getEvents(Request $request){
        $country=$request->query('country');
        $category=$request->query('category');
        $date = today()->format('Y-m-d');
        $country!='all'? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        $category!='all'? $category_id=Category::where('category',$category)->pluck('id'):$category_id=Category::pluck('id');
        $events= Event::join('event_categories','events.id','=','event_id')->join('categories','event_categories.category_id','=','categories.id')->join('countries','events.country_id','=','countries.id')->join('users','events.organizer_id','=','users.id')->where('events.date', '>=', $date)->whereIn('events.country_id',$country_id)->whereIn('event_categories.category_id',$category_id)->orderBy('events.id', 'desc')->distinct()->latest()->get(['events.*','countries.country','users.name']);
        foreach($events as $event){ 
            $event['categories']=$event->categories()->pluck('category');
            $event['bookings']= EventBooking::where('event_id', $event->id)->count();
          
        }
        
        return response()->json([
            'message' => 'ok',
            'data' => $events
        ], 201);
    }
    public function getLocalEvent(Request $request){
        $events=User::find($request->query('id'))->events()->get();
        foreach($events as $event){
            $event['country']=$event->country()->get(['country'])[0]['country'];
            $event['categories']=$event->categories()->pluck('category');
            $event['bookings']= EventBooking::where('event_id', $event->id)->count();
            $event['name']=User::find($request->query('id'))->name;
        }

        return response()->json([
            'message' => 'ok',
            'data' => $events,
        ], 201);
    }
    
    public function getPosts(Request $request){
        $country=$request->query('country');
        $category=$request->query('category');
        $offset=$request->query('offset');
        $country!='all'? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        $category!='all'? $category_id=Category::where('category',$category)->pluck('id'):$category_id=Category::pluck('id');
        $posts= Post::join('post_categories','posts.id','=','post_id')->join('categories','post_categories.category_id','=','categories.id')->join('countries','posts.country_id','=','countries.id')->join('users','posts.user_id','=','users.id')->whereIn('posts.country_id',$country_id)->whereIn('post_categories.category_id',$category_id)->orderBy('posts.id', 'desc')->distinct()->orderBy('created_at', 'desc')->offset($offset)->limit(20)->get(['posts.*','countries.country','users.name', 'users.profile_picture']);
        foreach($posts as $post){
            $post['comments']= Comment::where('post_id',$post->id)->count();
            $post['categories']=$post->categories()->pluck('category');
        }
        
        return response()->json([
            'message' => 'ok',
            'data' => $posts,
        ], 201);
    }
    public function getOwnPosts(){
        $posts= Auth::user()->posts()->get();
        foreach($posts as $post){
            $post['comments']= Comment::where('post_id',$post->id)->count();
            $post['categories']=$post->categories()->pluck('category');
            $post['name']=Auth::user()->name;
            $post['country']=Auth::user()->residence['country'];
        }
        return response()->json([
            'message' => 'ok',
            'data'=>$posts
        ], 201);

    }
    public function getPost($id){
        $post=Post::find($id);
        $post['user']=$post->user()->get(['name'])[0]['name'];
        $post['country']=$post->country()->get(['country'])[0]['country'];
        $post['categories']=Post::find($id)->categories()->pluck('category');
        $post['comments']=Comment::where('post_id',$id)->join('users','comments.user_id','users.id')->get(['comments.content','comments.created_at','users.name','users.type_id']);
        return response()->json([
            'message' => 'ok',
            'data' => $post,
        ], 201);
    }
    public function addComment(Request $request){
        $comment = Comment::create([
            'post_id'=> $request->post_id,
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);
        return response()->json([
            'message' => 'ok',
            'data' => $comment,
        ], 201);
    }
    public function getComments($id){
        $comments = Comment::where('post_id',$id)->get();
        foreach($comments as $comment){
            $comment['user']=User::where('id', $comment->user_id)->get()[0];
        }
        return response()->json([
            'message' => 'ok',
            'data' => $comments,
        ], 201);
    }
    public function createPost(Request $request){
        $post = Post::create([
            'user_id' => Auth::id(),
            'details'=> $request->details,
            'country_id'=> Country::where('country',$request->country)->pluck('id')[0]
        ]);
        foreach($request->category as $category){
            PostCategory::create([
                'post_id' => $post->id,
                'category_id'=> Category::where('category',$category)->pluck('id')[0]
            ]);
        }
        return response()->json([
            'message' => 'ok',
            'data' => $post,
        ], 201);
    }
    
    public function getReviews(Request $request){
        $reviews= Review::where('local_id',$request->query('id'))->join('users','users.id','reviewer_id')->latest()->get(['reviews.*', 'users.name', 'users.profile_picture']);
        return response()->json([
            'message' => 'ok',
            'data' => $reviews,
        ], 201);
    }
    public function changePhoto( Request $request){
        $validator = Validator::make($request->all(), [
            'base64' => 'required|string',
            'ext'=>'required|string'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        } 
        $img = base64_decode($request->base64);
        $path = uniqid() . "." . $request->ext;
        file_put_contents($path, $img);
        Auth::user()->update(['profile_picture'=>$path]);
        $user=Auth::user();
        $user['nationality']=Country::find($user->nationality_id)->country;
        $user['residence']=Country::find($user->residence_id)->country;
        return response()->json([
            'user'=>$user,
            'message' => 'ok',
        ], 201);  
    }
    public function editProfile(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'nationality' => 'required|string',
            'residence' => 'required|string',
            'phone' =>'required|numeric',
            'languages' =>'required|array',
            'date_of_birth' => 'date',
            'gender' =>'required|in:Male,Female',
            'categories' =>'array',
            'about' => 'string|between:0,200',
            'latitude' =>"numeric",
            'longitude' =>"numeric",
            'fees' => 'integer',
            'highlights'=>'array'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        Auth::user()->update($validator->validated());
        $user=Auth::user();
        if($request->photo){
            $extension=$request->ext;
            $image_64 = $request->photo; 
            $img = base64_decode($image_64);
            $path = uniqid() . "." . $extension;
            file_put_contents($path, $img);
            Auth::user()->update(['profile_picture'=>$path]);
        }
        
        $lang_ids=[];
        $user['nationality']=$request->nationality;
        $user['residence']=$request->residence;
        $user['languages']=$request->languages;
        foreach($request->languages as $language){
            array_push($lang_ids,Language::where('language',$language)->get('id')[0]['id']);
        }
        $categ_ids=[];
        if($request->categories){
            foreach($request->categories as $category){
                array_push($categ_ids,Category::where('category',$category)->get('id')[0]['id']);
            }
            $user['categories']=$request->categories;
            $user['highlights']=$request->highlights;
        }
        Auth::user()->languages()->sync($lang_ids);
        return response()->json([
            'message' => 'ok',
            'data'=>$user
        ], 201); 
    }
}
