<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralChecklist extends Model
{
    use HasFactory;
    protected $fillable = [
        'intervention_id',
        // PPE
        'ppe',
        // documentation
        'cin',
        'driver_license',
        'vehicle_insurance',
        'vehicle_registration',
        'work_orders',
        'employee_information',
        'team_information',
        // Emergency  Kit
        'first_aid_kit',
        'fire_extinguisher',
        // Vehicle Maintenance
        'fuel_level',
        'tire_pressure',
        'spare_tire',
        'windshield_wipers',
        'lights',
        'brakes',
        'battery',
        'transmission_fluid',
        'engine_oil_level',
        'checklist_status',
    ];
    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
}
