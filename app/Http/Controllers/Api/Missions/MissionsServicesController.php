<?php

namespace App\Http\Controllers\Api\Missions;

use App\Models\Mission;
// use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use Orion\Concerns\DisableAuthorization;


class MissionsServicesController extends RelationController
{
    use DisableAuthorization;

    protected $model = Mission::class;

    protected $relation = 'services';
}
