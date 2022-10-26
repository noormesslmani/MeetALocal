<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostCategoriesTable extends Migration
{

    public function up()
    {
        Schema::create('post_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained('posts');
            $table->foreignId('category_id')->constrained('categories');
        });
    }

    public function down()
    {
        Schema::dropIfExists('post_categories');
    }
}
