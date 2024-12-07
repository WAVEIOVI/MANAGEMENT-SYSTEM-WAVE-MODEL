<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;
    protected $fillable = [
        'park_id',
        'area_id',
        'area_description',
        'area_accessibility',
        'area_classification',
    ];

    public function park()
    {
        return $this->belongsTo('App\Models\Park');
    }
    public function equipments()
    {
    return $this->hasMany('App\Models\Equipment');
    }
}
