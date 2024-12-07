<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->string('location_id')->unique();
            $table->text('location_description')->nullable();
            $table->string('location_phone')->nullable();
            $table->string('location_email')->nullable();
            $table->text('location_address')->nullable();
            $table->text('location_postcode')->nullable();
            $table->text('location_city')->nullable();
            $table->string('location_country')->default('Tunisia');
            $table->string('location_coordinator')->nullable();
            $table->string('coordinator_post')->nullable();
            $table->string('coordinator_phone')->nullable();
            $table->string('coordinator_email')->nullable();
            $table->string('location_opening')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
};
