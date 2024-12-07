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
        Schema::create('general_checklists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intervention_id');
            $table->foreign('intervention_id')->references('id')->on('interventions')->onDelete('cascade');
            $table->string('ppe')->nullable();
            $table->string('cin')->nullable();
            $table->string('driver_license')->nullable();
            $table->string('vehicle_insurance')->nullable();
            $table->string('vehicle_registration')->nullable();
            $table->string('work_orders')->nullable();
            $table->string('employee_information')->nullable();
            $table->string('team_information')->nullable();
            // $table->boolean('coordinator_email')->default(false);
            $table->string('first_aid_kit')->nullable();
            $table->string('fire_extinguisher')->nullable();
            $table->string('fuel_level')->nullable();
            $table->string('tire_pressure')->nullable();
            $table->string('spare_tire')->nullable();
            $table->string('windshield_wipers')->nullable();
            $table->string('lights')->nullable();
            $table->string('brakes')->nullable();
            $table->string('battery')->nullable();
            $table->string('transmission_fluid')->nullable();
            $table->string('engine_oil_level')->nullable();
            $table->enum('checklist_status', ['in_progress', 'completed'])->default('in_progress');
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
        Schema::dropIfExists('general_checklists');
    }
};
