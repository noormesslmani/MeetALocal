<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropLocationFromUsersTable extends Migration
{

    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('location');
            $table->double('latitude');
            $table->double('longitude');
        });
    }

   
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('location');
            $table->dropColumn('latitude');
            $table->dropColumn('longitude');
        });
    }
}
