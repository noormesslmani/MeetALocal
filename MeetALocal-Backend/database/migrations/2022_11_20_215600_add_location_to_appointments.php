<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationToAppointments extends Migration
{
   
    public function up()
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->double('latitude');
            $table->double('longitude');
        });
    }


    public function down()
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->double('latitude');
            $table->double('longitude');
        });
    }
}
