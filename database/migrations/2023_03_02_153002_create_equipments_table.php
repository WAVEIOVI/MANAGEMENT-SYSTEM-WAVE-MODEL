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
        Schema::create('equipments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('park_id');
            $table->foreign('park_id')->references('id')->on('parks');
            $table->unsignedBigInteger('area_id');
            $table->foreign('area_id')->references('id')->on('areas');
            $table->string('park_park_id')->nullable();
            $table->string('park_customer_id')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('equipment_area')->nullable();
            $table->string('equipment_area_description')->nullable();
            $table->text('equipment_area_accessibility')->nullable();
            $table->text('equipment_area_classification')->nullable();
            $table->string('qrc_id');
            $table->string('internal_id')->nullable();
            $table->string('serial_number')->nullable();
            $table->string('equipment_category')->nullable();
            $table->string('equipment_model')->nullable();
            $table->string('equipment_weight')->nullable();
            $table->string('equipment_pressure')->nullable();
            $table->date('mfg_date')->nullable();
            $table->date('installation_date')->nullable();
            $table->string('equipment_brand')->nullable();
            $table->string('made_in')->nullable();
            $table->string('ce_marking')->nullable();
            $table->string('pictogram')->nullable();
            $table->string('standard_sign')->nullable();
            $table->string('medium_sign')->nullable();
            $table->string('big_sign')->nullable();
            $table->string('numbering_s_sign')->nullable();
            $table->string('numbering_b_sign')->nullable();
            $table->string('accessories_availability')->nullable();
            $table->string('equipment_fixation')->nullable();
            $table->string('equipment_status')->nullable();
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
        Schema::dropIfExists('equipments');
    }
};
