<?php

namespace App\Http\Controllers\Api\Parks;

use App\Models\Park;
use App\Models\Area;
use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use App\Http\Resources\EquipmentCollection;
use Orion\Concerns\DisableAuthorization;


class ParksEquipmentsController extends RelationController
{
    use DisableAuthorization;

    protected $collectionResource = EquipmentCollection::class;

    protected $model = Park::class;

    protected $relation = 'equipments';
    public function searchableBy() : array
    {
        return ['qrc_id', 'internal_id', 'serial_number', 'equipment_area', 'equipment_area_description'];
    }
    public function filterableBy() : array
    {
        return ['equipment_category','equipment_model','area_description'];
    }

    protected function beforeSave(Request $request, $park, $equipment)
    {
    $area = Area::find($request->input('area_id'));
    $equipment->equipment_area = $area->area_id;
    $equipment->equipment_area_description = $area->area_description;
    $equipment->equipment_area_accessibility = $area->area_accessibility;
    $equipment->equipment_area_classification = $area->area_classification;
    $park = Park::find($request->route('park'));
    $equipment->park_park_id = $park->park_location_id;
    $equipment->park_customer_id = $park->park_customer_id;
    $equipment->customer_name = $park->customer_name;
    }
}
