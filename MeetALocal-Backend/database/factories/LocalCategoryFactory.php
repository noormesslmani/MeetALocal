<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\LocalCategory;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class LocalCategoryFactory extends Factory
{
    
    public function definition()
    {
        $localIds = User::where('type_id',1)->pluck('id');
        $categoryIds= Category::pluck('id');
        return [
            'local_id' => $this->faker->randomElement($localIds),
            'category_id' => $this->faker->randomElement($categoryIds),
        ];
    }
}