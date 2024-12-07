<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'order_date',
        'order_id',
        'order_contract_id',
        'order_location_id',
        'order_sending_type',
        'order_total',
        'order_note',
        'order_status',
    ];
    public function customer()
    {
        return $this->belongsTo('App\Models\Customer');
    }
}
