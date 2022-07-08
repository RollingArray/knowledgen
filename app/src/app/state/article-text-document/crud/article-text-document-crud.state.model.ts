/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article Text Document crud state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:51:28 
 * Last modified  : 2022-07-08 12:33:53
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ArticleTextDocumentModel } from "src/app/shared/model/article-text-document.model";

/**
 * Article text document crud state model
 */
export interface ArticleTextDocumentCrudStateModel {
	operationStatus: OperationsEnum;
	operationArticleTextDocument: ArticleTextDocumentModel;
}

/**
 * @description Article text document crud initial state
 */
export const ARTICLE_TEXT_DOCUMENT_CRUD_INITIAL_STATE: ArticleTextDocumentCrudStateModel = {
	operationStatus: OperationsEnum.NONE,
	operationArticleTextDocument: {}
};