/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-09-20 15:51:33
 */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { BaseModel } from "../model/base.model";
import { CourseMaterialFileModel } from "../model/course-material-fle.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class CourseMaterialFileUploadService extends BaseService<BaseModel> {
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
	 * Gets course material
	 * @param userModel 
	 * @returns course material 
	 */
	uploadCourseMaterialFile(courseMaterialFileModel: CourseMaterialFileModel): Observable<CourseMaterialFileModel>
	{
		return this.postMultiPart(`${ApiUrls.KNOWLEDGE_BASE_ARTICLE_UPLOAD_FILE}`, courseMaterialFileModel);
	}
}
