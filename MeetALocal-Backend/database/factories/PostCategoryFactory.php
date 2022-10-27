<?php

namespace Database\Factories;
use App\Models\Post;
use App\Models\ PostCategory;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostCategoryFactory extends Factory
{
    
    public function definition()
    {
        $postIds = Post::pluck('id');
        $categoryIds= Category::pluck('id');
        return [
            'post_id' => $this->faker->randomElement($postIds),
            'category_id' => $this->faker->randomElement($categoryIds)
        ];
    }
}
