<?php

namespace App\Http\Controllers\Api\Missions;

use App\Models\Mission;
use App\Models\Customer;
use App\Models\Location;
use App\Models\Park;
use Orion\Http\Requests\Request;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;


class MissionsController extends Controller
{
    use DisableAuthorization;

    protected $model = Mission::class;
    protected function beforeSave(Request $request, $mission)
    {
        $customer = Customer::find($request->input('customer_id'));
        $mission->mission_customer_id = $customer->customer_id;
        $mission->customer_name = $customer->customer_name;
        $mission->customer_phone = $customer->customer_phone;
        $mission->customer_email = $customer->customer_email;
        $mission->address_line1 = $customer->address_line1;
        $mission->address_line2 = $customer->address_line2;
        $mission->customer_postcode = $customer->customer_postcode;
        $mission->customer_city = $customer->customer_city;
        $mission->customer_country = $customer->customer_country;
        $mission->general_coordinator = $customer->general_coordinator;
        $mission->gc_phone = $customer->gc_phone;
        $mission->gc_email = $customer->gc_email;

        $location = Location::find($request->input('park_id'));
        $mission->mission_location_id = $location->location_id;
        $mission->location_description = $location->location_description;
        $mission->location_phone = $location->location_phone;
        $mission->location_email = $location->location_email;
        $mission->location_address = $location->location_address;
        $mission->location_postcode = $location->location_postcode;
        $mission->location_city = $location->location_city;
        $mission->location_country = $location->location_country;
        $mission->location_coordinator = $location->location_coordinator;
        $mission->coordinator_post = $location->coordinator_post;
        $mission->coordinator_phone = $location->coordinator_phone;
        $mission->coordinator_email = $location->coordinator_email;
        $mission->location_opening = $location->location_opening;

        $park = Park::find($request->input('park_id'));
        $mission->total_areas_per_park = $park->areas()->count();
        $mission->total_equipments_per_park = $park->equipments()->count();
        $mission->total_fire_extinguisher_per_park = $park->equipments()->where('equipment_category', 'Fire Extinguisher')->count();
        $mission->total_others_equipments_per_park = $park->equipments()->where('equipment_category', '!=', 'Fire Extinguisher')->count();
        $mission->statistics_status_count = $park->equipments()->get()->groupBy('equipment_status')->map(function ($status) {
            return $status->count();
        });
        $mission->statistics_categories_count = $park->equipments()->get()->groupBy('equipment_category')->map(function ($category) {
            return $category->count();
        });
        $mission->statistics_fire_extinguisher_count = $park->equipments()->get()->groupBy('equipment_model')->map(function ($model) {
            return $model->count();
        });
    }
}
