<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeReviewNullable extends Migration
{
    
    public function up()
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->string('review')->nullable()->change();
        });
    }

   
    public function down()
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn('review');
        });
    }
}
