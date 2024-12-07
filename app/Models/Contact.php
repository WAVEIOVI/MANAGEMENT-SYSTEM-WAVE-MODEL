<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'contact_full_name',
        'contact_post',
        'contact_phone',
        'contact_email',
    ];
    public function customer()
    {
        return $this->belongsTo('App\Models\Customer');
    }
}
