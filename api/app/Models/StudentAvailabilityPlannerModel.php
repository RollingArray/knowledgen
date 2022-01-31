<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentAvailabilityPlannerModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_student_availability_planner';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'planner_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'planner_id',
        'user_id',
        'availability_date',
        'availability_from',
        'availability_to',
        'availability_context',
    ];

    /**
     * courseMaterielArticles
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
