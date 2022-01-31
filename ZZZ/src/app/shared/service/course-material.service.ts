/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-01-26 18:33:59
 */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { CourseMaterialModel } from "../model/course-material.model";
import { UserModel } from "../model/user.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
	providedIn: "root"
})
export class CourseMaterialService extends BaseService<BaseModel> {
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
	getCourseMaterial(): Observable<BaseModel>
	{
		return this.get(`${ApiUrls.COURSE_MATERIAL}`);
	}

	getRecommendedCourseMaterial(): Observable<BaseModel>
	{
		return this.get(`${ApiUrls.RECOMMENDED_COURSE_MATERIAL}`);
	}

	/**
	 * Cruds course material
	 * @param courseMaterialModel 
	 * @returns course material 
	 */
	crudCourseMaterial(courseMaterialModel: CourseMaterialModel): Observable<CourseMaterialModel>{
		switch (courseMaterialModel.operation) {
			case OperationsEnum.CREATE:
				return this.post(ApiUrls.COURSE_MATERIAL_ADD, courseMaterialModel);
				break;
			case OperationsEnum.EDIT:
				return this.post(ApiUrls.COURSE_MATERIAL_EDIT, courseMaterialModel);
				break;
			case OperationsEnum.DELETE:
				const url = `${ApiUrls.COURSE_MATERIAL_DELETE}/${courseMaterialModel.courseMaterialId}`;
				return this.post(ApiUrls.COURSE_MATERIAL_DELETE, courseMaterialModel);
				break;
			default:
				break;
		}
	}
}
