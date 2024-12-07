<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerScrap extends Model
{
    use HasFactory;
    protected $fillable = [
        'equipment_type',
        'equipment_status',
        'quantity',
    ];
    public function intervention()
    {
        return $this->belongsTo('App\Models\Intervention');
    }
}
