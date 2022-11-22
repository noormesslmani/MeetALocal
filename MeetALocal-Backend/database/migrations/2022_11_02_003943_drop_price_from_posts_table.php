<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropPriceFromPostsTable extends Migration
{
    
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('price');
        });
    }

    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->integer('price');
        });
    }
}
