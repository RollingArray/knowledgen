<?php

namespace App\Providers;

use App\Http\Interfaces\UserPeerServiceInterface;
use Illuminate\Support\ServiceProvider;
use App\Http\Services\UserPeerService;

class UserPeerServiceProvider extends ServiceProvider
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
            UserPeerServiceInterface::class,
            UserPeerService::class
        );
    }
}
