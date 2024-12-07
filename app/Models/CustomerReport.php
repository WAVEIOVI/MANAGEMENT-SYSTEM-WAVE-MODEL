<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerReport extends Model
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
        'team_leader',
        'team',
        'observations',  // Any observations made during the intervention
        'recommendations',  // Recommendations for improvement
    ];
    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
}
