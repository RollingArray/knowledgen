<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\UsersServiceInterface;
use App\Jobs\SendEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActivationCodeController extends Controller
{
    
    /**
     * jwtAuthServiceInterface
     *
     * @var mixed
     */
    protected $usersServiceInterface;
    
    /**
     * __construct
     *
     */
    public function __construct(UsersServiceInterface $usersServiceInterface)
    {
        $this->usersServiceInterface = $usersServiceInterface;
    }
    
    /**
     * rules
     *
     * @return void
     */
    public function rules()
    {
        return [
            'user_email' => 'required|exists:App\Models\User,user_email'
        ];
    }
    
    /**
     * custom messages
     *
     * @return void
     */
    public function customMessages()
    {
        return [
           //
        ];
    }

    /**
     * sign up
     *
     * @param  mixed $request
     * @return void
     */
    public function boot(Request $request)
    {
        //creating a validator
        $validator = Validator::make($request->all(), $this->rules(), $this->customMessages());

        //if validation fails 
        if ($validator->fails()) {
            return response(
                array(
                    'error' => true,
                    'message' => $validator->errors()->all()
                ),
                400
            );
        }

        // get the user
        
        $user = $this->usersServiceInterface->getUserByEmail($request->input('user_email'));
        
        // update the verification code
        $user->user_verification_code = $this->usersServiceInterface->generateUserVerificationCode();
        
        // save
        $user->save();
        
        //unsetting the password so that it will not be returned 
        unset($user->verification_code);

        // send user verification code email
        try {
            dispatch(new SendEmailJob($user));
        } catch (\Exception $th) {
            //throw $th;
            echo $th;
        }

        //returning the registered user 
        return response(
            array(
                'error' => false,
                'success' => true,
                "message" => array(
                    config('messages.apiValidation.activationCode')
                )
            )
        );
    }
}
