<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;
    protected $table = 'equipments';
    protected $fillable = [
        'park_id',
        'area_id',
        'qrc_id',
        'internal_id',
        'serial_number',
        'equipment_category',
        'equipment_model',
        'equipment_weight',
        'equipment_pressure',
        'mfg_date',
        'installation_date',
        'equipment_brand',
        'made_in',
        'ce_marking',
        'pictogram',
        'standard_sign',
        'medium_sign',
        'big_sign',
        'numbering_s_sign',
        'numbering_b_sign',
        'accessories_availability',
        'equipment_fixation',
        'equipment_status',
        // data from park
        'park_park_id',
        'park_customer_id',
        'customer_name',
        // data from area
        'equipment_area',
        'equipment_area_description',
        'equipment_area_accessibility',
        'equipment_area_classification',

    ];
    protected $casts = [
        'created_at' => 'date:Y-m-d',
        'updated_at' => 'date:Y-m-d',
    ];
    public function park()
    {
        return $this->belongsTo('App\Models\Park');
    }
    public function area()
    {
        return $this->belongsTo('App\Models\Area');
    }
    public function interventions()
    {
    return $this->belongsToMany('App\Models\Intervention');
    }
    public function tasks_interventions()
    {
    return $this->hasMany('App\Models\TasksIntervention');
    }
}
