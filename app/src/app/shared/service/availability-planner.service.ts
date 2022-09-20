/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-09-20 16:11:31
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { UserTypeEnum } from "../enum/user-type.enum";
import { AvailabilityPlannerModel } from "../model/availability-planner.model";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class AvailabilityPlannerService extends BaseService<BaseModel> {
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
	 * Gets availability planner
	 * @param availabilityPlannerModel 
	 * @returns availability planner 
	 */
	getAvailabilityPlanner(availabilityPlannerModel: AvailabilityPlannerModel, userType: UserTypeEnum): Observable<BaseModel>
	{
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
	 * Cruds teacher availability planner
	 * @param availabilityPlannerModel 
	 * @returns teacher availability planner 
	 */
	crudTeacherAvailabilityPlanner(availabilityPlannerModel: AvailabilityPlannerModel, userType: UserTypeEnum): Observable<AvailabilityPlannerModel>
	{
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
