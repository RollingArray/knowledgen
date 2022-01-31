<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class User extends BaseModel implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_users';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'user_id';

    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'user_first_name', 'user_last_name', 'user_type', 'user_email' , 'user_skills'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'user_verification_code',
    ];

        
    /**
     * User course materiels
     *
     * @return void
     */
    public function userCourseMateriels()
    {
        return $this->hasMany(CourseMaterialModel::class);
    }
}
