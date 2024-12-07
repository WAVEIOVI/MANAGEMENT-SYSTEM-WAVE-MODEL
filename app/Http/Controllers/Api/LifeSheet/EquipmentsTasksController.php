<?php

namespace App\Http\Controllers\Api\LifeSheet;

// use App\Models\Intervention;
use App\Models\Equipment;
// use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use Orion\Concerns\DisableAuthorization;


class EquipmentsTasksController extends RelationController
{
    use DisableAuthorization;

    protected $model = Equipment::class;

    protected $relation = 'tasks_interventions';

    public function sortableBy() : array
    {
        return ['created_at'];
    }
}
