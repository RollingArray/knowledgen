<?php

namespace App\Providers;

use App\Http\Interfaces\CourseMaterialFlashCardServiceInterface;
use App\Http\Services\CourseMaterialFlashCardService;
use Illuminate\Support\ServiceProvider;

class CourseMaterialFlashCardProvider extends ServiceProvider
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
            CourseMaterialFlashCardServiceInterface::class,
            CourseMaterialFlashCardService::class
        );
    }
}
