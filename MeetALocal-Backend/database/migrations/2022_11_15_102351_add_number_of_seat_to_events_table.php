<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNumberOfSeatToEventsTable extends Migration
{
    
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->integer('seats')->nullable();
        });
    }

    
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('seats');
        });
    }
}
