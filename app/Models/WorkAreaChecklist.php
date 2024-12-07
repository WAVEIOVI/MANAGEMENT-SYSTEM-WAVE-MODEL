<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkAreaChecklist extends Model
{
    use HasFactory;
    protected $fillable = [
        'intervention_id',
        //Site Assessment
        'hazards',
        'work_zone',
        'customer_notification',
        //Fire Equipment Inspection
        'fire_equipment_access',
        'fire_alarm_sprinklers',
        //Equipment Storage
        'equipment_storage',
        'material_storage',
        //Electrical Safety
        'electrical_outlets_wiring',
        'electrical_equipment',
        'electrical_panels_breakers',
        //Fall Protection
        'ladders_scaffolds_elevated',
        'fall_protection',
        //Emergency Procedures
        'emergency_evacuation_plan',
        'emergency_contact_info',
        'emergency_equipment_access',
        'checklist_status',
    ];

    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
}
