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
use App\Models\Appointment;
use App\Models\BookedAppointment;
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
            'seats'=>'integer'
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
            $event['saves']=SavedEvent::where('event_id',$event->id)->count();
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
    public function addHighlights(Request $request){
        $extension=$request->ext;
        $image_64 = $request->photo; 
        $img = base64_decode($image_64);
        $path = uniqid() . "." . $extension;
        file_put_contents($path, $img);
        if(Hightlight::where('user_id',Auth::id())->count()<4){
            Highlight::create([
                'user_id'=>Auth::id(),
                'photo'=>$path
            ]);
            return response()->json([
                'message' => 'ok',
            ], 201);
        }
        return response()->json([
            'message' => 'action forbidden',
        ], 403);
    }
    public function addAppointment(Request $request){
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $appointment = Appointment::create(array_merge(
            $validator->validated(),
            [
            'local_id' => Auth::id(),
            ]
        ));
        return response()->json([
            'message' => 'ok',
            'data' => $appointment,
        ], 201);
    }
    public function getAppointments(){
        $appointments=Auth::user()->appointments()->get();
        return response()->json([
            'message' => 'ok',
            'data' => $appointments,
        ], 201);
    }
    public function isBookedAppointment(Request $request){
        BookedAppointment::find($request->query('id'))? $booked=true : $booked=false;
        return response()->json([
            'message' => 'ok',
            'data' => $booked,
        ], 201);
    }
}
