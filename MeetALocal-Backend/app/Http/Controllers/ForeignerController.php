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
            'favorites'=>$favorites
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
}
