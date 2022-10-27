<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\ UserLanguage;
use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserLanguageFactory extends Factory
{

    public function definition()
    {
        $userIds = User::pluck('id');
        $languageIds= Language::pluck('id');
        return [
            'user_id' => $this->faker->randomElement($userIds),
            'language_id' => $this->faker->randomElement($languageIds)
        ];
    }
}
