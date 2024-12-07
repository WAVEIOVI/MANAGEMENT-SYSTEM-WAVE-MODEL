<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'location_id',
        'location_description',
        'location_phone',
        'location_email',
        'location_address',
        'location_postcode',
        'location_city',
        'location_country',
        'location_coordinator', // contact_full_name
        'coordinator_post', // contact_post
        'coordinator_phone', // contact_phone
        'coordinator_email', // contact_email
        'location_opening'
    ];

    public function customer()
    {
        return $this->belongsTo('App\Models\Customer');
    }

    public function park()
    {
    return $this->hasOne('App\Models\Park');
    }
}
