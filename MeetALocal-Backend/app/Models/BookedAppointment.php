<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookedAppointment extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'booker_id',
        'appointment_id'
    ];
    public function appointment(){
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
    public function booker(){
        return $this->belongsTo(User::class, 'booker_id');
    }
}
