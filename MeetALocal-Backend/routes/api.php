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
        Route::group(['prefix' => 'users'], function () {
            Route::get('/locals/{country}/{category}', [UserController::class, 'getLocals']);
            Route::get('/user/{id}', [UserController::class, 'getUser']);
            Route::get('/events/{country}/{category}', [UserController::class, 'getEvents']);
            Route::get('/event/{id}', [UserController::class, 'getEvent']);
            Route::post('/event/saved', [UserController::class, 'toggleSavedEvents']);
            Route::get('/event/is-saved/{id}', [UserController::class, 'isSaved']);
            Route::get('/events/saved', [UserController::class, 'getSavedEvents']);
            Route::get('/posts/{country}/{category}', [UserController::class, 'getPosts']);
            Route::get('/post/{id}', [UserController::class, 'getPost']);
            Route::post('/comment', [UserController::class, 'addComment']);
            Route::post('/post', [UserController::class, 'createPost']);
            Route::get('/chats/{id?}', [UserController::class, 'getChats']);
            Route::post('/chat', [UserController::class, 'createChat']);
        });
        Route::group(['prefix' => 'locals'], function () {
            Route::post('/event', [LocalController::class, 'createEvent']);
            Route::delete('/event', [LocalController::class, 'deleteEvent']);
            Route::get('/events', [LocalController::class, 'getMyEvents']);
            //edit profile
            //map view
        });
        Route::group(['prefix' => 'admins'], function () {
            Route::post('/ban', [AdminController::class, 'banUser']);
            Route::post('/unban', [AdminController::class, 'unbanUser']);
            Route::get('/get-bans', [AdminController::class, 'getBans']);
            Route::get('/app-stat', [AdminController::class, 'getAppStat']);
            Route::get('/locals-stat', [AdminController::class, 'getLocalsStat']);
            Route::get('/foreigners-stat', [AdminController::class, 'getForeignersStat']);
            Route::get('/users/{type}', [AdminController::class, 'getUsers']);
        });
        Route::group(['prefix' => 'foreigners'], function () {
            Route::get('/favorites', [ForeignerController::class, 'getFavorites']);
        });
        Route::group(['prefix' => 'auth'], function ($router) { 
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);
            Route::post('/setup', [AuthController::class, 'setUp']);   
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
