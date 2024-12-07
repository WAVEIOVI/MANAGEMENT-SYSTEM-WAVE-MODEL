<?php

namespace App\Http\Controllers\Api\Workshops;

use App\Models\Workshop;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;


class WorkshopsController extends Controller
{
    use DisableAuthorization;

    protected $model = Workshop::class;

}
