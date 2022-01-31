<?php

namespace App\Providers;

use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use App\Http\Services\CourseMaterialArticleService;
use Illuminate\Support\ServiceProvider;

class CourseMaterialArticleProvider extends ServiceProvider
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
            CourseMaterialArticleServiceInterface::class,
            CourseMaterialArticleService::class
        );
    }
}
