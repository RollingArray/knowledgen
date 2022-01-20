<?php

namespace App\Providers;

use App\Http\Interfaces\AvailabilityPlannerServiceInterface;
use App\Http\Services\AvailabilityPlannerService;
use Illuminate\Support\ServiceProvider;

class AvailabilityPlannerProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            AvailabilityPlannerServiceInterface::class,
            AvailabilityPlannerService::class
        );
    }
}
