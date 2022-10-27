<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocalController;
use App\Http\Controllers\ForeignerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::group(['prefix' => 'v1.0.0'], function () {

    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['prefix' => 'user'], function () {
            Route::get('/locals/{country}/{fees}/{category}', [UserController::class, 'getLocals']);
            Route::get('/events/{country}/{fees}/{category}', [UserController::class, 'getEvents']);
            Route::get('/event/{id}', [UserController::class, 'getEvent']);
            Route::post('/event/saved', [UserController::class, 'toggleSavedEvents']);
            Route::get('/events/saved', [UserController::class, 'getSavedEvents']);
            Route::get('/posts/{country}/{category}', [UserController::class, 'getPosts']);
            Route::post('/post', [UserController::class, 'createPost']);
            Route::get('/chats/{id?}', [UserController::class, 'getChats']);
            Route::post('/chat', [UserController::class, 'createChat']);
        });
        Route::group(['prefix' => 'local'], function () {
            
        });
        Route::group(['prefix' => 'admin'], function () {
        
        });
        Route::group(['prefix' => 'foreigner'], function () {
        
        });
        Route::group(['prefix' => 'auth'], function ($router) { 
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);
            Route::get('/user-profile', [AuthController::class, 'userProfile']);    
        });
    });

    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);  
    }); 
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
