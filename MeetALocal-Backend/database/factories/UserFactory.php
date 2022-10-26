<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class UserFactory extends Factory
{
    
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'type_id' => $this->faker->randomElement([1,2]),
            'nationality_id' => $this->faker->randomElement([1,2,3,4,5,6]),
            'residence_id' => $this->faker->randomElement([1,2,3,4,5,6]),
            'gender' => $this->faker->randomElement(['Male','Female']),
            'phone' => $this->faker->randomNumber(8, true),
            'date_of_birth' => $this->faker->date(),   
        ];
    }

    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
