<?php

namespace App\Observers;

use App\Models\Mission;
use App\Models\Intervention;
use App\Models\Planning;
use App\Models\Workshop;

class MissionObserver
{
    /**
     * Handle the Mission "created" event.
     *
     * @param  \App\Models\Mission  $mission
     * @return void
     */
    public function created(Mission $mission)
    {
        if ($mission->mission_type === 'intervention') {
            $intervention = new Intervention();
            $intervention->mission_id = $mission->id;
            $intervention->intervention_id = $mission->mission_id;
            $intervention->mission_type = $mission->mission_type;
            $intervention->mission_date = $mission->mission_date;
            $intervention->intervention_date = $mission->intervention_date;
            $intervention->intervention_duration = $mission->intervention_duration;
            $intervention->intervention_frequency = $mission->intervention_frequency;
            $intervention->team_leader = $mission->team_leader;
            $intervention->team_driver = $mission->team_driver;
            $intervention->team_members = $mission->team_members;
            $intervention->vehicle_model = $mission->vehicle_model;
            $intervention->resources_machines = $mission->resources_machines;
            $intervention->resources_toolbox = $mission->resources_toolbox;
            $intervention->fuel_transportation = $mission->fuel_transportation;
            $intervention->accommodation = $mission->accommodation;
            $intervention->meals_food = $mission->meals_food;
            $intervention->pocket_money = $mission->pocket_money;
            $intervention->repair_costs = $mission->repair_costs;
            $intervention->miscellaneous_expenses = $mission->miscellaneous_expenses;
            $intervention->mission_finance_notes = $mission->mission_finance_notes;
            // data customer_id
            $intervention->mission_customer_id = $mission->mission_customer_id;
            $intervention->customer_name = $mission->customer_name;
            $intervention->customer_phone = $mission->customer_phone;
            $intervention->customer_email = $mission->customer_email;
            $intervention->address_line1 = $mission->address_line1;
            $intervention->address_line2 = $mission->address_line2;
            $intervention->customer_postcode = $mission->customer_postcode;
            $intervention->customer_city = $mission->customer_city;
            $intervention->customer_country = $mission->customer_country;
            $intervention->general_coordinator = $mission->general_coordinator;
            $intervention->gc_phone = $mission->gc_phone;
            $intervention->gc_email = $mission->gc_email;
            // data location_id
            $intervention->mission_loc_id = $mission->park_id;
            $intervention->mission_location_id = $mission->mission_location_id;
            $intervention->location_description = $mission->location_description;
            $intervention->location_phone = $mission->location_phone;
            $intervention->location_email = $mission->location_email;
            $intervention->location_address = $mission->location_address;
            $intervention->location_postcode = $mission->location_postcode;
            $intervention->location_city = $mission->location_city;
            $intervention->location_country = $mission->location_country;
            $intervention->location_coordinator = $mission->location_coordinator;
            $intervention->coordinator_post = $mission->coordinator_post;
            $intervention->coordinator_phone = $mission->coordinator_phone;
            $intervention->coordinator_email = $mission->coordinator_email;
            $intervention->location_opening = $mission->location_opening;
            $intervention->total_areas_per_park = $mission->total_areas_per_park;
            $intervention->total_equipments_per_park = $mission->total_equipments_per_park;
            $intervention->total_fire_extinguisher_per_park = $mission->total_fire_extinguisher_per_park;
            $intervention->total_others_equipments_per_park = $mission->total_others_equipments_per_park;
            $intervention->statistics_categories_count = $mission->statistics_categories_count;
            $intervention->statistics_fire_extinguisher_count = $mission->statistics_fire_extinguisher_count;
            $intervention->statistics_status_count = $mission->statistics_status_count;
            $intervention->save();
            // Create a new planning record associated with the mission
            $planning = new Planning();
            $planning->title = $mission->mission_id;
            $planning->start = $mission->created_at;
            $planning->end = $mission->created_at;
            $planning->start = $mission->created_at;
            if ($mission->intervention_frequency === 'quarterly') {
                // If intervention_frequency is 'quarterly', add 90 days to the start date
                $planning->start = date('Y-m-d', strtotime($mission->created_at . ' +90 days'));
            } elseif ($mission->intervention_frequency === 'half-yearly') {
                // If intervention_frequency is 'half-yearly', add 180 days to the start date
                $planning->start = date('Y-m-d', strtotime($mission->created_at . ' +180 days'));
            } elseif ($mission->intervention_frequency === 'yearly') {
                // If intervention_frequency is 'yearly', add 365 days to the start date
                $planning->start = date('Y-m-d', strtotime($mission->created_at . ' +365 days'));
            }
            $planning->calendar = "Prevision";
            $planning->team = $mission->team_members;
            $planning->location = $mission->location_address;
            $planning->customer = $mission->customer_name;

            // Set any other fields in the planning record as needed
            // $planning->field = $value;
            $planning->save();

        } elseif ($mission->mission_type === 'workshop') {
            $workshop = new Workshop();
            $workshop->mission_id = $mission->id;
            $workshop->workshop_id = $mission->mission_id;
            $workshop->mission_type = $mission->mission_type;
            $workshop->mission_date = $mission->mission_date;
            $workshop->workshop_date = $mission->intervention_date;
            $workshop->team_members = $mission->team_members;
            // data customer_id
            $workshop->mission_customer_id = $mission->mission_customer_id;
            $workshop->customer_name = $mission->customer_name;
            $workshop->customer_phone = $mission->customer_phone;
            $workshop->customer_email = $mission->customer_email;
            $workshop->address_line1 = $mission->address_line1;
            $workshop->address_line2 = $mission->address_line2;
            $workshop->customer_postcode = $mission->customer_postcode;
            $workshop->customer_city = $mission->customer_city;
            $workshop->customer_country = $mission->customer_country;
            $workshop->general_coordinator = $mission->general_coordinator;
            $workshop->gc_phone = $mission->gc_phone;
            $workshop->gc_email = $mission->gc_email;
            // data location_id
            $workshop->mission_loc_id = $mission->park_id;
            $workshop->mission_location_id = $mission->mission_location_id;
            $workshop->location_description = $mission->location_description;
            $workshop->location_phone = $mission->location_phone;
            $workshop->location_email = $mission->location_email;
            $workshop->location_address = $mission->location_address;
            $workshop->location_postcode = $mission->location_postcode;
            $workshop->location_city = $mission->location_city;
            $workshop->location_country = $mission->location_country;
            $workshop->location_coordinator = $mission->location_coordinator;
            $workshop->coordinator_post = $mission->coordinator_post;
            $workshop->coordinator_phone = $mission->coordinator_phone;
            $workshop->coordinator_email = $mission->coordinator_email;
            $workshop->location_opening = $mission->location_opening;
            $workshop->save();
        }
    }

    /**
     * Handle the Mission "updated" event.
     *
     * @param  \App\Models\Mission  $mission
     * @return void
     */
    public function updated(Mission $mission)
    {
        if ($mission->mission_type === 'intervention') {
            // Get the corresponding Intervention model and update it
         $intervention = Intervention::where('mission_id', $mission->id)->first();
         if ($intervention) {
         // Update the mission_date field in the Intervention model
         $intervention->intervention_id = $mission->mission_id;
         $intervention->mission_date = $mission->mission_date;
         $intervention->intervention_date = $mission->intervention_date;
         $intervention->intervention_duration = $mission->intervention_duration;
         $intervention->intervention_frequency = $mission->intervention_frequency;
         $intervention->team_leader = $mission->team_leader;
         $intervention->team_driver = $mission->team_driver;
         $intervention->team_members = $mission->team_members;
         $intervention->vehicle_model = $mission->vehicle_model;
         $intervention->resources_machines = $mission->resources_machines;
         $intervention->resources_toolbox = $mission->resources_toolbox;
         $intervention->fuel_transportation = $mission->fuel_transportation;
         $intervention->accommodation = $mission->accommodation;
         $intervention->meals_food = $mission->meals_food;
         $intervention->pocket_money = $mission->pocket_money;
         $intervention->repair_costs = $mission->repair_costs;
         $intervention->miscellaneous_expenses = $mission->miscellaneous_expenses;
         $intervention->mission_finance_notes = $mission->mission_finance_notes;
         $intervention->mission_customer_id = $mission->mission_customer_id;
         // Save the changes to the Intervention model
         $intervention->save();
        }
        $planning = Planning::where('title', $mission->mission_id)->first();
         if ($planning) {
            $planning->start = $mission->mission_date;
            if ($mission->intervention_frequency === 'quarterly') {
                // If intervention_frequency is 'quarterly', add 90 days to the start date
                $planning->start = date('Y-m-d', strtotime($mission->mission_date . ' +90 days'));
            } elseif ($mission->intervention_frequency === 'half-yearly') {
                // If intervention_frequency is 'half-yearly', add 180 days to the start date
                $planning->start = date('Y-m-d', strtotime($mission->mission_date . ' +180 days'));
            } elseif ($mission->intervention_frequency === 'yearly') {
                // If intervention_frequency is 'yearly', add 365 days to the start date
                $planning->start = date('Y-m-d', strtotime($mission->mission_date . ' +365 days'));
            }
            $planning->team = $mission->team_members;
            $planning->location = $mission->location_address;
            $planning->customer = $mission->customer_name;
            // Save the changes to the planning model
            $planning->save();
        }
    } elseif ($mission->mission_type === 'workshop') {
        // Get the corresponding Workshop model and update it
        $workshop = Workshop::where('mission_id', $mission->id)->first();
        if ($workshop) {
            // Update the fields
            $workshop->mission_id = $mission->id;
            $workshop->workshop_id = $mission->mission_id;
            $workshop->mission_type = $mission->mission_type;
            $workshop->mission_date = $mission->mission_date;
            $workshop->workshop_date = $mission->intervention_date;
            $workshop->team_members = $mission->team_members;
            // Save the changes to the Workshop model
            $workshop->save();
        }
    }
    }

    /**
     * Handle the Mission "deleted" event.
     *
     * @param  \App\Models\Mission  $mission
     * @return void
     */
    public function deleted(Mission $mission)
    {
        //
    }

    /**
     * Handle the Mission "restored" event.
     *
     * @param  \App\Models\Mission  $mission
     * @return void
     */
    public function restored(Mission $mission)
    {
        //
    }

    /**
     * Handle the Mission "force deleted" event.
     *
     * @param  \App\Models\Mission  $mission
     * @return void
     */
    public function forceDeleted(Mission $mission)
    {
        //
    }
}
