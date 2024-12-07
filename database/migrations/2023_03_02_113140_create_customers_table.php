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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('customer_id')->unique();
            $table->string('customer_name')->unique();
            $table->string('customer_phone')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('customer_website')->nullable();
            $table->string('customer_type')->nullable();
            $table->string('customer_activity')->nullable();
            $table->string('customer_status')->nullable();
            $table->string('address_line1')->nullable();
            $table->string('address_line2')->nullable();
            $table->string('customer_postcode')->nullable();
            $table->string('customer_city')->nullable();
            $table->string('customer_country')->default('Tunisia');
            $table->string('general_coordinator')->nullable();
            $table->string('gc_phone')->nullable();
            $table->string('gc_email')->nullable();
            $table->string('gc_language')->nullable();
            $table->string('gc_gender')->nullable();
            $table->string('gc_contact_options')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('rne_id')->nullable();
            $table->string('vat_exemption')->nullable();
            $table->date('vat_exemption_start')->nullable();
            $table->date('vat_exemption_end')->nullable();
            $table->string('company_form_legal')->nullable();
            $table->string('company_capital')->nullable();
            $table->date('created_date')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bank_agency')->nullable();
            $table->string('bank_rib')->nullable();
            $table->string('customer_payment_method')->nullable();
            $table->text('customer_note')->nullable();
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
        Schema::dropIfExists('customers');
    }
};
