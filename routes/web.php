<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// $router->group(['prefix' => 'api/v1'], function () use ($router) {
//     $router->post(
//         'register', 
//         [
//             'uses' => 'UserController@register'
//         ]
//     );
// });

$router->group(['prefix' => 'api/v1'], function () use ($router) {

    $router->post(
        'user/sign/up',
        [
            'uses' => 'SignUpController@boot'
        ]
    );

    $router->post(
        'user/activate/code/resend',
        [
            'uses' => 'ActivationCodeController@boot'
        ]
    );

    $router->post(
        'user/sign/in',
        [
            'uses' => 'SignInController@boot'
        ]
    );

    $router->post(
        'user/details',
        [
            'middleware' => 'auth',
            'uses' => 'UserDetailController@boot'
        ]
    );

    $router->group([
        'prefix' => 'course/material',
        'middleware' => 'auth'
    ], function () use ($router) {
        $router->get(
            'all',
            [
                'uses' => 'CourseMaterialController@getAllCourseMaterials'
            ]
        );
        $router->post(
            'add',
            [
                'uses' => 'CourseMaterialController@addNewCourseMaterials'
            ]
        );
        $router->post(
            'edit',
            [
                'middleware' => 'courseMaterialOwner',
                'uses' => 'CourseMaterialController@editCourseMaterials'
            ]
        );
        $router->post(
            'delete',
            [
                'middleware' => 'courseMaterialOwner',
                'uses' => 'CourseMaterialController@deleteCourseMaterials'
            ]
        );

        $router->group([
            'prefix' => 'article',
            'middleware' => 'auth'
        ], function () use ($router) {
            $router->get(
                'all',
                [
                    'uses' => 'CourseMaterialArticleController@all'
                ]
            );
            $router->post(
                'add',
                [
                    'middleware' => 'courseMaterialOwner',
                    'uses' => 'CourseMaterialArticleController@add'
                ]
            );
            $router->post(
                'edit',
                [
                    'middleware' => 'courseMaterialOwner',
                    'uses' => 'CourseMaterialArticleController@edit'
                ]
            );
            $router->post(
                'delete',
                [
                    'middleware' => 'courseMaterialOwner',
                    'uses' => 'CourseMaterialArticleController@delete'
                ]
            );
        });
    });
});
