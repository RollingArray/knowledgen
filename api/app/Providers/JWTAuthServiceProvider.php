<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Services\JWTAuthService;
use App\Http\Interfaces\JWTAuthServiceInterface;

class JWTAuthServiceProvider extends ServiceProvider
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
            JWTAuthServiceInterface::class,
            JWTAuthService::class
        );
    }
}
