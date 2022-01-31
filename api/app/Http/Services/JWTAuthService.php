<?php

namespace App\Http\Services;

use App\Http\Interfaces\JWTAuthServiceInterface;

class JWTAuthService implements JWTAuthServiceInterface
{
	/**
	 * jwt header
	 *
	 * @return void
	 */
	private function jwtHeader()
	{
		$header = [
			'typ' => 'jwt',
			'alg' => 'HS256'
		];

		$header = json_encode($header);
		$header = base64_encode($header);

		return $header;
	}

	/**
	 * jwt payload
	 *
	 * @param  mixed $userId
	 * @return void
	 */
	private function jwtPayload($userId)
	{
		$tokenId    = base64_encode(bin2hex(random_bytes(10)));
		$serverId = env('JWT_SERVER_ID');
		$clientId = env('JWT_CLIENT_ID');
		$issuedAt   = time();
		
		$data = [
			'iat'       => $issuedAt,
			'jti'       => $tokenId,
			'iss'       => $serverId,
			'userId'    => $userId,
			'clientId'  => $clientId
		];


		$payload = json_encode($data);
		$payload = base64_encode($payload);

		return $payload;
	}

	/**
	 * jwt signature
	 *
	 * @param  mixed $header
	 * @param  mixed $payload
	 * @return void
	 */
	private function jwtSignature($header, $payload)
	{
		$key = env('HASH_KEY_SALT');
		$algo = env('HASH_KEY_ALGO');


		$headerAndPayload = $header . '.' . $payload;
		$signature = hash_hmac($algo, $headerAndPayload, $key, true);
		$signature = base64_encode($signature);

		return $signature;
	}

		
	/**
	 * Create new token
	 *
	 * @param  mixed $userId
	 * @return void
	 */
	public function createNewToken($userId)
	{
		$header = $this->jwtHeader();
		$payload = $this->jwtPayload($userId);
		$signature = $this->jwtSignature($header, $payload);

		$token = $header . '.' . $payload . '.' . $signature;

		$passedData = array(
			"user_id" => $userId,
			"token" => $token
		);

		//$this->insertSession($DBAccessLib, $passedData);

		return $token;
	}

	//insertSession
	public function insertSession($passedData)
	{

		// $ifUseHasAnySessionAny = $DBAccessLib->ifUseHasAnySessionAny($passedData);

		// if($ifUseHasAnySessionAny)
		// {
		//     $isDeleteSessionFromDB = $DBAccessLib->deleteSession($passedData);
		// }

		// $newSessionForUserInserted = $DBAccessLib->insertNewSession($passedData);

		// return $newSessionForUserInserted;
	}

		
	/**
	 * Decode token
	 *
	 * @param  mixed $token
	 * @return void
	 */
	public function decodeToken($token)
	{
		$revisedToken = null;
		$responseData = array();
		$key = env('HASH_KEY_SALT');
		$algo = env('HASH_KEY_ALGO');

		$jwtValues = explode('.', $token);

		$receivedHeader = $jwtValues[0];
		$receivedPayload = $jwtValues[1];
		$receivedSignature = $jwtValues[2];

		$receivedHeaderAndPayload = $receivedHeader . '.' . $receivedPayload;
		$resultedSignature = base64_encode(hash_hmac($algo, $receivedHeaderAndPayload, $key, true));

		if ($resultedSignature == $receivedSignature) {

			$receivedPayLoad = json_decode(base64_decode($receivedPayload), true);
			$responseData['success'] = true;
			$responseData['receivedPayLoad'] = $receivedPayLoad;
		} else {
			$responseData['success'] = false;
		}

		//echo json_encode($responseData);
		return $responseData;
	}

		
	/**
	 * Check session user
	 *
	 * @param  mixed $token
	 * @param  mixed $userId
	 * @return void
	 */
	public function checkSessionUser($token, $userId)
	{
		$decodedToken = $this->decodeToken($token);
		//echo json_decode($decodedToken, true);

		if ($decodedToken['success']) {
			if ($decodedToken['receivedPayLoad']['userId'] == $userId) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

		
	/**
	 * Check if session user token expired
	 *
	 * @param  mixed $token
	 * @param  mixed $userId
	 * @return void
	 */
	public function checkIfSessionUserTokenExpired($token, $userId)
	{
		$decodedToken = $this->decodeToken($token);

		//echo json_decode($decodedToken, true);

		if ($decodedToken['success']) {
			if ($decodedToken['receivedPayLoad']['userId'] == $userId) {
				//if token expired
				$now  = time(); //86400 = 1 day
				$expectedExpire = $decodedToken['receivedPayLoad']['iat'] + env('JWT_EXPIRE_IN_SECONDS');

				if ((int)$now < (int)$expectedExpire) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	/**
	 * Send back to client
	 *
	 * @param  mixed $token
	 * @param  mixed $userId
	 * @param  mixed $keyName
	 * @param  mixed $data
	 * @param  mixed $crudReturn
	 * @return void
	 */
	public function sendBackToClient($token, $userId, $keyName, $data, $crudReturn = NULL)
	{

		$ifValidToken = $this->checkIfSessionUserTokenExpired($token, $userId);
		$revisedToken = null;
		$responseData = array();

		if ($ifValidToken) {

			$revisedToken =  $token;
			$responseData['error'] = false;
			$responseData['success'] = true;
			$responseData['tokenUpdated'] = false;
			$responseData[$keyName] = $data;
			$responseData['crudReturn'] = $crudReturn;
			$responseData['token']  = $revisedToken;
		} else {
			$newToken = $this->createNewToken($userId);
			$responseData['error'] = false;
			$responseData['success'] = true;
			$responseData['tokenUpdated'] = true;
			$responseData[$keyName] = $data;
			$responseData['crudReturn'] = $crudReturn;
			$responseData['token']  = $newToken;
		}
		return $responseData;
	}
}
