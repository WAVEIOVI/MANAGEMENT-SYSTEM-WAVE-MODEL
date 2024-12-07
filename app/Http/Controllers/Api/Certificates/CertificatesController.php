<?php

namespace App\Http\Controllers\Api\Certificates;

use App\Models\Certificate;
use App\Models\Intervention;
use Orion\Http\Requests\Request;
use Orion\Http\Controllers\Controller;
use Orion\Concerns\DisableAuthorization;

class CertificatesController extends Controller
{
    use DisableAuthorization;

    protected $model = Certificate::class;

    protected function beforeSave(Request $request, $certificate)
    {
        $intervention = Intervention::find($request->input('intervention_id'));

        if ($intervention) {
            $certificate->mission_date = $intervention->mission_date;
            $certificate->intervention_date = $intervention->intervention_date;

            if ($intervention->intervention_frequency === 'quarterly') {
                // If intervention_frequency is 'quarterly', add 90 days to the start date
                $certificate->next_intervention_date = date('Y-m-d', strtotime($intervention->intervention_date . ' +90 days'));
            } elseif ($intervention->intervention_frequency === 'half-yearly') {
                // If intervention_frequency is 'half-yearly', add 180 days to the start date
                $certificate->next_intervention_date = date('Y-m-d', strtotime($intervention->intervention_date . ' +180 days'));
            } elseif ($intervention->intervention_frequency === 'yearly') {
                // If intervention_frequency is 'yearly', add 365 days to the start date
                $certificate->next_intervention_date = date('Y-m-d', strtotime($intervention->intervention_date . ' +365 days'));
            }
            $certificate->mission_id = $intervention->intervention_id;
            $certificate->customer_id = $intervention->mission_customer_id;
            $certificate->customer_name = $intervention->customer_name;
            $certificate->customer_phone = $intervention->customer_phone;
            $certificate->customer_email = $intervention->customer_email;
            $certificate->address_line1 = $intervention->address_line1;
            $certificate->address_line2 = $intervention->address_line2;
            $certificate->customer_postcode = $intervention->customer_postcode;
            $certificate->customer_city = $intervention->customer_city;
            $certificate->customer_country = $intervention->customer_country;
            $certificate->location_id = $intervention->mission_location_id;
            $certificate->location_address = $intervention->location_address;
            $certificate->location_postcode = $intervention->location_postcode;
            $certificate->location_city = $intervention->location_city;
            $certificate->location_country = $intervention->location_country;

            // Fetch tasksIntervention data related to the same intervention
            $tasksInterventionData = $intervention->tasks_interventions;

            // Format the data as needed and set it on the certificate
            $certificate->equipment_combination_count = $tasksInterventionData->groupBy(function ($item) {
                return $item->equipment_category . ' ' . $item->equipment_model . ' ' . $item->equipment_weight . ' ' . $item->equipment_pressure;
            })->map(function ($group) {
                return $group->count();
            });

            $certificate->tasks_per_intervention = $tasksInterventionData->groupBy('intervention_id')
                ->mapWithKeys(function ($group, $interventionId) {
                    return [$interventionId => $group->count()];
                });

            $certificate->statistics_status_count = $tasksInterventionData->groupBy('equipment_intervention_status')
                ->map(function ($status) {
                    return $status->count();
                });
        } else {
            // Handle the case where the related Intervention was not found
            // You can log an error, return a response, or handle it as needed
        }
    }
}
