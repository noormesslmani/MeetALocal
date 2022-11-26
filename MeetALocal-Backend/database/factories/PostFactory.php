<?php

namespace Database\Factories;
use App\Models\Post;
use App\Models\User;
use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    
    public function definition()
    {
        $userIds=User::pluck('id');
        $countryIds= Country::pluck('id');
        return [
            'user_id' => $this->faker->randomElement($userIds),
            'country_id' => $this->faker->randomElement($countryIds),
            'details' => $this->faker->text(),
            'price' => $this->faker->randomNumber(2, false),
        ];
    }
}
