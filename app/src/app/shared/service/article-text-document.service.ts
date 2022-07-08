/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article element service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-16 20:55:01 
 * Last modified  : 2022-07-06 20:15:01
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { ArticleTextDocumentModel } from "../model/article-text-document.model";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class ArticleTextDocumentService extends BaseService<ArticleTextDocumentModel> {
	/**
	 * Creates an instance of article text document service.
	 * @param httpClient 
	 * @param localStorageService 
	 * @param alertController 
	 * @param dataCommunicationService 
	 * @param toastController 
	 */
	constructor(
		httpClient: HttpClient,
		localStorageService: LocalStorageService,
		alertController: AlertController,
		dataCommunicationService: DataCommunicationService,
		toastController: ToastController
	)
	{
		super(
			httpClient,
			localStorageService,
			alertController,
			dataCommunicationService,
			toastController
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
