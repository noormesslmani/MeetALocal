<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    
    public function definition()
    {
        $userIds = User::pluck('id');
        return [
            'sender_id' => $this->faker->randomElement($userIds),
            'reciever_id' => $this->faker->randomElement($userIds),
            'content' => $this->faker->text(),
        ];
    }
}
