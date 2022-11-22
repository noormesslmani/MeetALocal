<?php

namespace Database\Seeders;
use App\Models\EventBooking;
use Illuminate\Database\Seeder;

class EventBookingSeeder extends Seeder
{
    
    public function run()
    {
        EventBooking::factory()->count(25)->create();
    }
}
