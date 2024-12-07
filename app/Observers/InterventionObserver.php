<?php

namespace App\Observers;

use App\Models\Intervention;
use App\Models\CustomerReport;
use App\Models\CustomerSatisfaction;
use App\Models\GeneralChecklist;
use App\Models\WorkAreaChecklist;
use App\Models\MaterialChecklist;

class InterventionObserver
{
    /**
     * Handle the Intervention "created" event.
     *
     * @param  \App\Models\Intervention  $intervention
     * @return void
     */
    public function created(Intervention $intervention)
    {
        $customer_report = new CustomerReport([
            'intervention_id' => $intervention->id,
            'mission_id' => $intervention->intervention_id,
            'intervention_date' => $intervention->intervention_date,
            'mission_date' => $intervention->mission_date,
            'customer_id' => $intervention->mission_customer_id,
            'customer_name' => $intervention->customer_name,
            'location_id' => $intervention->mission_location_id,
            'location_address' => $intervention->location_address,
            'customer_coordinator' => $intervention->location_coordinator,
            'coordinator_post' => $intervention->coordinator_post,
            'coordinator_phone' => $intervention->coordinator_phone,
            'coordinator_email' => $intervention->coordinator_email,
            'team_leader' => $intervention->team_leader,
            'team' => $intervention->team_members,
        ]);
        $intervention->customer_report()->save($customer_report);

        $customer_satisfaction = new CustomerSatisfaction([
            'intervention_id' => $intervention->id,
            'mission_id' => $intervention->intervention_id,
            'intervention_date' => $intervention->intervention_date,
            'mission_date' => $intervention->mission_date,
            'customer_id' => $intervention->mission_customer_id,
            'customer_name' => $intervention->customer_name,
            'location_id' => $intervention->mission_location_id,
            'location_address' => $intervention->location_address,
            'customer_coordinator' => $intervention->location_coordinator,
            'coordinator_post' => $intervention->coordinator_post,
            'coordinator_phone' => $intervention->coordinator_phone,
            'coordinator_email' => $intervention->coordinator_email,
        ]);
        $intervention->customer_satisfaction()->save($customer_satisfaction);

        $general_checklist = new GeneralChecklist([
            'intervention_id' => $intervention->id,
        ]);
        $intervention->general_checklist()->save($general_checklist);

        $work_area_checklist = new WorkAreaChecklist([
            'intervention_id' => $intervention->id,
        ]);
        $intervention->work_area_checklist()->save($work_area_checklist);

        $material_checklist = new MaterialChecklist([
            'intervention_id' => $intervention->id,
        ]);
        $intervention->material_checklist()->save($material_checklist);
    }

    /**
     * Handle the Intervention "updated" event.
     *
     * @param  \App\Models\Intervention  $intervention
     * @return void
     */
    public function updated(Intervention $intervention)
    {
        $customer_report = $intervention->customer_report;
        $customer_report->intervention_id = $intervention->id;
        $customer_report->mission_id = $intervention->intervention_id;
        $customer_report->intervention_date = $intervention->intervention_date;
        $customer_report->mission_date = $intervention->mission_date;
        $customer_report->customer_id = $intervention->mission_customer_id;
        $customer_report->customer_name = $intervention->customer_name;
        $customer_report->location_id = $intervention->mission_location_id;
        $customer_report->location_address = $intervention->location_address;
        $customer_report->customer_coordinator = $intervention->location_coordinator;
        $customer_report->coordinator_post = $intervention->coordinator_post;
        $customer_report->coordinator_phone = $intervention->coordinator_phone;
        $customer_report->coordinator_email = $intervention->coordinator_email;
        $customer_report->team_leader = $intervention->team_leader;
        $customer_report->team = $intervention->team_members;
        $customer_report->save();

        $customer_satisfaction = $intervention->customer_satisfaction;
        $customer_satisfaction->intervention_id = $intervention->id;
        $customer_satisfaction->mission_id = $intervention->intervention_id;
        $customer_satisfaction->intervention_date = $intervention->intervention_date;
        $customer_satisfaction->mission_date = $intervention->mission_date;
        $customer_satisfaction->customer_id = $intervention->mission_customer_id;
        $customer_satisfaction->customer_name = $intervention->customer_name;
        $customer_satisfaction->location_id = $intervention->mission_location_id;
        $customer_satisfaction->location_address = $intervention->location_address;
        $customer_satisfaction->customer_coordinator = $intervention->location_coordinator;
        $customer_satisfaction->coordinator_post = $intervention->coordinator_post;
        $customer_satisfaction->coordinator_phone = $intervention->coordinator_phone;
        $customer_satisfaction->coordinator_email = $intervention->coordinator_email;
        $customer_satisfaction->save();
    }

    /**
     * Handle the Intervention "deleted" event.
     *
     * @param  \App\Models\Intervention  $intervention
     * @return void
     */
    public function deleted(Intervention $intervention)
    {
        //
    }

    /**
     * Handle the Intervention "restored" event.
     *
     * @param  \App\Models\Intervention  $intervention
     * @return void
     */
    public function restored(Intervention $intervention)
    {
        //
    }

    /**
     * Handle the Intervention "force deleted" event.
     *
     * @param  \App\Models\Intervention  $intervention
     * @return void
     */
    public function forceDeleted(Intervention $intervention)
    {
        //
    }
}
