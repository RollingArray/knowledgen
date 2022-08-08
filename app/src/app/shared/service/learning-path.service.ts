/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Learning path service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-07 07:59:40 
 * Last modified  : 2022-08-08 10:50:05
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { CourseMaterialModel } from "../model/course-material.model";
import { LearningPathModel } from "../model/learning-path.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
	providedIn: "root"
})
export class LearningPathService extends BaseService<BaseModel> {
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
