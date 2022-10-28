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
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
class LocalController extends Controller
{
    public function createEvent(Request $request){
        $validator = Validator::make($request->all(), [
            'country' => 'required|string',
            'title' => 'required|string',
            'details' => 'required|string',
            'place' => 'required|string',
            'date' => 'required|date',
            'fees' => 'required|integer',
            'categories' => 'required|array',
            'photo' =>'string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $event = Event::create(array_merge(
            $validator->validated(),
            [
            'organizer_id' => Auth::id(),
            'country_id'=> Country::where('country',$request->country)->pluck('id')[0],
            ]
        ));
        foreach($request->categories as $category){
            EventCategory::create([
                'event_id' => $event->id,
                'category_id'=> Category::where('category',$category)->pluck('id')[0]
            ]);
        }
        return response()->json([
            'message' => 'ok',
            'data' => $event,
        ], 201);
    }
    public function getMyEvents(){
        $events=Auth::user()->events()->get();
        return response()->json([
            'message' => 'ok',
            'data' => $events,
        ], 201);
    }
}
