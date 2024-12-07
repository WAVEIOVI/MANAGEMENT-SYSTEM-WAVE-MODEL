<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'customer_website',
        'customer_type',
        'customer_activity',
        'customer_status',
        'address_line1',
        'address_line2',
        'customer_postcode',
        'customer_city',
        'customer_country',
        'general_coordinator',
        'gc_phone',
        'gc_email',
        'gc_language',
        'gc_gender',
        'gc_contact_options',
        'tax_id',
        'rne_id',
        'vat_exemption',
        'vat_exemption_start',
        'vat_exemption_end',
        'company_form_legal',
        'company_capital',
        'created_date',
        'bank_name',
        'bank_agency',
        'bank_rib',
        'customer_payment_method',
        'customer_note',
    ];

    public function locations()
    {
    return $this->hasMany('App\Models\Location');
    }
    public function contacts()
    {
    return $this->hasMany('App\Models\Contact');
    }

    public function contracts()
    {
    return $this->hasMany('App\Models\Contract');
    }

    public function orders()
    {
    return $this->hasMany('App\Models\Order');
    }

    public function parks()
    {
    return $this->hasMany('App\Models\Park');
    }

    public function missions()
    {
    return $this->hasMany('App\Models\Mission');
    }
}
