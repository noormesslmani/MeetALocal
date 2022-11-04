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
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $path=null;
        if($request->photo){
            $extension=$request->ext;
            $image_64 = $request->photo; //your base64 encoded data
            $img = base64_decode($image_64);
            $path = uniqid() . "." . $extension;
            file_put_contents($path, $img);
        }
        $event = Event::create(array_merge(
            $validator->validated(),
            [
            'organizer_id' => Auth::id(),
            'country_id'=> Country::where('country',$request->country)->pluck('id')[0],
            'photo'=>$path
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
        foreach($events as $event){
            $event['country']=Country::find($event['country_id'])['country'];
            $category= $event->categories()->pluck('category');
            $event['categories']=$category;
            $event['name']=Auth::user()->name;
        }
        return response()->json([
            'message' => 'ok',
            'data' => $events,
        ], 201);
    }
    public function deleteEvent(Request $request){
        $event=Event::find($request->event_id);
        if(Auth::id()==$event->organizer()->pluck('id')[0]){
            $event->delete();
            return response()->json([
                'message' => 'ok',
            ], 201);
        }
        return response()->json([
            'message' => 'action forbidden',
        ], 403);
    }
}
