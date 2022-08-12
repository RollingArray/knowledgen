/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:09:47 
 * Last modified  : 2022-08-12 20:10:11
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { BaseModel } from "../model/base.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class DashboardService extends BaseService<BaseModel> {
	/**
	 * Creates an instance of dashboard service.
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
