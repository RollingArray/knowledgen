<?php

namespace App\Providers;

use App\Http\Interfaces\CoreSubjectAreaTagAnalysisServiceInterface;
use Illuminate\Support\ServiceProvider;
use App\Http\Services\CoreSubjectAreaTagAnalysisService;

class CoreSubjectAreaTagAnalysisServiceProvider extends ServiceProvider
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
            CoreSubjectAreaTagAnalysisServiceInterface::class,
            CoreSubjectAreaTagAnalysisService::class
        );
    }
}
