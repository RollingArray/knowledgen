<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Http\Services\CourseMaterialService;

class CourseMaterialProvider extends ServiceProvider
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
            CourseMaterialServiceInterface::class,
            CourseMaterialService::class
        );
    }
}
