<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSavedEventsTable extends Migration
{

    public function up()
    {
        Schema::create('saved_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamp('saved_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('saved_events');
    }
}
