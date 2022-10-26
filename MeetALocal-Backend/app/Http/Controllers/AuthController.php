<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Country;
use App\Models\Event_category;
use App\Models\Event;
use App\Models\Favorite_local;
use App\Models\Highlight;
use App\Models\Local_category;
use App\Models\Message;
use App\Models\Notification;
use App\Models\PostCategory;
use App\Models\Post;
use App\Models\Saved_event;
use App\Models\User_type;
use Illuminate\Support\Facades\Hash;
use Validator;

class AuthController extends Controller
{
    
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8',
            'type' => 'required|string|in:Local,Foreigner',
            'nationality' => 'required|string',
            'residence' => 'required|string',
            'gender' =>'required|in:Male,Female',
            'phone' =>'required|integer',
            'date_of_birth' => 'required|date',
            'about' => 'string',
            'location' => 'string',
            'profile_picture' => 'string',
            'fees' => 'integer',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password),
                    'type_id' => User_type::where('user_type',$request->type)->pluck('id')[0],
                    'nationality_id'=> Country::where('country',$request->nationality)->pluck('id')[0],
                    'residence_id'=> Country::where('country',$request->residence)->pluck('id')[0],
                    ]
            ));
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
   
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
   
    public function userProfile() {
        return response()->json(auth()->user());
    }
    
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
