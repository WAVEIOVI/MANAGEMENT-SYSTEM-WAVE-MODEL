<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Park extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'location_id',
        'park_customer_id',  // customers Table: customer_id
        'customer_name', // customers Table: customer_name
        'park_location_id', // locations Table: location_id
        'location_address', // locations Table: location_address
        'location_postcode', // locations Table: location_postcode
        'location_city', // locations Table: location_city
        'location_country', // locations Table: location_country
    ];
    protected $casts = [
        'created_at' => 'date:Y-m-d',
        'updated_at' => 'date:Y-m-d',
    ];

    public function customer()
    {
        return $this->belongsTo('App\Models\Customer');
    }
    public function location()
    {
        return $this->belongsTo('App\Models\Location');
    }

    public function areas()
    {
    return $this->hasMany('App\Models\Area');
    }

    public function equipments()
    {
    return $this->hasMany('App\Models\Equipment');
    }

    public function missions()
    {
        return $this->hasMany('App\Models\Mission');
    }
}
