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
        Schema::create('work_area_checklists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intervention_id');
            $table->foreign('intervention_id')->references('id')->on('interventions')->onDelete('cascade');
            $table->string('hazards')->nullable();
            $table->string('work_zone')->nullable();
            $table->string('customer_notification')->nullable();
            $table->string('fire_equipment_access')->nullable();
            $table->string('fire_alarm_sprinklers')->nullable();
            $table->string('equipment_storage')->nullable();
            $table->string('material_storage')->nullable();
            $table->string('electrical_outlets_wiring')->nullable();
            $table->string('electrical_equipment')->nullable();
            $table->string('electrical_panels_breakers')->nullable();
            $table->string('ladders_scaffolds_elevated')->nullable();
            $table->string('fall_protection')->nullable();
            $table->string('emergency_evacuation_plan')->nullable();
            $table->string('emergency_contact_info')->nullable();
            $table->string('emergency_equipment_access')->nullable();
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
        Schema::dropIfExists('work_area_checklists');
    }
};
