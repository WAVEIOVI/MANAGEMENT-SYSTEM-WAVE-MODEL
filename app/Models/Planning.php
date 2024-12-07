<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'start',
        'end',
        'calendar',
        'team',
        'location',
        'customer',
    ];
}
