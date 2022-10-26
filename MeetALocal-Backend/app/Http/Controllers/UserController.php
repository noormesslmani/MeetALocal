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

class UserController extends Controller
{
    public function getLocals($country= null, $fees=null, $category=null){
        $country? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        if(!$fees){
            $fees=0;
        }
        
        $data= User::where('type_id',1)->whereIn('residence_id',$country_id)->where('fees','>=',$fees)->get();
        return response()->json([
            'message' => 'ok',
            'data' => $data
        ], 201);
    }
}
