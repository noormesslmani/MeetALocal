<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'organizer_id',
        'country_id',
        'title',
        'details',
        'place',
        'date',
        'fees',
        'photo'
    ];
    public function organizer(){
        return $this->belongsTo(User::class, 'organizer_id');
    }
    public function country(){
        return $this->belongsTo(Country::class, 'country_id');
    }
    public function categories(){
        return $this->belongsToMany(Category::class, 'event_categories', 'event_id', 'category_id');
    }
    public function savedBy(){
        return $this->belongsToMany(User::class, 'saved_events', 'event_id', 'user_id');
    }
    public function bookedBy(){
        return $this->belongsToMany(User::class, 'event_bookings', 'event_id', 'user_id');
    }
}
