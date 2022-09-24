/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 15:57:59 
 * Last modified  : 2022-08-03 16:19:56
 */

import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "./base.model";

export interface ArticleSessionModel extends BaseModel
{
    articleId?: string;
    articleSessionTime?: string;
    articleSessions?: string[];
    articleAllowedIteration?: number;
    articleSessionsCreatedOn?: string[];
    operationType?: OperationsEnum;
}
