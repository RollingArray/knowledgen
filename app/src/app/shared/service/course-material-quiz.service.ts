/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-09-20 15:50:27
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { CourseMaterialQuizModel } from "../model/course-material-quiz.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class CourseMaterialQuizService extends BaseService<BaseModel> {
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
	 * Gets course material quiz
	 * @param courseMaterialQuizModel 
	 * @returns course material quiz 
	 */
	getCourseMaterialQuiz(courseMaterialQuizModel: CourseMaterialQuizModel): Observable<BaseModel>
	{
		return this.post(ApiUrls.COURSE_MATERIAL_QUIZ, courseMaterialQuizModel);
	 }
 
	 /**
	  * Cruds course material quiz
	  * @param courseMaterialQuizModel 
	  * @returns course material quiz 
	  */
	 crudCourseMaterialQuiz(courseMaterialQuizModel: CourseMaterialQuizModel): Observable<CourseMaterialQuizModel>{
		 switch (courseMaterialQuizModel.operationType) {
			 case OperationsEnum.CREATE:
				 return this.post(ApiUrls.COURSE_MATERIAL_QUIZ_ADD, courseMaterialQuizModel);
				 break;
			 case OperationsEnum.EDIT:
				 return this.post(ApiUrls.COURSE_MATERIAL_QUIZ_EDIT, courseMaterialQuizModel);
				 break;
			 case OperationsEnum.DELETE:
				 return this.post(ApiUrls.COURSE_MATERIAL_QUIZ_DELETE, courseMaterialQuizModel);
				 break;
			 default:
				 break;
		 }
	 }
}