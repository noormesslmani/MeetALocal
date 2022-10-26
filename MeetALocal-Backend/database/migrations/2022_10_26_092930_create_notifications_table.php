<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_id')->constrained('users');
            $table->foreignId('to_id')->constrained('users');
            $table->string('content');
            $table->timestamp('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
