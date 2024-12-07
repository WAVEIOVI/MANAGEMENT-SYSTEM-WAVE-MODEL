<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Models\Customer;

class CustomerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    public function with($request)
    {
        $data = [
            'count' => [
                'active_customers' => Customer::where('customer_status', 'active')->count(),
                'inactive_customers' => Customer::where('customer_status', 'inactive')->count(),
                'pending_customers' => Customer::where('customer_status', 'pending')->count(),
                'all_customers' => Customer::count(),
            ],
        ];

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
}
