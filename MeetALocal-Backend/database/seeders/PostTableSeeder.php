<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
class PostTableSeeder extends Seeder
{
    public function run()
    {
        Post::factory()->count(20)->create();
    }
}
