<?php

namespace App\Providers;

use App\Http\Interfaces\CourseMaterialQuizServiceInterface;
use App\Http\Services\CourseMaterialQuizService;
use Illuminate\Support\ServiceProvider;

class CourseMaterialQuizProvider extends ServiceProvider
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
            CourseMaterialQuizServiceInterface::class,
            CourseMaterialQuizService::class
        );
    }
}
