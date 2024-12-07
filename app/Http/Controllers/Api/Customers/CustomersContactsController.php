<?php

namespace App\Http\Controllers\Api\Customers;

use App\Models\Customer;
// use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use Orion\Concerns\DisableAuthorization;


class CustomersContactsController extends RelationController
{
    use DisableAuthorization;

    protected $model = Customer::class;

    protected $relation = 'contacts';

}
