<?php

namespace App\Http\Interfaces;

Interface UsersServiceInterface
{
    public function getUserByEmail($userEmail);

    public function getUserById($userId);

    public function generateUserVerificationCode();

    public function getUserByEmailAndCode($userEmail, $userVerificationCode);

    public function getUserTypeId($userId);

    public function checkIfUserIsTeacher($userId);

    public function checkIfUserIsStudent($userId);
}