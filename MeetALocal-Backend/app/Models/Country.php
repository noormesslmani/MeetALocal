<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function nationals(){
        return $this->hasMany(User::class, 'nationality_id');
    }
    public function residents()
    {
        return $this->hasMany(User::class, 'residence_id');
    }
    public function events()
    {
        return $this->hasMany(Event::class, 'country_id');
    }
    public function posts(){
        return $this->hasMany(Post::class, 'country_id');
    }
}
