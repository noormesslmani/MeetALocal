<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
class ReviewTableSeeder extends Seeder
{
    
    public function run()
    {
        Review::factory()->count(50)->create();
    }
}
