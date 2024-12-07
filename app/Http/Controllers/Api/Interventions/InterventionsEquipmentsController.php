<?php

namespace App\Http\Controllers\Api\Interventions;

use App\Models\Intervention;
// use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use Orion\Concerns\DisableAuthorization;


class InterventionsEquipmentsController extends RelationController
{
    use DisableAuthorization;

    protected $model = Intervention::class;

    protected $relation = 'equipments';
}