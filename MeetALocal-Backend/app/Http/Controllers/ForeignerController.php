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
use App\Models\EventBooking;
use App\Models\Appointment;
use App\Models\BookedAppointment;
use App\Models\UserType;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
class ForeignerController extends Controller
{
    //getting favorite locals with some data
    public function getFavorites(){
        $favorites=Auth::user()->favorites()->get();
        foreach($favorites as $local){
            $local['likes']=FavoriteLocal::where('local_id',$local->id)->count();;
            $local['categories']=$local->categories()->pluck('category');;
            $local['country']=Country::where('countries.id',$local->residence_id)->pluck('country')[0];
            $local['languages']=$local->languages()->pluck('language');
            $local['highlights']=$local->highlights()->pluck('photo');
        }
        return response()->json([
            'message' => 'ok',
            'data'=>$favorites
        ], 201);
    }

    //checking if a local is favorited
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

    //checking if an event is booked
    public function isBookedEvent(Request $request){
        if(Auth::user()->bookedEvents()->where('event_id',$request->query('id'))->exists()){
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

    //toggling favorite 
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
    
    //toggling event saving 
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

    //getting saved events
    public function getSavedEvents(){
        $date = today()->format('Y-m-d');
        $events= Auth::user()->savedEvents()->where('events.date', '>=', $date)->get();
        foreach($events as $event){
            $event['categories']=$event->categories()->pluck('category');
            $event['name']=$event->organizer()->pluck('name');
            $event['bookings']= EventBooking::where('event_id', $event->id)->count();
        }
        return response()->json([
            'message' => 'ok',
            'data' => $events,
        ], 201);
    }

    //getting booked events
    public function getBookedEvents(){
        $date = today()->format('Y-m-d');
        $events= Auth::user()->bookedEvents()->where('events.date', '>=', $date)->get();
        foreach($events as $event){
            $event['categories']=$event->categories()->pluck('category');
            $event['name']=$event->organizer()->pluck('name');
            $event['bookings']= EventBooking::where('event_id', $event->id)->count();
        }
        return response()->json([
            'message' => 'ok',
            'data' => $events,
        ], 201);
    }

    //checking if an event is saved
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

    //adding a review for a local
    public function addReview(Request $request){
        $validator = Validator::make($request->all(), [
            'local_id' => 'required',
            'stars'=>'required|between:0,5',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $review = Review::create(array_merge(
            $validator->validated(),
            [
                'reviewer_id'=> Auth::id(),
                'review'=>$request->review
            ]
        ));
        $review['name']=Auth::user()->name;
        $review['profile_picture']=Auth::user()->profile_picture;
        return response()->json([
            'data' => $review,
            'message' =>'ok',
        ], 201);
    }

    //deleting a review
    public function deleteReview(Request $request){
        $review=Review::where('local_id', $request->local_id)->where('reviewer_id', Auth::id())->delete();
        return response()->json([
            'message' => 'ok',
        ], 201);
    }

    //checking if a local is reviewed
    public function isReviewed(Request $request){
       
        if(Auth::user()->sentReviews()->where('local_id',$request->query('id'))->exists()){
            return response()->json([
                'data' => true,
                'message' => 'ok',
            ], 201);
        }
        return response()->json([
            'data' => false,
            'message' => 'ok',
        ], 201);
    }

    //getting search results
    public function getSearch(Request $request){
        $search=$request->query('name');
        $locals=User::where('type_id',1)->where('name', 'LIKE', '%'.$search.'%')->get();
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

    //toggling event booking
    public function toggleBookedEvent(Request $request){
        if(EventBooking::where('user_id',Auth::id())->where('event_id',$request->event_id)->exists()){
            EventBooking::where('user_id',Auth::id())->where('event_id',$request->event_id)->delete();
            return response()->json([
                'message' => 'ok',
            ], 201);
        }
        EventBooking::create([
            'user_id' => Auth::id(),
            'event_id'=> $request->event_id,
        ]);
        $notification= Notification::create([
            'from_id'=>Auth::id(),
            'to_id'=>Event::find($request->event_id)->organizer_id,
            'content'=>'Your event '.Event::find($request->event_id)->title.' was booked by '.Auth::user()->name,
        ]);
        return response()->json([
            'message' => 'ok',
            'data'=>$notification
        ], 201);
    }

    //toggling appointment booking
    public function toggleBookedAppointment(Request $request){
        if(BookedAppointment::where('booker_id',Auth::id())->where('appointment_id',$request->appointment_id)->exists()){
            BookedAppointment::where('booker_id',Auth::id())->where('appointment_id',$request->appointment_id)->delete();
            return response()->json([
                'message' => 'ok',
            ], 201);
        }
        $appointment=Appointment::find($request->appointment_id);
        BookedAppointment::create([
            'booker_id' => Auth::id(),
            'appointment_id'=> $request->appointment_id,
        ]);

        $notification= Notification::create([
            'from_id'=>Auth::id(),
            'to_id'=>$appointment->local_id,
            'content'=>'The appointment on '.$appointment->date. ' from '.$appointment->start_time.' till '.$appointment->end_time.' was booked by '.Auth::user()->name, 
        ]);

        return response()->json([
            'message' => 'ok',
            'data'=>$notification
        ], 201);
    }
    
    //getting available appointments
    public function getAvailableAppointments(Request $request){
        $date = today()->format('Y-m-d');
        $booked= BookedAppointment::pluck('appointment_id');
        $appointments=Appointment::where('local_id',$request->query('id'))->whereNotIn('id', $booked)->where('date', '>=', $date)->orderBy('date', 'desc')->get();
        return response()->json([
            'message' => 'ok',
            'data' => $appointments,
        ], 201);
    }

    //getting booked appointments
    public function getBookedAppointments(){
        $date = today()->format('Y-m-d');
        $appointments=Auth::user()->bookedAppointments()->join('appointments','appointments.id','appointment_id')->join('users','appointments.local_id','users.id')->
        where('date', '>=', $date)->latest()->get(['appointments.*','appointment_id','name','profile_picture', 'users.id']);
        return response()->json([
            'message' => 'ok',
            'data' => $appointments,
        ], 201);
    }
}
