<?php

namespace App\Providers;

use App\Http\Interfaces\CourseMaterialArticleRevisionServiceInterface;
use Illuminate\Support\ServiceProvider;
use App\Http\Services\CourseMaterialArticleRevisionService;

class CourseMaterialArticleRevisionServiceProvider extends ServiceProvider
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
            CourseMaterialArticleRevisionServiceInterface::class,
            CourseMaterialArticleRevisionService::class
        );
    }
}
