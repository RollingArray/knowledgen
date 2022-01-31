<?php

namespace App\Models;

use CreateCourseMaterialSubChildMenu;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialChildMenuModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_child_menu';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_material_id',
        'parent_article_id',
        'child_article_id',
        'child_article_order'
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

    public function parentMenu()
    {
        return $this->belongsTo(CourseMaterialParentMenuModel::class);
    }

    /**
     * courseMaterielArticles
     *
     * @return void
     */
    public function subChildMenus()
    {
        return $this->hasMany(CreateCourseMaterialSubChildMenu::class);
    }
}
