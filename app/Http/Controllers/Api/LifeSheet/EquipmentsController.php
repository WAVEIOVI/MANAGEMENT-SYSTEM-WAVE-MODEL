<?php

namespace App\Http\Controllers\Api\LifeSheet;

use App\Models\Equipment;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;


class EquipmentsController extends Controller
{
    use DisableAuthorization;

    protected $model = Equipment::class;

    public function searchableBy() : array
    {
        return ['qrc_id', 'internal_id', 'serial_number'];
    }

    public function filterableBy() : array
    {
        return ['park_park_id'];
    }

}
