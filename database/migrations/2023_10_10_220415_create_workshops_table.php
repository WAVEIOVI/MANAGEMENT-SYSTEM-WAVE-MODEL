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
        Schema::create('workshops', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mission_id');
            $table->foreign('mission_id')->references('id')->on('missions');
            $table->string('workshop_id')->unique();
            $table->string('mission_type')->nullable();
            $table->date('mission_date')->nullable();
            $table->date('workshop_date')->nullable();
            $table->date('team_members')->nullable();
            $table->enum('workshop_status', ['pending', 'in_progress', 'completed'])->default('pending');
            // data customer_id
            $table->string('mission_customer_id')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('address_line1')->nullable();
            $table->string('address_line2')->nullable();
            $table->string('customer_postcode')->nullable();
            $table->string('customer_city')->nullable();
            $table->string('customer_country')->nullable();
            $table->string('general_coordinator')->nullable();
            $table->string('gc_phone')->nullable();
            $table->string('gc_email')->nullable();
            // data location_id
            $table->string('mission_loc_id')->nullable();
            $table->string('mission_location_id')->nullable();
            $table->text('location_description')->nullable();
            $table->string('location_phone')->nullable();
            $table->string('location_email')->nullable();
            $table->text('location_address')->nullable();
            $table->text('location_postcode')->nullable();
            $table->text('location_city')->nullable();
            $table->string('location_country')->nullable();
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
        Schema::dropIfExists('workshops');
    }
};
