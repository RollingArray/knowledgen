/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-01 18:23:29 
 * Last modified  : 2022-09-20 15:51:14
 */



import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { CourseMaterialFlashCardModel } from "../model/course-material-flash-card.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class CourseMaterialFlashCardService extends BaseService<BaseModel> {
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
	 * Gets course material flash card
	 * @param courseMaterialFlashCardModel 
	 * @returns course material flash card 
	 */
	getCourseMaterialFlashCard(courseMaterialFlashCardModel: CourseMaterialFlashCardModel): Observable<BaseModel>
	{
		return this.post(ApiUrls.COURSE_MATERIAL_FLASH_CARD, courseMaterialFlashCardModel);
	 }
 
	 /**
	  * Cruds course material flash card
	  * @param courseMaterialFlashCardModel 
	  * @returns course material flash card 
	  */
	 crudCourseMaterialFlashCard(courseMaterialFlashCardModel: CourseMaterialFlashCardModel): Observable<CourseMaterialFlashCardModel>{
		 switch (courseMaterialFlashCardModel.operationType) {
			 case OperationsEnum.CREATE:
				 return this.post(ApiUrls.COURSE_MATERIAL_FLASH_CARD_ADD, courseMaterialFlashCardModel);
				 break;
			 case OperationsEnum.EDIT:
				 return this.post(ApiUrls.COURSE_MATERIAL_FLASH_CARD_EDIT, courseMaterialFlashCardModel);
				 break;
			 case OperationsEnum.DELETE:
				 return this.post(ApiUrls.COURSE_MATERIAL_FLASH_CARD_DELETE, courseMaterialFlashCardModel);
				 break;
			 default:
				 break;
		 }
	 }
}