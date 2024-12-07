<?php

namespace App\Http\Controllers\Api\Customers;

use App\Models\Customer;
use Orion\Http\Controllers\Controller;
use App\Http\Resources\CustomerCollection;
use Orion\Http\Requests\Request;
use Orion\Concerns\DisableAuthorization;


class CustomersController extends Controller
{
    use DisableAuthorization;

    protected $model = Customer::class;
    protected $collectionResource = CustomerCollection::class;

    public function searchableBy() : array
    {
        return ['customer_id', 'customer_name', 'customer_email'];
    }
    public function filterableBy() : array
    {
        return ['customer_type','customer_activity','customer_status'];
    }
    public function sortableBy() : array
    {
         return ['created_at'];
    }

    protected function calculateNextCustomerId()
    {
        $data = [];

        // Find the last customer_id
        $lastCustomer = Customer::orderBy('customer_id', 'desc')->first();

        if ($lastCustomer) {
            $lastCustomerId = $lastCustomer->customer_id;

            // Extract the numeric part of the customer_id (e.g., CL2300001 -> 1)
            preg_match('/\d+/', $lastCustomerId, $matches);
            $lastNumericId = $matches[0];

            // Increment the numeric part by 1
            $nextNumericId = $lastNumericId + 1;

            // Create the next customer_id with the same prefix
            $nextCustomerId = preg_replace('/\d+/', str_pad($nextNumericId, strlen($lastNumericId), '0', STR_PAD_LEFT), $lastCustomerId);

            // Include the next customer_id in the response
            $data['next_customer_id'] = $nextCustomerId;
        } else {
            // Set an initial customer_id if no records exist
            $data['next_customer_id'] = 'CL2300001';
        }

        return $data;
    }
    protected function beforeSave(Request $request, $customer)
{
    // Check if the customer doesn't already have a customer_id set
    if (empty($customer->customer_id)) {
        // Use the method to calculate the next customer ID
        $nextCustomerData = $this->calculateNextCustomerId();

        // Extract the next customer ID
        $nextCustomerId = $nextCustomerData['next_customer_id'];

        // Assign the nextCustomerId to the customer's customer_id
        $customer->customer_id = $nextCustomerId;
    }
}
}
