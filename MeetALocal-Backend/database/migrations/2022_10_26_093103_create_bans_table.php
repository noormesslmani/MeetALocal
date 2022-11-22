<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBansTable extends Migration
{

    public function up()
    {
        Schema::create('bans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('banner_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('banned_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamp('banned_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('bans');
    }
}
