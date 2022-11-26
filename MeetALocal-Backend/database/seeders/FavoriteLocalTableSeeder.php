<?php

namespace Database\Seeders;
use App\Models\FavoriteLocal;
use Illuminate\Database\Seeder;

class FavoriteLocalTableSeeder extends Seeder
{
    public function run()
    {
        FavoriteLocal::factory()->count(60)->create();
    }
}
