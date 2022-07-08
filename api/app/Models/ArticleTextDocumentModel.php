<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class ArticleTextDocumentModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_article_text_document';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'article_text_document_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_text_document_id',
        'article_id',
        'article_text_document_content',
    ];

    /**
     * Relation - Belongs to Course Materiel Articles
     *
     * @return void
     */
    public function materialArticle()
    {
        return $this->belongsTo(CourseMaterialArticleModel::class);
    }
}
