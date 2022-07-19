/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article text document model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-06 20:11:49 
 * Last modified  : 2022-07-19 15:47:06
 */

import { OperationsEnum } from "../enum/operations.enum";
import { ArticleModel } from "./article.model";
import { BaseModel } from "./base.model";

export interface ArticleTextDocumentModel extends ArticleModel, BaseModel
{
    articleId?: string;
    courseMaterialId?: string;
    articleTextDocumentContent?: string;
    operationType?: OperationsEnum;
}
