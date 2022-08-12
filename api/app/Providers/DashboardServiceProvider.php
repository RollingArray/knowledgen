<?php

namespace App\Providers;

use App\Http\Interfaces\DashboardServiceInterface;
use App\Http\Services\DashboardService;
use Illuminate\Support\ServiceProvider;

class DashboardServiceProvider extends ServiceProvider
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
            DashboardServiceInterface::class,
            DashboardService::class
        );
    }
}
