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
        Schema::create('tasks_interventions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intervention_id');
            $table->unsignedBigInteger('equipment_id');
            $table->foreign('intervention_id')->references('id')->on('interventions')->onDelete('cascade');
            $table->foreign('equipment_id')->references('id')->on('equipments')->onDelete('cascade');
            $table->string('mission_id')->nullable();
            $table->string('park_id')->nullable();
            $table->string('area_id')->nullable();
            $table->string('qrc_id')->nullable();
            $table->string('internal_id')->nullable();
            $table->string('serial_number')->nullable();
            $table->string('equipment_brand')->nullable();
            $table->string('equipment_category')->nullable();
            $table->string('equipment_model')->nullable();
            $table->string('equipment_weight')->nullable();
            $table->string('equipment_pressure')->nullable();
            $table->string('intervention_frequency')->nullable();
            $table->string('equipment_intervention_status')->nullable();
            $table->string('equipment_status')->nullable();
            $table->string('equipment_verification')->nullable();
            $table->string('raw_material_recharged')->nullable();
            $table->string('azote_recharged')->nullable();
            $table->string('weight_verification')->nullable();
            $table->string('head_maintenance')->nullable();
            $table->string('corps_maintenance')->nullable();
            $table->string('hose_maintenance')->nullable();
            $table->string('sandblasting')->nullable();
            $table->string('paint')->nullable();
            $table->string('hydro_test')->nullable();
            $table->string('spare_parts')->nullable();
            $table->string('standard_sign')->nullable();
            $table->string('big_sign')->nullable();
            $table->string('medium_sign')->nullable();
            $table->string('pictogram')->nullable();
            $table->string('numbering_s_sign')->nullable();
            $table->string('numbering_b_sign')->nullable();
            $table->string('fixation')->nullable();
            $table->string('accessories')->nullable();
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
        Schema::dropIfExists('tasks_interventions');
    }
};
