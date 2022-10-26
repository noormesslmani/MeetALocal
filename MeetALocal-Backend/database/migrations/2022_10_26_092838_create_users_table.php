<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('type_id')->constrained('user_types');
            $table->foreignId('nationality_id')->constrained('countries');
            $table->foreignId('residence_id')->constrained('countries');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('name');
            $table->string('gender');
            $table->integer('phone');
            $table->date('date_of_birth');
            $table->string('about')->nullable();
            $table->string('location')->nullable();
            $table->string('profile_picture')->nullable();
            $table->integer('fees')->nullable();
            $table->timestamp('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
