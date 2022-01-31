/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-12-12 01:04:12
 * @modify date 2021-12-12 01:04:12
 * @desc Knowledge base article service
 */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";

import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { ArticleModel } from "../model/article.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class KnowledgeBaseArticleService extends BaseService<ArticleModel> {
	/**
	 * @param  {HttpClient} httpClient
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
	 * Gets menu
	 * @returns menu 
	 */
	getArticle(articleModel: ArticleModel): Observable<ArticleModel>
	{
		return this.post(ApiUrls.KNOWLEDGE_BASE_ARTICLE_COMPONENTS, articleModel);
	}
}
