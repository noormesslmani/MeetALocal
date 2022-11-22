<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Post;
class CommentFactory extends Factory
{

    public function definition()
    {
        $userIds = User::pluck('id');
        $postIds = Post::pluck('id');
        return [
            'post_id' => $this->faker->randomElement($postIds),
            'user_id' => $this->faker->randomElement($userIds),
            'content' => $this->faker->text(),
        ];
    }
}
