<?php

namespace App\Http\Controllers\Api\Parks;

use App\Models\Park;
// use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use App\Http\Resources\AreaCollection;
use Orion\Concerns\DisableAuthorization;


class ParksAreasController extends RelationController
{
    use DisableAuthorization;

    protected $collectionResource = AreaCollection::class;

    protected $model = Park::class;

    protected $relation = 'areas';
}
