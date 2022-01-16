<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\UsersServiceInterface;
use App\Jobs\SendEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SignUpController extends Controller
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
            'user_first_name' => 'required',
            'user_last_name' => 'required',
            'user_email' => 'required|unique:tbl_users',
            'user_type' => 'required|in:STUDENT,TEACHER'
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

        //creating a new user
        $user = new User();

        //adding values to the users
        $user->user_id = uniqid();
        $user->user_first_name = $request->input('user_first_name');
        $user->user_last_name = $request->input('user_last_name');
        $user->user_email = $request->input('user_email');
        $user->user_type = $request->input('user_type');
        $user->user_verification_code = $this->usersServiceInterface->generateUserVerificationCode();

        //saving the user to database
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
                    config('messages.apiValidation.activateAccount')
                )
            )
        );
    }
}
