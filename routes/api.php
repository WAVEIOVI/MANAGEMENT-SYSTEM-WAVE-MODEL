<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;
use App\Http\Controllers\Api\Customers\CustomersController;
use App\Http\Controllers\Api\Customers\CustomersContactsController;
use App\Http\Controllers\Api\Customers\CustomersLocationsController;
use App\Http\Controllers\Api\Customers\CustomersContractsController;
use App\Http\Controllers\Api\Customers\CustomersOrdersController;
use App\Http\Controllers\Api\Parks\ParksController;
use App\Http\Controllers\Api\Parks\ParksAreasController;
use App\Http\Controllers\Api\Parks\ParksEquipmentsController;
use App\Http\Controllers\Api\Certificates\CertificatesController;
use App\Http\Controllers\Api\Missions\MissionsController;
use App\Http\Controllers\Api\Missions\MissionsServicesController;
use App\Http\Controllers\Api\Interventions\InterventionsController;
use App\Http\Controllers\Api\Interventions\InterventionsScrapsController;
use App\Http\Controllers\Api\Interventions\InterventionsClReportsController;
use App\Http\Controllers\Api\Interventions\InterventionsClSatisfactionsController;
use App\Http\Controllers\Api\Interventions\InterventionsGeneralChecklistController;
use App\Http\Controllers\Api\Interventions\InterventionsWorkAreaChecklistController;
use App\Http\Controllers\Api\Interventions\InterventionsMaterialChecklistController;
use App\Http\Controllers\Api\Interventions\InterventionsEquipmentsController;
use App\Http\Controllers\Api\Interventions\InterventionsTasksController;
use App\Http\Controllers\Api\Workshops\WorkshopsController;
use App\Http\Controllers\Api\LifeSheet\EquipmentsController;
use App\Http\Controllers\Api\LifeSheet\EquipmentsTasksController;
use App\Http\Controllers\Api\Plannings\PlanningsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['as' => 'api.'], function() {
    Orion::resource('customers', CustomersController::class);
    Orion::hasManyResource('customers', 'contacts', CustomersContactsController::class);
    Orion::hasManyResource('customers', 'locations', CustomersLocationsController::class);
    Orion::hasManyResource('customers', 'contracts', CustomersContractsController::class);
    Orion::hasManyResource('customers', 'orders', CustomersOrdersController::class);
    Orion::resource('parks', ParksController::class);
    Orion::hasManyResource('parks', 'areas', ParksAreasController::class);
    Orion::hasManyResource('parks', 'equipments', ParksEquipmentsController::class);
    Orion::resource('missions', MissionsController::class);
    Orion::resource('certificates', CertificatesController::class);
    Orion::hasManyResource('missions', 'services', MissionsServicesController::class);
    Orion::resource('interventions', InterventionsController::class);
    Orion::hasManyResource('interventions', 'customer_scraps', InterventionsScrapsController::class);
    Orion::hasOneResource('interventions', 'customer_report' , InterventionsClReportsController::class);
    Orion::hasOneResource('interventions', 'customer_satisfaction' , InterventionsClSatisfactionsController::class);
    Orion::hasOneResource('interventions', 'general_checklist' , InterventionsGeneralChecklistController::class);
    Orion::hasOneResource('interventions', 'work_area_checklist' , InterventionsWorkAreaChecklistController::class);
    Orion::hasOneResource('interventions', 'material_checklist' , InterventionsMaterialChecklistController::class);
    Orion::belongsToManyResource('interventions', 'equipments' , InterventionsEquipmentsController::class);
    Orion::hasManyResource('interventions', 'tasks' , InterventionsTasksController::class);
    Orion::resource('equipments', EquipmentsController::class);
    Orion::hasManyResource('equipments', 'tasks' , EquipmentsTasksController::class);
    Orion::resource('workshops', WorkshopsController::class);
    Orion::resource('plannings', PlanningsController::class);
});
