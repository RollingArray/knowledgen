<?php

namespace App\Providers;

use App\Http\Interfaces\CoreSubjectAreaTagServiceInterface;
use Illuminate\Support\ServiceProvider;
use App\Http\Services\CoreSubjectAreaTagService;

class CoreSubjectAreaTagServiceProvider extends ServiceProvider
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
            CoreSubjectAreaTagServiceInterface::class,
            CoreSubjectAreaTagService::class
        );
    }
}
