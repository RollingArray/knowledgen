<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserPeerModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_user_peer';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'user_peer_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_peer_id',
        'user_id',
        'peer_id',
    ];

    /**
     * Relation - Belongs to user
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation - Belongs to user
     *
     * @return void
     */
    public function peer()
    {
        return $this->belongsTo(User::class);
    }
}
