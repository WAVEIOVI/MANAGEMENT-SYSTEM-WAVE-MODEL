<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'park_id',
        'mission_id',
        'mission_type',
        'mission_order_id',
        'mission_date',
        'intervention_date',
        'mission_status',
        'mission_notes',
        'intervention_duration',
        'intervention_frequency',
        'team_leader',
        'team_driver',
        'team_members',
        'vehicle_model',
        'resources_machines',
        'resources_toolbox',
        'fuel_transportation',
        'accommodation',
        'meals_food',
        'pocket_money',
        'repair_costs',
        'miscellaneous_expenses',
        'mission_finance_notes',
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
        'total_areas_per_park',
        'total_equipments_per_park',
        'total_fire_extinguisher_per_park',
        'total_others_equipments_per_park',
        'statistics_categories_count',
        'statistics_fire_extinguisher_count',
        'statistics_status_count',
    ];
    public function customer()
    {
        return $this->belongsTo('App\Models\Customer');
    }
    public function park()
    {
        return $this->belongsTo('App\Models\Park');
    }
    public function services()
    {
    return $this->hasMany('App\Models\Service');
    }
    public function intervention()
    {
    return $this->hasOne('App\Models\Intervention');
    }
    public function workshop()
    {
    return $this->hasOne('App\Models\Workshop');
    }

}
