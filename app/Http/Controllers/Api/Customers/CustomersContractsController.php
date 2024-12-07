<?php

namespace App\Http\Controllers\Api\Customers;

use App\Models\Customer;
// use Orion\Http\Requests\Request;
use Orion\Http\Controllers\RelationController;
use Orion\Concerns\DisableAuthorization;


class CustomersContractsController extends RelationController
{
    use DisableAuthorization;

    protected $model = Customer::class;

    protected $relation = 'contracts';

    public function filterableBy() : array
    {
        return ['contract_status'];

    }
    public function sortableBy() : array
    {
        return ['created_at'];
    }

}
