<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Interfaces\ArticleComponentServiceInterface;
use App\Http\Services\ArticleComponentService;

class ArticleComponentServiceProvider extends ServiceProvider
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
            ArticleComponentServiceInterface::class,
            ArticleComponentService::class
        );
    }
}
