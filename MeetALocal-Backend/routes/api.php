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
            Route::get('/locals/{country}/{category}/{offset}', [UserController::class, 'getLocals']);
            Route::get('/user/{id}', [UserController::class, 'getUser']);
            Route::get('/events/{country}/{category}', [UserController::class, 'getEvents']);
            Route::get('/event/{id}', [UserController::class, 'getEvent']);
            Route::get('/posts/{country}/{category}/{offset}', [UserController::class, 'getPosts']);
            Route::get('/posts', [UserController::class, 'getOwnPosts']);
            Route::post('/comment', [UserController::class, 'addComment']);
            Route::get('/comments/{id}', [UserController::class, 'getComments']);
            Route::post('/post', [UserController::class, 'createPost']);
            Route::put('/profile-photo', [UserController::class, 'changePhoto']);
            Route::put('/edit-profile', [UserController::class, 'editProfile']);
            Route::get('/reviews', [UserController::class, 'getReviews']);
        });
        Route::group(['prefix' => 'locals'], function () {
            Route::post('/event', [LocalController::class, 'createEvent']);
            Route::delete('/event', [LocalController::class, 'deleteEvent']);
            Route::get('/events', [LocalController::class, 'getMyEvents']);
            Route::post('/highlights', [LocalController::class, 'addHighlights']);
            //edit profile
        });
        Route::group(['prefix' => 'admins'], function () {
            Route::post('/toggle-ban', [AdminController::class, 'toggleBan']);
            Route::get('/bans', [AdminController::class, 'getBans']);
            Route::get('/app-stat', [AdminController::class, 'getAppStat']);
            Route::get('/locals-stat', [AdminController::class, 'getLocalsStat']);
            Route::get('/foreigners-stat', [AdminController::class, 'getForeignersStat']);
            Route::get('/users/{type}/{offset}', [AdminController::class, 'getUsers']);
        });
        Route::group(['prefix' => 'foreigners'], function () {
            Route::get('/favorites', [ForeignerController::class, 'getFavorites']);
            Route::get('/is-favorite/{id}', [ForeignerController::class, 'isFavorite']);
            Route::post('/toggle-favorite', [ForeignerController::class, 'toggleFavorite']);
            Route::post('/event/toggle-save', [ForeignerController::class, 'toggleSavedEvents']);
            Route::get('/event/is-saved/{id}', [ForeignerController::class, 'isSaved']);
            Route::get('/events/saved', [ForeignerController::class, 'getSavedEvents']);
            Route::post('/review', [ForeignerController::class, 'addReview']);
            Route::delete('/review', [ForeignerController::class, 'deleteReview']);
            Route::get('/is-reviewed', [ForeignerController::class, 'isReviewed']);
            Route::get('/search', [ForeignerController::class, 'getSearch']);
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
