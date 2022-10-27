<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'details',
        'price'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function country(){
        return $this->belongsTo(Country::class, 'country_id');
    }
    public function categories(){
        return $this->belongsToMany(Category::class, 'post_categories', 'post_id', 'category_id');
    }
    public function comments(){
        return $this->belongsToMany(User::class, 'comments', 'post_id', 'user_id');
    }
}
