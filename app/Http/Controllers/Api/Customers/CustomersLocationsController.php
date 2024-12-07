<?php

namespace App\Http\Controllers\Api\Customers;

use App\Models\Customer;
// use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use Orion\Concerns\DisableAuthorization;


class CustomersLocationsController extends RelationController
{
    use DisableAuthorization;

    protected $model = Customer::class;

    protected $relation = 'locations';

}
