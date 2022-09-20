/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:09:47 
 * Last modified  : 2022-09-20 15:49:42
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class DashboardService extends BaseService<BaseModel> {
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
	 * Gets dashboard student
	 * @returns dashboard student 
	 */
	getDashboardStudent(): Observable<BaseModel>
	{
		return this.get(`${ApiUrls.DASHBOARD_STUDENT}`);
	}

	/**
	 * Gets dashboard teacher
	 * @returns dashboard teacher 
	 */
	getDashboardTeacher(): Observable<BaseModel>
	{
		return this.get(`${ApiUrls.DASHBOARD_TEACHER}`);
	}
}
