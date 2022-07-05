/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material menu service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:27:57 
 * Last modified  : 2022-07-05 11:31:55
 */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { ChildMenuModel } from "../model/child-menu.model";
import { CourseMaterialModel } from "../model/course-material.model";
import { ParentMenuModel } from "../model/parent-menu.model";
import { SubChildMenuModel } from "../model/sub-child-menu.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
	providedIn: "root"
})
export class CourseMaterialMenuService extends BaseService<BaseModel> {
	/**
	 * Creates an instance of course material menu service.
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
	 * Gets course material
	 * @param userModel 
	 * @returns course material 
	 */
	getCourseMaterialMenu(courseMaterialModel: CourseMaterialModel): Observable<BaseModel>
	{
		return this.post(ApiUrls.COURSE_MATERIAL_MENU, courseMaterialModel);
	}

	/**
	 * Adds new sub child menu
	 * @param subChildMenuModel 
	 * @returns new sub child menu 
	 */
	addNewMenu(parentMenuModel: ParentMenuModel): Observable<BaseModel>
	{
		return this.post(ApiUrls.COURSE_MATERIAL_PARENT_MENU_ADD, parentMenuModel);
	}
	/**
	 * Cruds parent menu
	 * @param parentMenuModel 
	 * @returns parent menu 
	 */
	crudParentMenu(parentMenuModel: ParentMenuModel): Observable<ParentMenuModel>{
		switch (parentMenuModel.operationType) {
			case OperationsEnum.CREATE:
				return this.post(ApiUrls.COURSE_MATERIAL_PARENT_MENU_ADD, parentMenuModel);
				break;
			case OperationsEnum.EDIT:
				return this.post(ApiUrls.COURSE_MATERIAL_PARENT_MENU_EDIT, parentMenuModel);
				break;
			case OperationsEnum.DELETE:
				return this.post(ApiUrls.COURSE_MATERIAL_PARENT_MENU_DELETE, parentMenuModel);
				break;
			default:
				break;
		}
	}

	/**
	 * Cruds child menu
	 * @param childMenuModel 
	 * @returns child menu 
	 */
	crudChildMenu(childMenuModel: ChildMenuModel): Observable<ChildMenuModel>{
		switch (childMenuModel.operationType) {
			case OperationsEnum.CREATE:
				return this.post(ApiUrls.COURSE_MATERIAL_CHILD_MENU_ADD, childMenuModel);
				break;
			case OperationsEnum.EDIT:
				return this.post(ApiUrls.COURSE_MATERIAL_CHILD_MENU_EDIT, childMenuModel);
				break;
			case OperationsEnum.DELETE:
				return this.post(ApiUrls.COURSE_MATERIAL_CHILD_MENU_DELETE, childMenuModel);
				break;
			default:
				break;
		}
	}

	/**
	 * Cruds sub child menu
	 * @param subChildMenuModel 
	 * @returns sub child menu 
	 */
	crudSubChildMenu(subChildMenuModel: SubChildMenuModel): Observable<SubChildMenuModel>{
		switch (subChildMenuModel.operationType) {
			case OperationsEnum.CREATE:
				return this.post(ApiUrls.COURSE_MATERIAL_SUB_CHILD_MENU_ADD, subChildMenuModel);
				break;
			case OperationsEnum.EDIT:
				return this.post(ApiUrls.COURSE_MATERIAL_SUB_CHILD_MENU_EDIT, subChildMenuModel);
				break;
			case OperationsEnum.DELETE:
				return this.post(ApiUrls.COURSE_MATERIAL_SUB_CHILD_MENU_DELETE, subChildMenuModel);
				break;
			default:
				break;
		}
	}
}
