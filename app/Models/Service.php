<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $fillable = [
        'mission_service',
    ];
    public function mission()
    {
        return $this->belongsTo('App\Models\Mission');
    }
}
