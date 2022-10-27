<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;
class MessageTableSeeder extends Seeder
{

    public function run()
    {
        Message::factory()->count(20)->create();
    }
}
