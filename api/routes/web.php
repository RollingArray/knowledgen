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

/**
 * Get uploaded file
 *
 * @param  string $id
 * @param  string $extension
 * @return void
 */
$router->get('file/{id}/{extension}', function ($id, $extension) {
    $file = 'upload/'.$id.'.'.$extension;
    readfile($file);
    return response()->download($file);
});

/**
 * V1 urls
 *
 * @return void
 */
$router->group(['prefix' => 'v1'], function () use ($router) {

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

    $router->group([
        'prefix' => 'user',
        'middleware' => 'auth',
        
    ], function () use ($router) {
        
        $router->post(
            'details',
            [
                'uses' => 'UserDetailController@boot'
            ]
        );

        $router->post(
            'edit',
            [
                'uses' => 'UserDetailController@edit'
            ]
        );
    });

    $router->group([
        'prefix' => 'dashboard',
        'middleware' => 'auth',
    ], function () use ($router) {
        $router->get(
            'student',
            [
                'middleware' => 'roleStudent',
                'uses' => 'DashboardController@studentAll'
            ]
        );
        $router->get(
            'teacher',
            [
                'middleware' => 'roleTeacher',
                'uses' => 'DashboardController@teacherAll'
            ]
        );
    });

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
        $router->get(
            'recommended/all',
            [
                'uses' => 'CourseMaterialRecommendationController@all'
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
            'prefix' => 'learning/path',
        ], function () use ($router) {
            $router->get(
                'all',
                [
                    'uses' => 'CourseMaterialLearningPathController@all'
                ]
            );
            $router->post(
                'add',
                [
                    'uses' => 'CourseMaterialLearningPathController@add'
                ]
            );
            $router->post(
                'delete',
                [
                    'uses' => 'CourseMaterialLearningPathController@delete'
                ]
            );
        });

        $router->group([
            'prefix' => 'article',
            //'middleware' => 'auth'
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

            $router->post(
                'upload/file',
                [
                    'middleware' => 'courseMaterialOwner',
                    'uses' => 'CourseMaterialArticleController@fileUpload'
                ]
            );

            $router->group([
                'prefix' => 'textdocument',
            ], function () use ($router) {
                $router->post(
                    'all',
                    [
                        'uses' => 'ArticleTextDocumentController@all'
                    ]
                );
                $router->post(
                    'add',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'ArticleTextDocumentController@add'
                    ]
                );
                $router->post(
                    'edit',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'ArticleTextDocumentController@edit'
                    ]
                );
            });

            $router->group([
                'prefix' => 'quiz',
            ], function () use ($router) {
                $router->post(
                    'all',
                    [
                        'uses' => 'CourseMaterialQuizController@all'
                    ]
                );
                $router->post(
                    'add',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'CourseMaterialQuizController@add'
                    ]
                );
                $router->post(
                    'edit',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'CourseMaterialQuizController@edit'
                    ]
                );
                $router->post(
                    'delete',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'CourseMaterialQuizController@delete'
                    ]
                );
            });

            $router->group([
                'prefix' => 'flash/card',
            ], function () use ($router) {
                $router->post(
                    'all',
                    [
                        'uses' => 'CourseMaterialFlashCardController@all'
                    ]
                );
                $router->post(
                    'add',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'CourseMaterialFlashCardController@add'
                    ]
                );
                $router->post(
                    'edit',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'CourseMaterialFlashCardController@edit'
                    ]
                );
                $router->post(
                    'delete',
                    [
                        'middleware' => 'courseMaterialOwner',
                        'uses' => 'CourseMaterialFlashCardController@delete'
                    ]
                );
            });

            $router->group([
                'prefix' => 'assignment',
            ], function () use ($router) {
                $router->post(
                    'result',
                    [
                        'uses' => 'CourseMaterialArticleAssignmentController@result'
                    ]
                );
            });
            $router->group([
                'prefix' => 'session/time',
            ], function () use ($router) {
                $router->post(
                    'add',
                    [
                        'uses' => 'CourseMaterialArticleSessionController@add'
                    ]
                );
                $router->post(
                    'all',
                    [
                        'uses' => 'CourseMaterialArticleSessionController@all'
                    ]
                );
            });
        });

        $router->group([
            'prefix' => 'menu',
            
        ], function () use ($router) {
            
            $router->post(
                'all',
                [
                    'uses' => 'CourseMaterialMenuController@all'
                ]
            );

            $router->post(
                'add',
                [
                    'middleware' => 'courseMaterialOwner',
                    'uses' => 'CourseMaterialMenuController@add'
                ]
            );

            $router->post(
                'edit',
                [
                    'middleware' => 'courseMaterialOwner',
                    'uses' => 'CourseMaterialMenuController@edit'
                ]
            );

            $router->post(
                'delete',
                [
                    'middleware' => 'courseMaterialOwner',
                    'uses' => 'CourseMaterialMenuController@delete'
                ]
            );

            $router->group([
                'prefix' => 'child',
                'middleware' => 'courseMaterialOwner',
            ], function () use ($router) {
                $router->post(
                    'add',
                    [
                        'uses' => 'CourseMaterialChildMenuController@add'
                    ]
                );

                $router->post(
                    'edit',
                    [
                        'uses' => 'CourseMaterialChildMenuController@edit'
                    ]
                );

                $router->post(
                    'delete',
                    [
                        'uses' => 'CourseMaterialChildMenuController@delete'
                    ]
                );

                $router->group([
                    'prefix' => 'sub',
                ], function () use ($router) {
                    $router->post(
                        'add',
                        [
                            'uses' => 'CourseMaterialSubChildMenuController@add'
                        ]
                    );
    
                    $router->post(
                        'edit',
                        [
                            'uses' => 'CourseMaterialSubChildMenuController@edit'
                        ]
                    );
    
                    $router->post(
                        'delete',
                        [
                            'uses' => 'CourseMaterialSubChildMenuController@delete'
                        ]
                    );
                });
            });
        });
    });

    $router->post(
        'match',
        [
            'uses' => 'MatchSkillController@all'
        ]
    );

    $router->group([
        'prefix' => 'teacher/availability/planner',
        'middleware' => 'auth'
    ], function () use ($router) {
        $router->post(
            'all',
            [
                'middleware' => 'roleTeacher',
                'uses' => 'TeacherAvailabilityPlannerController@all'
            ]
        );
        $router->post(
            'add',
            [
                'middleware' => 'roleTeacher',
                'uses' => 'TeacherAvailabilityPlannerController@add'
            ]
        );
    });

    $router->group([
        'prefix' => 'student/availability/planner',
        'middleware' => 'auth'
    ], function () use ($router) {
        $router->post(
            'all',
            [
                'middleware' => 'roleStudent',
                'uses' => 'StudentAvailabilityPlannerController@all'
            ]
        );

        $router->post(
            'add',
            [
                'middleware' => 'roleStudent',
                'uses' => 'StudentAvailabilityPlannerController@add'
            ]
        );
    });
});
