<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalCategory extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'local_id',
        'category_id'
    ];
}
