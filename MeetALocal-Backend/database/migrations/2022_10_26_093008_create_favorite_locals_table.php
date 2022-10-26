<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFavoriteLocalsTable extends Migration
{
    public function up()
    {
        Schema::create('favorite_locals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('local_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamp('favorited_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('favorite_locals');
    }
}
