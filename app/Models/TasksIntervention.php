<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasksIntervention extends Model
{
    use HasFactory;
    protected $fillable = [
        'intervention_id',
        'equipment_id',
        'mission_id',
        'park_id',
        'area_id',
        'qrc_id',
        'internal_id',
        'serial_number',
        'equipment_brand',
        'equipment_category',
        'equipment_model',
        'equipment_weight',
        'equipment_pressure',
        'intervention_frequency',
        'equipment_status',
        'equipment_intervention_status',
        'equipment_verification',
        'raw_material_recharged',
        'azote_recharged',
        'weight_verification',
        'head_maintenance',
        'corps_maintenance',
        'hose_maintenance',
        'sandblasting',
        'paint',
        'hydro_test',
        'spare_parts',
        'standard_sign',
        'big_sign',
        'medium_sign',
        'pictogram',
        'numbering_s_sign',
        'numbering_b_sign',
        'fixation',
        'accessories',
    ];
    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
    public function equipment()
    {
        return $this->belongsTo('App\Models\Equipment');
    }
}
