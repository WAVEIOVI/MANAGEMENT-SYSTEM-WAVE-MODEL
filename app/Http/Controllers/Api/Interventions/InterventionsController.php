<?php

namespace App\Http\Controllers\Api\Interventions;

use App\Models\Intervention;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;


class InterventionsController extends Controller
{
    use DisableAuthorization;

    protected $model = Intervention::class;

}
