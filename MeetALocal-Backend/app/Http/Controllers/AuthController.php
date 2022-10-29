<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
use App\Models\UserLanguage;
use App\Models\Language;
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
            'nationality' => 'required|string',
            'residence' => 'required|string',
            'gender' =>'required|in:Male,Female',
            'phone' =>'required|integer',
            'languages' =>'required|array',
            'date_of_birth' => 'required|date',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password),
                    'nationality_id'=> Country::where('country',$request->nationality)->pluck('id')[0],
                    'residence_id'=> Country::where('country',$request->residence)->pluck('id')[0],
                    'type_id'=>1
                    ]
                ));
        
        foreach($request->languages as $language){
            UserLanguage::create([
                'user_id' => $user->id,
                'language_id'=> Language::where('language',$language)->pluck('id')[0]
            ]);
        }
        $credentials = $request->only('email', 'password');
        $token= auth()->attempt($credentials);
        return response()->json([
            'message' => 'ok',
            'user' => $user,
            'token'=> $token
        ], 201);
    }

    public function setUp(Request $request){
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:Local,Foreigner',
            'categories' =>'array',
            'about' => 'string',
            'location' => 'string',
            'profile_picture' => 'string',
            'fees' => 'integer',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        Auth::user()->update(array_merge(
            $validator->validated(),
            [
            'type_id' => UserType::where('user_type',$request->type)->pluck('id')[0],
            ])
        );
        if($request->type=='Local'){
            foreach($request->categories as $category){
                LocalCategory::create([
                    'local_id' => Auth::id(),
                    'category_id'=> Category::where('category',$category)->pluck('id')[0]
                ]);
            }
        }
        return response()->json([
            'message' => 'ok',
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
