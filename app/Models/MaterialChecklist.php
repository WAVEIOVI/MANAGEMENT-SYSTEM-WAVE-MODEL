<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialChecklist extends Model
{
    use HasFactory;
    protected $fillable = [
        //Raw Materials
        'raw_materials_labeled',
        'raw_materials_expired',
        'ppe_available',
        //Spare Parts
        'spare_parts_labeled',
        'spare_parts_working',
        'spare_parts_expired',
        //Tools and Equipment
        'tools_labeled',
        'tools_calibrated',
        'tools_maintained',
        //Fire Fighting Equipment
        'firefighting_equipment_working',
        'fire_extinguishers_charged',
        'fire_hoses_nozzles_stored',
        //Inspection Forms
        'inspection_forms_updated',
        'inspections_completed',
        'inspections_signed_off',
        //Maintenance Logs
        'maintenance_logs_updated',
        'maintenance_activities_completed',
        'maintenance_logs_signed_off',
        'checklist_status',
    ];
    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
}
