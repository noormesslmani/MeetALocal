<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\Event;
use App\Models\EventBooking;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventBookingFactory extends Factory
{
    
    public function definition()
    {
        $foreignerIds = User::where('type_id',2)->pluck('id');
        $eventIds= Event::pluck('id');
        return [
            'user_id' => $this->faker->randomElement($foreignerIds),
            'event_id' => $this->faker->randomElement($eventIds)
        ];
    }
}
