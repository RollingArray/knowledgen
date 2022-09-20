/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-04 20:13:27 
 * Last modified  : 2022-09-20 15:58:42
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { ArticleModel } from "../model/article.model";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class ArticleRevisionService extends BaseService<ArticleModel> {
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
