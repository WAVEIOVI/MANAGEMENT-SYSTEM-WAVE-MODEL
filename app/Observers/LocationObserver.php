<?php

namespace App\Observers;

use App\Models\Location;
use App\Models\Park;
use App\Models\contact;

class LocationObserver
{
    /**
     * Handle the Location "created" event.
     *
     * @param  \App\Models\Location  $location
     * @return void
     */
    public function created(Location $location)
    {
        $customer = $location->customer;
        $park = new Park([
            'customer_id' => $location->customer_id,
            'location_id' => $location->id,
            'park_customer_id' => $customer->customer_id,
            'customer_name' => $customer->customer_name,
            'park_location_id' => $location->location_id,
            'location_address' => $location->location_address,
            'location_postcode' => $location->location_postcode,
            'location_city' => $location->location_city,
        ]);
        $location->park()->save($park);
    }
    /**
     * Listen to the Location "creating" event.
     *
     * @param  \App\Models\Location  $location
     * @return void
     */

    public function creating(Location $location)
    {
        // Set location_coordinator from the related contact if it exists
        if ($location->location_coordinator) {
            $contact = Contact::where('customer_id', $location->customer_id)
                ->where('contact_full_name', $location->location_coordinator)
                ->first();
            if ($contact) {
                $location->location_coordinator = $contact->contact_full_name;
                $location->coordinator_post = $contact->contact_post;
                $location->coordinator_phone = $contact->contact_phone;
                $location->coordinator_email = $contact->contact_email;
            }
        }
    }

    /**
     * Handle the Location "updated" event.
     *
     * @param  \App\Models\Location  $location
     * @return void
     */
    public function updated(Location $location)
    {
        $park = $location->park;
        $park->location_address = $location->location_address;
        $park->location_postcode = $location->location_postcode;
        $park->location_city = $location->location_city;
        $park->location_country = $location->location_country;
        $park->save();
    }

    /**
     * Listen to the Location "updating" event.
     *
     * @param  \App\Models\Location  $location
     * @return void
     */
    public function updating(Location $location)
    {
        // Set location_coordinator from the related contact if it exists
        if ($location->location_coordinator) {
            $contact = Contact::where('customer_id', $location->customer_id)
                ->where('contact_full_name', $location->location_coordinator)
                ->first();
            if ($contact) {
                $location->location_coordinator = $contact->contact_full_name;
                $location->coordinator_post = $contact->contact_post;
                $location->coordinator_phone = $contact->contact_phone;
                $location->coordinator_email = $contact->contact_email;
            }
        }
    }

    /**
     * Handle the Location "deleted" event.
     *
     * @param  \App\Models\Location  $location
     * @return void
     */
    public function deleted(Location $location)
    {
        $location->park()->delete();
    }

    /**
     * Handle the Location "restored" event.
     *
     * @param  \App\Models\Location  $location
     * @return void
     */
    public function restored(Location $location)
    {
        //
    }

    /**
     * Handle the Location "force deleted" event.
     *
     * @param  \App\Models\Location  $location
     * @return void
     */
    public function forceDeleted(Location $location)
    {
        //
    }
}
