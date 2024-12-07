<?php

namespace App\Http\Controllers\Api\Interventions;

use App\Models\Intervention;
use App\Models\Equipment;
use Orion\Http\Requests\Request;
use App\Http\Resources\TasksInterventionCollection;
use Orion\Http\Controllers\RelationController;
use Orion\Concerns\DisableAuthorization;


class InterventionsTasksController extends RelationController
{
    use DisableAuthorization;

    protected $collectionResource = TasksInterventionCollection::class;

    protected $model = Intervention::class;

    protected $relation = 'tasks_interventions';

    public function filterableBy() : array
    {
        return ['equipment_id'];
    }
    protected function beforeSave(Request $request, $intervention, $task)
    {
        $equipment = Equipment::find($request->input('equipment_id'));
        $task->park_id = $equipment->park_park_id;
        $task->area_id = $equipment->equipment_area;
        $task->qrc_id = $equipment->qrc_id;
        $task->internal_id = $equipment->internal_id;
        $task->serial_number = $equipment->serial_number;
        $task->equipment_brand = $equipment->equipment_brand;
        $task->equipment_category = $equipment->equipment_category;
        $task->equipment_model = $equipment->equipment_model;
        $task->equipment_weight = $equipment->equipment_weight;
        $task->equipment_pressure = $equipment->equipment_pressure;
        $task->equipment_status = $equipment->equipment_status;
        $intervention = Intervention::find($request->route('intervention'));
        $task->mission_id = $intervention->intervention_id;
        $task->intervention_frequency = $intervention->intervention_frequency;
    }
}
