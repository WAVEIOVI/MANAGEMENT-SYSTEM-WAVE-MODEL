<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;
    protected $fillable = [
        'mission_id',
        'intervention_id',
        'mission_type',
        'mission_date',
        'intervention_date',
        'intervention_status',
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
        'intervention_notes',
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
        'total_areas_per_park',
        'total_equipments_per_park',
        'total_fire_extinguisher_per_park',
        'total_others_equipments_per_park',
        'statistics_categories_count',
        'statistics_fire_extinguisher_count',
        'statistics_status_count',
    ];

    public function mission()
    {
        return $this->belongsTo('App\Models\Mission');
    }
    public function certificate()
    {
    return $this->hasOne('App\Models\Certificate');
    }
    public function customer_report()
    {
    return $this->hasOne('App\Models\CustomerReport');
    }
    public function customer_satisfaction()
    {
    return $this->hasOne('App\Models\CustomerSatisfaction');
    }
    public function customer_scraps()
    {
    return $this->hasMany('App\Models\CustomerScrap');
    }
    public function general_checklist()
    {
    return $this->hasOne('App\Models\GeneralChecklist');
    }
    public function work_area_checklist()
    {
    return $this->hasOne('App\Models\WorkAreaChecklist');
    }
    public function material_checklist()
    {
    return $this->hasOne('App\Models\MaterialChecklist');
    }
    public function equipments()
    {
    return $this->belongsToMany('App\Models\Equipment','interventions_equipments');
    }
    public function tasks_interventions()
    {
    return $this->hasMany('App\Models\TasksIntervention');
    }
}
