<?php

namespace App\Jobs;
use App\Mail\NewUserRegister;
use Illuminate\Support\Facades\Mail;

   
class SendEmailJob extends Job
{
    //use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
   
    /**
     * $details
     *
     * @var mixed
     */
    protected $details;
   
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }
   
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = new NewUserRegister($this->details);
        Mail::to($this->details['email'])->send($email);
    }
}