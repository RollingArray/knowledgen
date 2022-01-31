<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialParentMenuModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_parent_menu';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_material_id',
        'parent_article_id',
        'parent_article_order'
    ];

    /**
     * Course materiel menu
     *
     * @return void
     */
    public function courseMaterial()
    {
        return $this->belongsTo(CourseMaterialModel::class);
    }

    /**
     * courseMaterielArticles
     *
     * @return void
     */
    public function childMenus()
    {
        return $this->hasMany(CourseMaterialChildMenuModel::class);
    }
}
