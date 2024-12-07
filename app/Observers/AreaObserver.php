<?php

namespace App\Observers;

use App\Models\Area;
use App\Models\Equipment;

class AreaObserver
{
    /**
     * Handle the Area "created" event.
     *
     * @param  \App\Models\Area  $area
     * @return void
     */
    public function created(Area $area)
    {
        //
    }

    /**
     * Handle the Area "updated" event.
     *
     * @param  \App\Models\Area  $area
     * @return void
     */
    public function updated(Area $area)
    {
        // Get all equipment with the updated area_id
    $equipment = Equipment::where('area_id', $area->id)->get();

    // Update the equipment with the new area information
    foreach ($equipment as $e) {
        $e->equipment_area = $area->area_id;
        $e->equipment_area_description = $area->area_description;
        $e->equipment_area_accessibility = $area->area_accessibility;
        $e->equipment_area_classification = $area->area_classification;
        $e->save();
    }
    }

    /**
     * Handle the Area "deleted" event.
     *
     * @param  \App\Models\Area  $area
     * @return void
     */
    public function deleted(Area $area)
    {
        //
    }

    /**
     * Handle the Area "restored" event.
     *
     * @param  \App\Models\Area  $area
     * @return void
     */
    public function restored(Area $area)
    {
        //
    }

    /**
     * Handle the Area "force deleted" event.
     *
     * @param  \App\Models\Area  $area
     * @return void
     */
    public function forceDeleted(Area $area)
    {
        //
    }
}
