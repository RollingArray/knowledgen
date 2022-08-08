<?php

namespace App\Providers;

use App\Http\Interfaces\LearningPathServiceInterface;
use App\Http\Services\LearningPathService;
use Illuminate\Support\ServiceProvider;

class LearningPathProvider extends ServiceProvider
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
            LearningPathServiceInterface::class,
            LearningPathService::class
        );
    }
}
