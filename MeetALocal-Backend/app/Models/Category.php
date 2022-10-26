<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function posts(){
        return $this->belongsToMany(Post::class, 'post_categories', 'category_id', 'post_id');
    }
    public function events(){
        return $this->belongsToMany(Event::class, 'event_categories', 'category_id', 'event_id');
    }
    public function users(){
        return $this->belongsToMany(User::class, 'user_categories', 'category_id', 'user_id');
    }
}
