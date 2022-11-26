<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LocalCategory;
class LocalCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        LocalCategory::factory()->count(20)->create();
    }
}
