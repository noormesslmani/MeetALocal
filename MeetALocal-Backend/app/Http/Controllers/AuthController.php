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
        $user=Auth::user();
        $user['nationality']=Country::find($user->nationality_id)->country;
        $user['residence']=Country::find($user->residence_id)->country;
        return response()->json([
            'message' => 'ok',
            "access_token"=>$token,
            "user"=>$user,
        ], 201);
    }
    
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8',
            'nationality' => 'required|string',
            'residence' => 'required|string',
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
                    'type_id'=>1,
                    'gender'=>'Male'
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
            'gender' =>'required|in:Male,Female',
            'categories' =>'array',
            'about' => 'string',
            'latitude' =>"numeric",
            'longitude' =>"numeric",
            'photo' => 'string',
            'fees' => 'integer',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $path=null;
        if($request->photo){
            $extension=$request->ext;
            $image_64 = $request->photo; 
            $img = base64_decode($image_64);
            $path = uniqid() . "." . $extension;
            file_put_contents($path, $img);
        }
        Auth::user()->update(array_merge(
            $validator->validated(),
            [
            'type_id' => UserType::where('user_type',$request->type)->pluck('id')[0],
            'profile_picture'=>$path
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
        $user=Auth::user();
        $user['nationality']=Country::find($user->nationality_id)->country;
        $user['residence']=Country::find($user->residence_id)->country;
        return response()->json([
            'user'=>Auth::user(),
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
        $user=Auth::user();
        $user['nationality']=Country::find($user->nationality_id)->country;
        $user['residence']=Country::find($user->residence_id)->country;
        return response()->json([
            'user'=>$user,
            'message' => 'ok',
        ], 201);
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
