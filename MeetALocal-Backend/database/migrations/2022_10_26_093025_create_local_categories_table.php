<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLocalCategoriesTable extends Migration
{

    public function up()
    {
        Schema::create('local_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('local_id')->constrained('users');
            $table->foreignId('category_id')->constrained('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_categories');
    }
}
