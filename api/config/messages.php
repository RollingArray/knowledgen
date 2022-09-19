<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Api Validation Messages
    |--------------------------------------------------------------------------
    |
    */

    'apiValidation' => [
        'verificationCoreWrong' => 'Verification code or email is invalid. Regenerate the verification code if lost it.',
        'headerMissing' => 'Authentication token or User header required',
        'courseDetailsMissing' => 'Course details missing',
        'noUserMissing' => 'User with email id does not exist',
        'peerExist' => 'Peer has been already added',
        'invalidToken' => 'Ahh!! Looks like you do not have a valid token, please re login',
        'activationCode' => 'We have send you the activation code in your registered email, please check',
        'activateAccount' => 'We have send you the activation code in your registered email, please use the code to activate your account',
        'restrictedAccessCourse' => 'Restricted access !! you are not the owner of this course material',
        'restrictedAccessTeacher' => 'Restricted access !! you must be a teacher to access this',
        'restrictedAccessStudent' => 'Restricted access !! you must be a student to access this',
    ],
];