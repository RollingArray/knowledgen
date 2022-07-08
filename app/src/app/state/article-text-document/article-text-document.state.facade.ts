/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article text document state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 12:59:43 
 * Last modified  : 2022-07-06 20:48:08
 */

import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { Store } from '@ngrx/store';
import { ARTICLE_TEXT_DOCUMENT_ACTIONS } from "./article-text-document.state.actions";
import { ArticleTextDocumentStateModel } from "./view/article-text-document.state.model";
import { ARTICLE_TEXT_DOCUMENT_QUERY_SELECTOR } from "./view/article-text-document.state.selectors";
import { ArticleTextDocumentCrudStateModel } from "./crud/article-text-document-crud.state.model";
import { ARTICLE_TEXT_DOCUMENT_CRUD_QUERY_SELECTOR } from "./crud/article-text-document-crud.state.selectors";
import { Injectable } from "@angular/core";
import { ArticleTextDocumentModel } from "src/app/shared/model/article-text-document.model";

/**
 * @description Injectable
 */
@Injectable()

export class ArticleTextDocumentStateFacade {

	/**
	 * Creates an instance of article text document state facade.
	 * @param articleTextDocumentStore 
	 * @param articleTextDocumentCrudStore 
	 */
	constructor(
		private articleTextDocumentStore: Store<ArticleTextDocumentStateModel>,
		private articleTextDocumentCrudStore: Store<ArticleTextDocumentCrudStateModel>
	) { }

	/**
	 * Article text document by article id$ of article text document state facade
	 */
	public articleTextDocumentByArticleId$ = (articleId: string) =>  this.articleTextDocumentStore.select(ARTICLE_TEXT_DOCUMENT_QUERY_SELECTOR.selectArticleTextDocumentByArticleId(articleId));

	/**
	 * Article text document curd operation status$ of article text document state facade
	 */
	public articleTextDocumentCurdOperationStatus$ = this.articleTextDocumentCrudStore.select(ARTICLE_TEXT_DOCUMENT_CRUD_QUERY_SELECTOR.selectOperationStatus);

	/**
	 * Operation article text document$ of article text document state facade
	 */
	public operationArticleTextDocument$ = this.articleTextDocumentCrudStore.select(ARTICLE_TEXT_DOCUMENT_CRUD_QUERY_SELECTOR.selectOperationArticleTextDocument);

	/**
	 * Requests article text document
	 * @param articleTextDocument 
	 */
	public requestArticleTextDocument(articleTextDocument: ArticleTextDocumentModel)
	{
		this.articleTextDocumentStore.dispatch(ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_ARTICLE_TEXT_DOCUMENT({payload: articleTextDocument}));
	 }

	/**
	 * Adds new article text document
	 * @param articleTextDocument 
	 */
	public addNewArticleTextDocument(articleTextDocument: ArticleTextDocumentModel) {
		this.articleTextDocumentStore.dispatch(ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_ADD_NEW_ARTICLE_TEXT_DOCUMENT({payload: articleTextDocument}));
	}

	/**
	 * Edits article text document
	 * @param articleTextDocument 
	 */
	public editArticleTextDocument(articleTextDocument: ArticleTextDocumentModel) {
		this.articleTextDocumentStore.dispatch(ARTICLE_TEXT_DOCUMENT_ACTIONS.API_REQUEST_EDIT_ARTICLE_TEXT_DOCUMENT({payload: articleTextDocument}));
	}

	/**
	 * Acts upon article text document
	 * @param articleTextDocument 
	 * @param operation 
	 */
	public actUponArticleTextDocument(articleTextDocument: ArticleTextDocumentModel, operation: OperationsEnum) {
		this.articleTextDocumentStore.dispatch(ARTICLE_TEXT_DOCUMENT_ACTIONS.ACT_UPON_ARTICLE_TEXT_DOCUMENT({payload: articleTextDocument, operation: operation}));
	}	
}
