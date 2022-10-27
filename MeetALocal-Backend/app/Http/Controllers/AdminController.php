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
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function banUser(Request $request){
        $user_type=User::find($request->user_id)->type()->pluck('user_type')[0];
        if($user_type=='Admin'){
            return response()->json([
                'message' => 'action forbidden',
            ], 403);
        }
        if(Ban::where('banned_id',$request->user_id)->exists()){
            return response()->json([
                'message' => 'user banned',
            ], 400);
        }
        $ban= Ban::create([
            'banner_id' => Auth::id(),
            'banned_id'=> $request->user_id
        ]);
        return response()->json([
            'message' => 'ok',
            'data' => $ban,
        ], 201);
    }
    public function unbanUser(Request $request){
        Ban::where('banned_id',$request->user_id)->delete();
        return response()->json([
            'message' => 'ok',
        ], 201);
    }
}
