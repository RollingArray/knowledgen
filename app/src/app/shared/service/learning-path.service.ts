/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Learning path service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-07 07:59:40 
 * Last modified  : 2022-09-20 15:47:49
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { CourseMaterialModel } from "../model/course-material.model";
import { LearningPathModel } from "../model/learning-path.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class LearningPathService extends BaseService<BaseModel> {
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
	getLearningPath(): Observable<BaseModel>
	{
		return this.get(`${ApiUrls.LEARNING_PATH}`);
	}

	/**
	 * Cruds learning path
	 * @param learningPathModel 
	 * @returns learning path 
	 */
	crudLearningPath(learningPathModel: LearningPathModel): Observable<CourseMaterialModel>{
		switch (learningPathModel.operationType) {
			case OperationsEnum.CREATE:
				return this.post(ApiUrls.LEARNING_PATH_ADD, learningPathModel);
				break;
			case OperationsEnum.DELETE:
				return this.post(ApiUrls.LEARNING_PATH_DELETE, learningPathModel);
				break;
			default:
				break;
		}
	}
}
