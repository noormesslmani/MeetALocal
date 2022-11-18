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
        if($user->type_id!=3)
        {
            $languages=UserLanguage::join('languages','languages.id','language_id')->where('user_id',$user->id)->pluck('language');
            $user['languages']=$languages;
            $user['nationality']=Country::find($user->nationality_id)->country;
            $user['residence']=Country::find($user->residence_id)->country;
        }
        if($user->type_id==1){
            $categories=LocalCategory::join('categories','categories.id','category_id')->where('local_id',$user->id)->pluck('category');
            $user['highlights']= $user->highlights()->pluck('photo');
            $user['categories']= $categories;
        }
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
            'type' => 'required|string|in:Local,Foreigner',
            'gender' =>'required|in:Male,Female',
            'categories' =>'array',
            'about' => 'string',
            'latitude' =>"numeric",
            'longitude' =>"numeric",
            'fees' => 'numeric',
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
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password),
                    'nationality_id'=> Country::where('country',$request->nationality)->pluck('id')[0],
                    'residence_id'=> Country::where('country',$request->residence)->pluck('id')[0],
                    'type_id'=>UserType::where('user_type',$request->type)->pluck('id')[0],
                    'profile_picture'=>$path
                    ]
                ));
        foreach($request->languages as $language){
            UserLanguage::create([
                'user_id' => $user->id,
                'language_id'=> Language::where('language',$language)->pluck('id')[0]
            ]);
        }
        if($request->type=='Local'){
            foreach($request->categories as $category){
                LocalCategory::create([
                    'local_id' => $user->id,
                    'category_id'=> Category::where('category',$category)->pluck('id')[0]
                ]);
            }
        }
        $user['languages']=$request->languages;
        $user['nationality']=$request->nationality;
        $user['residence']=$request->residence;
        if($user->type_id==1){
            $user['categories']= $request->categories;
            $user['highlights']=[];
        }
        $credentials = $request->only('email', 'password');
        $token= auth()->attempt($credentials);
        return response()->json([
            'message' => 'ok',
            'user' => $user,
            'token'=> $token
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
        $languages=UserLanguage::join('languages','languages.id','language_id')->where('user_id',$user->id)->pluck('language');
        $user['languages']=$languages;
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
    public function notFound(){
        return response()->json([
            "message" => "Unauthorized"
        ], 404);
    }
}
