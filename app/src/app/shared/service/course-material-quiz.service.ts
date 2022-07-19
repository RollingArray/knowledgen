/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-07-19 18:52:22
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { CourseMaterialQuizModel } from "../model/course-material-quiz.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class CourseMaterialQuizService extends BaseService<BaseModel> {
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