<?php

namespace App\Http\Interfaces;

Interface JWTAuthServiceInterface
{
    public function createNewToken($userId);

    public function insertSession($data);

    public function decodeToken($token);

    public function checkSessionUser($token, $userId);

    public function checkIfSessionUserTokenExpired($token, $userId);

    public function sendBackToClient($token, $userId, $keyName, $data, $crudReturn = NULL);
}