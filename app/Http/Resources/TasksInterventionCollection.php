<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Models\TasksIntervention;

class TasksInterventionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    public function with($request)
    {

        return [
            'count' => [
                'equipment_combination_count_per_intervention' => $this->collection->groupBy(function ($item) {
                    return $item->equipment_category . ' ' . $item->equipment_model . ' ' . $item->equipment_weight . ' ' . $item->equipment_pressure;
                })->map(function ($group) {
                    return $group->count();
                }),
                'tasks_per_intervention' => $this->collection->groupBy('intervention_id')
                ->mapWithKeys(function ($group, $interventionId) {
                    return [$interventionId => $group->count()];
                }),
                'equipment_status_count_per_intervention' => $this->collection->groupBy('equipment_intervention_status')
                ->map(function ($status) {
                    return $status->count();
                }),
            ],
        ];
    }
}
