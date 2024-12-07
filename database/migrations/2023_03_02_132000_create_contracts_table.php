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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->date('contract_date');
            $table->string('contract_id');
            $table->string('contract_plan');
            $table->date('contract_start_date');
            $table->date('contract_end_date');
            $table->string('contract_payment_method');
            $table->string('contract_payment_deadline');
            $table->boolean('contract_exclusivity_clause')->default(false);
            $table->string('contract_status');
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
        Schema::dropIfExists('contracts');
    }
};