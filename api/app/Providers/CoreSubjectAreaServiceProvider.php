<?php

namespace App\Providers;

use App\Http\Interfaces\CoreSubjectAreaServiceInterface;
use Illuminate\Support\ServiceProvider;
use App\Http\Services\CoreSubjectAreaService;

class CoreSubjectAreaServiceProvider extends ServiceProvider
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
            CoreSubjectAreaServiceInterface::class,
            CoreSubjectAreaService::class
        );
    }
}
