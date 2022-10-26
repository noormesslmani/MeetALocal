<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocalController;
use App\Http\Controllers\ForeignerController;
use App\Http\Controllers\AdminController;


Route::group(['prefix' => 'v1.0.0'], function () {
    Route::group(['prefix' => 'local'], function () {
    
    });
    Route::group(['prefix' => 'admin'], function () {
    
    });
    Route::group(['prefix' => 'foreigner'], function () {
    
    });

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
