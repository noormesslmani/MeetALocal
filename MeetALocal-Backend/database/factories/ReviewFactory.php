<?php

namespace Database\Factories;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
   
    public function definition()
    {
        $reviewerIds=User::where('type_id',2)->pluck('id');
        $localIds = User::where('type_id',1)->pluck('id');
        return [
            'local_id' => $this->faker->randomElement($localIds),
            'reviewer_id' => $this->faker->randomElement($reviewerIds),
            'review' => $this->faker->text(),
            'stars'=> $this->faker->randomElement([1,2,3,4,5]),
        ];
    }
}
