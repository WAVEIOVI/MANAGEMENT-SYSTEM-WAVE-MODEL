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
        Schema::create('interventions_equipments', function (Blueprint $table) {
            $table->unsignedBigInteger('intervention_id');
            $table->unsignedBigInteger('equipment_id');
            $table->foreign('intervention_id')->references('id')->on('interventions')->onDelete('cascade');
            $table->foreign('equipment_id')->references('id')->on('equipments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('interventions_equipments');
    }
};
