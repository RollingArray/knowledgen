/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article element service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-16 20:55:01 
 * Last modified  : 2022-09-20 15:58:10
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { ArticleTextDocumentModel } from "../model/article-text-document.model";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class ArticleTextDocumentService extends BaseService<ArticleTextDocumentModel> {
	/**
	 * Creates an instance of user peer service.
	 * @param httpClient 
	 * @param alertController 
	 * @param toastController 
	 * @param rootStateFacade 
	 */
	 constructor(
		httpClient: HttpClient,
		alertController: AlertController,
		toastController: ToastController,
		rootStateFacade: RootStateFacade
	)
	{
		super(
			httpClient,
			alertController,
			toastController,
			rootStateFacade
		);
	}
	/**
	 * Gets article text document
	 * @param articleTextDocumentModel 
	 * @returns article text document 
	 */
	getArticleTextDocument(articleTextDocumentModel: ArticleTextDocumentModel): Observable<BaseModel>
	 {
		 return this.post(ApiUrls.KNOWLEDGE_BASE_ARTICLE_TEXT_DOCUMENT, articleTextDocumentModel);
	 }
 
	/**
	 * Cruds article text document
	 * @param articleTextDocumentModel 
	 * @returns article text document 
	 */
	crudArticleTextDocument(articleTextDocumentModel: ArticleTextDocumentModel): Observable<ArticleTextDocumentModel>{
		 switch (articleTextDocumentModel.operationType) {
			 case OperationsEnum.CREATE:
				 return this.post(ApiUrls.KNOWLEDGE_BASE_ARTICLE_TEXT_DOCUMENT_ADD, articleTextDocumentModel);
				 break;
			 case OperationsEnum.EDIT:
				 return this.post(ApiUrls.KNOWLEDGE_BASE_ARTICLE_TEXT_DOCUMENT_EDIT, articleTextDocumentModel);
				 break;
			default:
				 break;
		 }
	 }
}
