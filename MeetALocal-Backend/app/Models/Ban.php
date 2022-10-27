<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ban extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'banner_id',
        'banned_id'
    ];
}
