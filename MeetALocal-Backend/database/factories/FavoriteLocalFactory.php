<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\FavoriteLocal;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavoriteLocalFactory extends Factory
{

    public function definition()
    {
        $LocalsIds = User::where('type_id',1)->pluck('id');
        $ForeignersIds = User::where('type_id',2)->pluck('id');
        return [
            'user_id' => $this->faker->randomElement($ForeignersIds),
            'local_id' => $this->faker->randomElement($LocalsIds),
        ];
    }
}
