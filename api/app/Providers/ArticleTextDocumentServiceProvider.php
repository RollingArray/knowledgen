<?php

namespace App\Providers;

use App\Http\Interfaces\ArticleTextDocumentServiceInterface;
use App\Http\Services\ArticleTextDocumentService;
use Illuminate\Support\ServiceProvider;

class ArticleTextDocumentServiceProvider extends ServiceProvider
{
        
    /**
     * boot
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            ArticleTextDocumentServiceInterface::class,
            ArticleTextDocumentService::class
        );
    }
}
