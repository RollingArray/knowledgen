/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material assignment service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-26 10:03:16 
 * Last modified  : 2022-09-20 15:51:51
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { BaseModel } from "../model/base.model";
import { CourseMaterialAssignmentResultModel } from "../model/course-material-assignment-result.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class CourseMaterialAssignmentService extends BaseService<BaseModel> {
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
	 * Assignments result
	 * @param courseMaterialAssignmentResultModel 
	 * @returns result 
	 */
	assignmentResult(courseMaterialAssignmentResultModel: CourseMaterialAssignmentResultModel): Observable<CourseMaterialAssignmentResultModel>
	{
		return this.post(`${ApiUrls.COURSE_MATERIAL_ASSIGNMENT_RESULT}`, courseMaterialAssignmentResultModel);
	}
}
