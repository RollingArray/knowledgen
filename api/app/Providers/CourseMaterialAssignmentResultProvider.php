<?php

namespace App\Providers;

use App\Http\Interfaces\CourseMaterialAssignmentResultServiceInterface;
use App\Http\Services\CourseMaterialAssignmentResultService;
use Illuminate\Support\ServiceProvider;

class CourseMaterialAssignmentResultProvider extends ServiceProvider
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
            CourseMaterialAssignmentResultServiceInterface::class,
            CourseMaterialAssignmentResultService::class
        );
    }
}
