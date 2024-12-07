<?php

namespace App\Http\Controllers\Api\Plannings;

use App\Models\Planning;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;


class PlanningsController extends Controller
{
    use DisableAuthorization;

    protected $model = Planning::class;

    public function filterableBy() : array
    {
        return ['calendar'];
    }
}
