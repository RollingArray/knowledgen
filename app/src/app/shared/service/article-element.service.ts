/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article element service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-16 20:55:01 
 * Last modified  : 2022-01-26 01:10:41
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { ContentModel } from "../model/content.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";



@Injectable({
	providedIn: "root"
})
export class ArticleComponentService extends BaseService<ContentModel> {
	/**
	 * @param  {HttpClient} httpClient
	 */
	 constructor(
		httpClient: HttpClient,
		localStorageService: LocalStorageService,
		alertController: AlertController,
		dataCommunicationService: DataCommunicationService,
		toastController: ToastController,
		private cookieService: CookieService
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

	crudArticleComponent(content: ContentModel): Observable<ContentModel>
	{
		return this.post(ApiUrls.KNOWLEDGE_BASE_ARTICLE_COMPONENT_ADD, content);
	}

	
}
