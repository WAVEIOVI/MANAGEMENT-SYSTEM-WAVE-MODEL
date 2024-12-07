<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerSatisfaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'intervention_id',
        'intervention_date',
        'mission_date',
        'customer_id',
        'customer_name',
        'location_id',
        'location_address',
        'customer_coordinator',
        'coordinator_phone',
        'coordinator_email',
        'coordinator_post',
        'quality_of_service',
        'knowledgeable_about_equipment',
        'arrived_on_time',
        'communication_during_process',
        'explanations_understandable',
        'likely_to_recommend',
        'feedback',
    ];
    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
}
