<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class ArticleComponentModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_article_component';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'article_component_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_component_id', 
        'article_id',
        'article_component_order',
        'article_component_type',
        'article_component_content'
    ];

    /**
     * courseMaterielArticles
     *
     * @return void
     */
    public function materialArticle()
    {
        return $this->belongsTo(CourseMaterialArticleModel::class);
    }
}
