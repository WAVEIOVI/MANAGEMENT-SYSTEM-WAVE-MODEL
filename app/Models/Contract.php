<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'contract_date',
        'contract_id',
        'contract_plan',
        'contract_start_date',
        'contract_end_date',
        'contract_payment_method',
        'contract_payment_deadline',
        'contract_exclusivity_clause',
        'contract_status',
    ];
    public function customer()
    {
        return $this->belongsTo('App\Models\Customer');
    }
}
