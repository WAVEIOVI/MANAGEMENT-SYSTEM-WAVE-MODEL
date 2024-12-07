<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Models\Location;
use App\Models\Area;
use App\Models\Mission;
use App\Models\Intervention;
use App\Observers\LocationObserver;
use App\Observers\AreaObserver;
use App\Observers\MissionObserver;
use App\Observers\InterventionObserver;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Location::observe(LocationObserver::class);
        Area::observe(AreaObserver::class);
        Mission::observe(MissionObserver::class);
        Intervention::observe(InterventionObserver::class);
    }
}
