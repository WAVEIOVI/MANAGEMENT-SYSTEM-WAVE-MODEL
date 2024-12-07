<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Models\Area;

class AreaCollection extends ResourceCollection
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
                'total_areas' => Area::count(),
                'areas_per_park' => $this->collection->groupBy('park_id')
                ->mapWithKeys(function ($group, $parkId) {
                    return [$parkId => $group->count()];
                })
            ],
        ];
    }
}
