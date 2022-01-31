<?php

namespace App\Http\Services;

use App\Http\Interfaces\UsersServiceInterface;
use App\Models\User;

class UsersService implements UsersServiceInterface
{    
    /**
     * Get user by email
     *
     * @param  mixed $userEmail
     * @return void
     */
    public function getUserByEmail($userEmail)
    {
        return User::where('user_email', $userEmail)
               ->first();
    }
    
    /**
     * Get user by email and code
     *
     * @param  mixed $userEmail
     * @param  mixed $userVerificationCode
     * @return void
     */
    public function getUserByEmailAndCode($userEmail, $userVerificationCode)
    {
        return User::where('user_email', $userEmail)
                ->where('user_verification_code', $userVerificationCode)
                ->first();
    }
    
    /**
     * Get user by id
     *
     * @param  mixed $userId
     * @return void
     */
    public function getUserById($userId)
    {
        return User::where('user_id', $userId)
               ->first();
    }

    /**
     * Get user by id
     *
     * @param  mixed $userId
     * @return void
     */
    public function getUserTypeId($userId)
    {
        return User::select('user_type')
            ->where('user_id', $userId)
            ->first();
    }

    public function getUser($userId)
    {
        return User::where('user_id', $userId)
            ->first();
    }

    public function checkIfUserIsTeacher($userId)
    {
        return User::where('user_id', '=', $userId)
                ->where('user_type', '=', 'TEACHER')
                ->exists();
    }

    public function checkIfUserIsStudent($userId)
    {
        return User::where('user_id', '=', $userId)
                ->where('user_type', '=', 'STUDENT')
                ->exists();
    }
    
    /**
     * Generate user verification code
     *
     * @return void
     */
    public function generateUserVerificationCode()
    {
        return 'A2Za2z09';
        //return bin2hex(openssl_random_pseudo_bytes(4));
    }
}