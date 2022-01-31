/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-01-22 17:08:17
 */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { LocalStoreKey } from "../constant/local-store-key.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { UserTypeEnum } from "../enum/user-type.enum";
import { AvailabilityPlannerModel } from "../model/availability-planner.model";
import { BaseModel } from "../model/base.model";

import { UserModel } from "../model/user.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
	providedIn: "root"
})
export class AvailabilityPlannerService extends BaseService<BaseModel> {
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

	/**
	 * Gets course material
	 * @param userModel 
	 * @returns course material 
	 */
	getAvailabilityPlanner(availabilityPlannerModel: AvailabilityPlannerModel): Observable<BaseModel>
	{
		const userType = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_TYPE);
		if (userType === UserTypeEnum.Student)
		{
			return this.post(`${ApiUrls.STUDENT_AVAILABILITY_PLANNER}`, availabilityPlannerModel);
		}
		else
		{
			return this.post(`${ApiUrls.TEACHER_AVAILABILITY_PLANNER}`, availabilityPlannerModel);
		}

	}

	/**
	 * Cruds course material
	 * @param availabilityPlannerModel 
	 * @returns course material 
	 */
	crudTeacherAvailabilityPlanner(availabilityPlannerModel: AvailabilityPlannerModel): Observable<AvailabilityPlannerModel>
	{
		const userType = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_TYPE);
		
		switch (availabilityPlannerModel.operationType)
		{
			case OperationsEnum.CREATE:
				return this.post(userType === UserTypeEnum.Teacher ? ApiUrls.TEACHER_AVAILABILITY_PLANNER_ADD : ApiUrls.STUDENT_AVAILABILITY_PLANNER_ADD, availabilityPlannerModel);
				break;
			case OperationsEnum.EDIT:
				return this.post(userType === UserTypeEnum.Teacher ? ApiUrls.TEACHER_AVAILABILITY_PLANNER_EDIT : ApiUrls.STUDENT_AVAILABILITY_PLANNER_EDIT, availabilityPlannerModel);
				break;
			case OperationsEnum.DELETE:
				return this.post(userType === UserTypeEnum.Teacher ? ApiUrls.TEACHER_AVAILABILITY_PLANNER_DELETE : ApiUrls.STUDENT_AVAILABILITY_PLANNER_DELETE, availabilityPlannerModel);
				break;
			default:
				break;
		}
	}
}
