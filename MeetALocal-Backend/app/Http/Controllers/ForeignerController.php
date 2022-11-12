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
class ForeignerController extends Controller
{
    public function getFavorites(){
        $favorites=Auth::user()->favorites()->get();
        foreach($favorites as $local){
            $category= $local->categories()->pluck('category');
            $likes= FavoriteLocal::where('local_id',$local->id)->count();
            $local['likes']=$likes;
            $local['categories']=$category;
            $country=Country::where('countries.id',$local->residence_id)->pluck('country')[0];
            $local['country']=$country;
        }
        return response()->json([
            'message' => 'ok',
            'data'=>$favorites
        ], 201);
    }
    public function isFavorite($id){
        if(Auth::user()->favorites()->where('local_id',$id)->exists()){
            return response()->json([
                'message' => 'ok',
                'data'=>true
            ], 201);
        }
        return response()->json([
            'message' => 'ok',
            'data'=>false
        ], 201);
    }
    public function toggleFavorite(Request $request){
        if(FavoriteLocal::where('user_id',Auth::id())->where('local_id',$request->id)->exists())
            FavoriteLocal::where('user_id',Auth::id())->where('local_id',$request->id)->delete();
        else{
            FavoriteLocal::create([
                'user_id' => Auth::id(),
                'local_id'=> $request->id,
            ]);
        }
        $counts=FavoriteLocal::where('local_id',$request->id)->count();
        return response()->json([
            'message' => 'ok',
            'data' =>$counts
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
        $events= Auth::user()->savedEvents()->get();
        foreach($events as $event){
            $event['categories']=$event->categories()->pluck('category');
        }
        return response()->json([
            'message' => 'ok',
            'data' => $events,
        ], 201);
    }
    public function isSaved($id){
        if(Auth::user()->savedEvents()->where('event_id',$id)->exists()){
            return response()->json([
                'message' => 'ok',
                'data'=>true
            ], 201);
        }
        return response()->json([
            'message' => 'ok',
            'data'=>false
        ], 201);
    }
}
