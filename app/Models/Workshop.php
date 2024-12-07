<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasFactory;
    protected $fillable = [
        'mission_id',
        'workshop_id',
        'mission_type',
        'mission_date',
        'workshop_date',
        'workshop_status',
        'team_members',
        // Customer Data
        'mission_customer_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'address_line1',
        'address_line2',
        'customer_postcode',
        'customer_city',
        'customer_country',
        'general_coordinator',
        'gc_phone',
        'gc_email',
        'mission_loc_id',
        'mission_location_id',
        'location_description',
        'location_phone',
        'location_email',
        'location_address',
        'location_postcode',
        'location_city',
        'location_country',
        'location_coordinator',
        'coordinator_post',
        'coordinator_phone',
        'coordinator_email',
        'location_opening',
    ];

    public function mission()
    {
        return $this->belongsTo('App\Models\Mission');
    }
    // public function equipments()
    // {
    // return $this->belongsToMany('App\Models\Equipment','interventions_equipments');
    // }
}
