<?php

namespace App\Http\Interfaces;

Interface UserPeerServiceInterface
{
    public function getUserPeerPoints($userId);

    public function deletePeer($userId, $peerId);

    public function checkIfPeerExistForUser($userId, $peerId);
}