<?php

namespace Database\Seeders;
use App\Models\PostCategory;
use Illuminate\Database\Seeder;

class PostCategoryTableSeeder extends Seeder
{
    
    public function run()
    {
        PostCategory::factory()->count(40)->create();
    }
}
