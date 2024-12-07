<?php

namespace App\Http\Controllers\Api\Parks;

use App\Models\Park;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;


class ParksController extends Controller
{
    use DisableAuthorization;

    protected $model = Park::class;

}
