/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-04 20:13:27 
 * Last modified  : 2022-09-20 15:58:29
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { ArticleSessionModel } from "../model/article-session.model";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class ArticleSessionService extends BaseService<ArticleSessionModel> {
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
	 * Gets article sessions
	 * @param articleSessionModel 
	 * @returns article sessions 
	 */
	getArticleSessions(articleSessionModel: ArticleSessionModel): Observable<BaseModel>
	 {
		 return this.post(ApiUrls.COURSE_MATERIAL_SESSION_TIME_ALL, articleSessionModel);
	 }
 
	/**
	 * Cruds article session
	 * @param articleSessionModel 
	 * @returns article session 
	 */
	crudArticleSession(articleSessionModel: ArticleSessionModel): Observable<ArticleSessionModel>{
		return this.post(ApiUrls.COURSE_MATERIAL_SESSION_TIME_ADD, articleSessionModel);
	}
}
