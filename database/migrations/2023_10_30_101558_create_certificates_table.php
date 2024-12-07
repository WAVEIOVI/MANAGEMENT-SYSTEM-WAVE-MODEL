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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intervention_id');
            $table->foreign('intervention_id')->references('id')->on('interventions')->onDelete('cascade');
            $table->string('mission_id')->nullable();
            $table->string('certificate_id')->nullable();
            $table->date('mission_date')->nullable();
            $table->date('intervention_date')->nullable();
            $table->date('next_intervention_date')->nullable();
            $table->date('certificate_date')->nullable();
            $table->string('customer_id')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('address_line1')->nullable();
            $table->string('address_line2')->nullable();
            $table->string('customer_postcode')->nullable();
            $table->string('customer_city')->nullable();
            $table->string('customer_country')->nullable();
            $table->string('location_id')->nullable();
            $table->string('location_address')->nullable();
            $table->string('location_postcode')->nullable();
            $table->string('location_city')->nullable();
            $table->string('location_country')->nullable();
            $table->text('observations')->nullable();
            $table->text('recommendations')->nullable();
            $table->string('equipment_combination_count')->nullable();
            $table->string('tasks_per_intervention')->nullable();
            $table->string('statistics_status_count')->nullable();
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
        Schema::dropIfExists('certificates');
    }
};
