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
        Schema::create('material_checklists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intervention_id');
            $table->foreign('intervention_id')->references('id')->on('interventions')->onDelete('cascade');
            $table->string('raw_materials_labeled')->nullable();
            $table->string('raw_materials_expired')->nullable();
            $table->string('ppe_available')->nullable();
            $table->string('spare_parts_labeled')->nullable();
            $table->string('spare_parts_working')->nullable();
            $table->string('spare_parts_expired')->nullable();
            $table->string('tools_labeled')->nullable();
            $table->string('tools_calibrated')->nullable();
            $table->string('tools_maintained')->nullable();
            $table->string('firefighting_equipment_working')->nullable();
            $table->string('fire_extinguishers_charged')->nullable();
            $table->string('fire_hoses_nozzles_stored')->nullable();
            $table->string('inspection_forms_updated')->nullable();
            $table->string('inspections_completed')->nullable();
            $table->string('inspections_signed_off')->nullable();
            $table->string('maintenance_logs_updated')->nullable();
            $table->string('maintenance_activities_completed')->nullable();
            $table->string('maintenance_logs_signed_off')->nullable();
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
        Schema::dropIfExists('material_checklists');
    }
};
