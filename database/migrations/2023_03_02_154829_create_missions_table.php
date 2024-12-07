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
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->unsignedBigInteger('park_id');
            $table->foreign('park_id')->references('id')->on('parks');
            $table->string('mission_id')->unique();
            $table->string('mission_order_id')->nullable();
            $table->date('mission_date')->nullable();
            $table->string('mission_type')->nullable();
            $table->date('intervention_date')->nullable();
            $table->string('intervention_duration')->nullable();
            $table->string('intervention_frequency')->nullable();
            $table->string('team_leader')->nullable();
            $table->string('team_driver')->nullable();
            $table->string('team_members')->nullable();
            $table->string('vehicle_model')->nullable();
            $table->string('resources_machines')->nullable();
            $table->string('resources_toolbox')->nullable();
            $table->string('fuel_transportation')->nullable();
            $table->string('accommodation')->nullable();
            $table->string('meals_food')->nullable();
            $table->string('pocket_money')->nullable();
            $table->string('repair_costs')->nullable();
            $table->string('miscellaneous_expenses')->nullable();
            $table->string('mission_finance_notes')->nullable();
            $table->enum('mission_status', ['pending', 'in_progress', 'completed']);
            $table->text('mission_notes')->nullable();
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
            $table->string('total_areas_per_park')->nullable();
            $table->string('total_equipments_per_park')->nullable();
            $table->string('total_fire_extinguisher_per_park')->nullable();
            $table->string('total_others_equipments_per_park')->nullable();
            $table->string('statistics_categories_count')->nullable();
            $table->string('statistics_fire_extinguisher_count')->nullable();
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
        Schema::dropIfExists('missions');
    }
};
