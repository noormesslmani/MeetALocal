<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserLanguage;
class UserLanguageTableSeeder extends Seeder
{
    
    public function run()
    {
        UserLanguage::factory()->count(40)->create();
    }
}
