<?php

namespace App\Models;

use App\Models\CourseMaterialChildMenuModel as ModelsCourseMaterialChildMenuModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialSubChildMenuModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_sub_child_menu';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_material_id',
        'child_article_id',
        'sub_child_article_id',
        'sub_child_article_order'
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

    public function childMenu()
    {
        return $this->belongsTo(ModelsCourseMaterialChildMenuModel::class);
    }
}
