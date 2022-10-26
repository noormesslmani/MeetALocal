<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'email',
        'password',
        'type_id',
        'nationality_id',
        'residence_id',
        'gender',
        'phone',
        'date_of_birth',
        'about',
        'location',
        'profile_picture',
        'fees'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }
   
    public function getJWTCustomClaims() {
        return [];
    } 

    
    public function highlights(){
        return $this->hasMany(Highlight::class, 'user_id');
    }
    public function posts(){
        return $this->hasMany(Post::class, 'user_id');
    }
    public function events(){
        return $this->hasMany(Event::class, 'organizer_id');
    }
    public function nationality(){
        return $this->belongsTo(Country::class, 'nationality_id');
    }
    public function residence(){
        return $this->belongsTo(Country::class, 'residence_id');
    }
    public function type(){
        return $this->belongsTo(User_type::class, 'type_id');
    }

    public function categories(){
        return $this->belongsToMany(Category::class, 'local_categories', 'local_id', 'category_id');
    }
    public function sentMessages(){
        return $this->belongsToMany(User::class, 'messages', 'sender_id', 'reciever_id');
    }
    public function recievedMessages(){
        return $this->belongsToMany(User::class, 'messages', 'reciever_id', 'sender_id');
    }
    public function notifications(){
        return $this->belongsToMany(User::class, 'notifications', 'to_id', 'from_id');
    }
    public function favorites(){
        return $this->belongsToMany(User::class, 'favorite_locals', 'user_id', 'local_id');
    }
    public function favoritedBy(){
        return $this->belongsToMany(User::class, 'favorite_locals', 'local_id', 'user_id');
    }
    public function bans(){
        return $this->belongsToMany(User::class, 'bans', 'banner_id', 'banned_id');
    }
    public function savedEvents(){
        return $this->belongsToMany(Event::class, 'saved_events', 'user_id', 'event_id');
    }
    // public function commentsPost(){
    //     return $this->belongsToMany(Post::class, 'comments', 'user_id', 'post_id');
    // }

}
