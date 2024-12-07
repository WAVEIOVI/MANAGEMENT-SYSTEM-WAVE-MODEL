<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;
    protected $fillable = [
    'intervention_id',
    'certificate_id',
    'mission_date',
    'intervention_date',
    'next_intervention_date',
    'certificate_date',
    'mission_id',
    'customer_id',
    'customer_name',
    'customer_phone',
    'customer_email',
    'address_line1',
    'address_line2',
    'customer_postcode',
    'customer_city',
    'customer_country',
    'location_id',
    'location_address',
    'location_postcode',
    'location_city',
    'location_country',
    'observations',  // Any observations made during the intervention
    'recommendations',  // Recommendations for improvement,
    'equipment_combination_count',
    'tasks_per_intervention',
    'statistics_status_count',
    ];
    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
    public function getTasksInterventionDataAttribute()
{
    return $this->intervention->tasksInterventions()->get();
}

}
