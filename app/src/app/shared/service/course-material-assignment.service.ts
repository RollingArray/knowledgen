/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 10:03:16 
 * Last modified  : 2022-07-26 10:03:34
 */



import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { BaseModel } from "../model/base.model";
import { CourseMaterialAssignmentResultModel } from "../model/course-material-assignment-result.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class CourseMaterialAssignmentService extends BaseService<BaseModel> {
	/**
	 * Creates an instance of course material assignment service.
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
	 * Assignments result
	 * @param courseMaterialAssignmentResultModel 
	 * @returns result 
	 */
	assignmentResult(courseMaterialAssignmentResultModel: CourseMaterialAssignmentResultModel): Observable<CourseMaterialAssignmentResultModel>
	{
		return this.post(`${ApiUrls.COURSE_MATERIAL_ASSIGNMENT_RESULT}`, courseMaterialAssignmentResultModel);
	}
}
