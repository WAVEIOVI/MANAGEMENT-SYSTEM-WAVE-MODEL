<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Models\Equipment;

class EquipmentCollection extends ResourceCollection
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
            'total' => [
                'total_equipments' => Equipment::count(),
                'total_fire_extinguisher' => Equipment::where('equipment_category', 'Fire Extinguisher')->count(),
                'total_others_equipments' => Equipment::whereNot('equipment_category', 'Fire Extinguisher')->count(),
            ],
            'count' => [
                'equipment_per_park' => $this->collection->groupBy('park_id')
                ->mapWithKeys(function ($group, $parkId) {
                    return [$parkId => $group->count()];
                }),
                'fire_extinguisher_per_park' => $this->collection->where('equipment_category', 'Fire Extinguisher')->groupBy('park_id')
                ->mapWithKeys(function ($group, $parkId) {
                    return [$parkId => $group->count()];
                }),
                'others_equipments_per_park' => $this->collection->where('equipment_category', '!=', 'Fire Extinguisher')->groupBy('park_id')
                ->mapWithKeys(function ($group, $parkId) {
                    return [$parkId => $group->count()];
                }),
                'equipment_status_count' => $this->collection->groupBy('equipment_status')
                ->map(function ($status) {
                    return $status->count();
                }),
                'equipment_category_count' => $this->collection->groupBy('equipment_category')
                ->map(function ($category) {
                    return $category->count();
                }),
                'equipment_model_count' => $this->collection->groupBy('equipment_model')
                ->map(function ($model) {
                    return $model->count();
                }),
            ],
        ];
    }
}
