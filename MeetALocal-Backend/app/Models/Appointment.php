<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'local_id',
        'date',
        'start_time',
        'end_time',
        'latitude',
        'longitude'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'local_id');
    }
    public function booking(){
        return $this->hasOne(BookedAppointment::class, 'appointment_id');
    }
}
