/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-04 20:13:27 
 * Last modified  : 2022-09-02 20:46:09
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { ArticleSessionModel } from "../model/article-session.model";
import { ArticleModel } from "../model/article.model";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class ArticleRevisionService extends BaseService<ArticleModel> {
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
	 * Gets article sessions
	 * @param articleSessionModel 
	 * @returns article sessions 
	 */
	getArticleRevision(articleModel: ArticleModel): Observable<BaseModel>
	 {
		 return this.post(ApiUrls.COURSE_MATERIAL_REVISION_ALL, articleModel);
	 }
 
	/**
	 * Params article revision service
	 * @param articleModel 
	 * @returns article revision 
	 */
	crudArticleRevision(articleModel: ArticleModel): Observable<ArticleModel>
	{
		return this.post(ApiUrls.COURSE_MATERIAL_REVISION_ADD, articleModel);
	}
}
