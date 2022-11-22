<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
class CommentTableSeeder extends Seeder
{
    public function run()
    {
        Comment::factory()->count(30)->create();
    }
}
