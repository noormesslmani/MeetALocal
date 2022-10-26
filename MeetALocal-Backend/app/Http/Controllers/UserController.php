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
    public function getLocals($country, $fees, $category){
        $country!='All'? $country_id= Country::where('country',$country)->pluck('id'):$country_id=Country::pluck('id');
        if($fees=='All')
            $fees=100;
        $category!='All'? $category_id=Category::where('category',$category)->pluck('id'):$category_id=Category::pluck('id');
        $data= User::join('local_categories','users.id','=','local_id')->where('users.type_id',1)->whereIn('users.residence_id',$country_id)->where('users.fees','<=',$fees)->whereIn('local_categories.category_id',$category_id)->get();
        return response()->json([
            'message' => 'ok',
            'data' => $data
        ], 201);
    }
}
