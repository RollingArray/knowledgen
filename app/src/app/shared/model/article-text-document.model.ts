/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article text document model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-06 20:11:49 
 * Last modified  : 2022-07-06 20:48:38
 */

import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "./base.model";

export interface ArticleTextDocumentModel extends BaseModel
{
    articleId?: string;
    courseMaterialId?: string;
    articleTextDocumentContent?: string;
    operationType?: OperationsEnum;
}
