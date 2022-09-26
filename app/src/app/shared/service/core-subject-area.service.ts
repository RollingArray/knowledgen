/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-09-20 15:50:03
 */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { CoreSubjectAreaModel } from "../model/core-subject-area.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class CoreSubjectAreaService extends BaseService<BaseModel> {
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
	 * Gets core subject area
	 * @returns core subject area 
	 */
	getCoreSubjectArea(): Observable<BaseModel>
	{
		return this.get(`${ApiUrls.CORE_SUBJECT_AREA}`);
	}

	/**
	 * Cruds core subject area
	 * @param coreSubjectAreaModel 
	 * @returns core subject area 
	 */
	crudCoreSubjectArea(coreSubjectAreaModel: CoreSubjectAreaModel): Observable<CoreSubjectAreaModel>{
		switch (coreSubjectAreaModel.operation) {
			case OperationsEnum.CREATE:
				return this.post(ApiUrls.CORE_SUBJECT_AREA_ADD, coreSubjectAreaModel);
				break;
			default:
				break;
		}
	}
}
