<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHighlightsTable extends Migration
{
    
    public function up()
    {
        Schema::create('highlights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('photo');
            $table->timestamp('uploaded_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('highlights');
    }
}
