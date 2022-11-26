<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocalController;
use App\Http\Controllers\ForeignerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::group(['prefix' => 'v1.0.0'], function () {

    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']); 
        Route::get('/not-found', [AuthController::class, 'notFound'])->name("not-found"); 
    }); 

    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['prefix' => 'users'], function () {
            
                Route::get('/locals', [UserController::class, 'getLocals']);
                Route::get('/user', [UserController::class, 'getUser']);
                Route::get('/user-profile', [UserController::class, 'getUserProfile']);
                Route::get('/events', [UserController::class, 'getEvents']);
                Route::get('/locals-events', [UserController::class, 'getLocalEvent']);
                Route::get('/posts', [UserController::class, 'getPosts']);
                Route::get('/own-posts', [UserController::class, 'getOwnPosts']);
                Route::post('/comment', [UserController::class, 'addComment']);
                Route::get('/comments/{id}', [UserController::class, 'getComments']);
                Route::post('/post', [UserController::class, 'createPost']);
                Route::put('/edit-profile', [UserController::class, 'editProfile']);
                Route::get('/reviews', [UserController::class, 'getReviews']);
                Route::put('/token', [UserController::class, 'saveToken']);
                Route::get('/token', [UserController::class, 'getToken']);
        
        });
        Route::group(['prefix' => 'locals'], function () {
            Route::group(['middleware' => 'local'], function () {
                Route::post('/event', [LocalController::class, 'createEvent']);
                Route::delete('/event', [LocalController::class, 'deleteEvent']);
                Route::get('/events', [LocalController::class, 'getMyEvents']);
                Route::post('/highlights', [LocalController::class, 'addHighlights']);
                
                Route::post('/appointment', [LocalController::class, 'addAppointment']);
                Route::get('/appointments', [LocalController::class, 'getAppointments']);
                Route::delete('/appointment', [LocalController::class, 'deleteAppointment']);
                Route::get('/is-booked-appointment', [LocalController::class, 'isBookedAppointment']);
                Route::post('/highlight', [LocalController::class, 'addHighlight']);
            });
        });
        Route::group(['prefix' => 'admins'], function () {
            Route::group(['middleware' => 'admin'], function () {
                Route::post('/toggle-ban', [AdminController::class, 'toggleBan']);
                Route::get('/bans', [AdminController::class, 'getBans']);
                Route::get('/app-stat', [AdminController::class, 'getAppStat']);
                Route::get('/locals-stat', [AdminController::class, 'getLocalsStat']);
                Route::get('/foreigners-stat', [AdminController::class, 'getForeignersStat']);
                Route::get('/users', [AdminController::class, 'getUsers']);
                Route::get('/enrollments', [AdminController::class, 'getEnrollments']);
                Route::get('/locations', [AdminController::class, 'getLocations']);
                Route::get('/search-users', [AdminController::class, 'searchUsers']);
            
            });
        });
        Route::group(['prefix' => 'foreigners'], function () {
            Route::group(['middleware' => 'foreigner'], function () {
                Route::get('/favorites', [ForeignerController::class, 'getFavorites']);
                Route::get('/is-favorite/{id}', [ForeignerController::class, 'isFavorite']);
                Route::post('/toggle-favorite', [ForeignerController::class, 'toggleFavorite']);
                Route::post('/event/toggle-save', [ForeignerController::class, 'toggleSavedEvents']);
                Route::get('/event/is-saved/{id}', [ForeignerController::class, 'isSaved']);
                Route::get('/events/saved', [ForeignerController::class, 'getSavedEvents']);
                Route::get('/events/booked', [ForeignerController::class, 'getBookedEvents']);
                Route::post('/review', [ForeignerController::class, 'addReview']);
                Route::delete('/review', [ForeignerController::class, 'deleteReview']);
                Route::get('/is-reviewed', [ForeignerController::class, 'isReviewed']);
                Route::get('/search', [ForeignerController::class, 'getSearch']);
                Route::post('/toggle-event-booking', [ForeignerController::class, 'toggleBookedEvent']);
                Route::post('/toggle-appointment-booking', [ForeignerController::class, 'toggleBookedAppointment']);
                Route::get('/is-booked-event', [ForeignerController::class, 'isBookedEvent']);
                Route::get('/appointments', [ForeignerController::class, 'getAvailableAppointments']);
                Route::get('/booked-appointments', [ForeignerController::class, 'getBookedAppointments']);
            });
        });
        Route::group(['prefix' => 'auth'], function ($router) { 
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']); 
            Route::get('/user-profile', [AuthController::class, 'userProfile']);    
        });
    });

});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
