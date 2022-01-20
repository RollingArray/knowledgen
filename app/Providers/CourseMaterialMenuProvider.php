<?php

namespace App\Providers;

use App\Http\Interfaces\CourseMaterialMenuServiceInterface;
use App\Http\Services\CourseMaterialMenuService;
use Illuminate\Support\ServiceProvider;

class CourseMaterialMenuProvider extends ServiceProvider
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
            CourseMaterialMenuServiceInterface::class,
            CourseMaterialMenuService::class
        );
    }
}
