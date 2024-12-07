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
        Schema::create('customer_satisfactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intervention_id');
            $table->foreign('intervention_id')->references('id')->on('interventions')->onDelete('cascade');
            $table->string('mission_id')->nullable();
            $table->date('mission_date')->nullable();
            $table->date('intervention_date')->nullable();
            $table->string('customer_id')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('location_id')->nullable();
            $table->string('location_address')->nullable();
            $table->string('customer_coordinator')->nullable();
            $table->string('coordinator_post')->nullable();
            $table->string('coordinator_phone')->nullable();
            $table->string('coordinator_email')->nullable();
            $table->string('quality_of_service')->nullable();
            $table->string('knowledgeable_about_equipment')->nullable();
            $table->string('arrived_on_time')->nullable();
            $table->string('communication_during_process')->nullable();
            $table->string('explanations_understandable')->nullable();
            $table->string('likely_to_recommend')->nullable();
            $table->text('feedback')->nullable();
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
        Schema::dropIfExists('customer_satisfactions');
    }
};
