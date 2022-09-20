/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Registered user service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 15:47:11 
 * Last modified  : 2022-09-20 15:47:27
 */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { BaseModel } from "../model/base.model";
import { UserModel } from "../model/user.model";
import { BaseService } from "./base.service";


@Injectable({
	providedIn: "root",
})
export class RegisteredUserService extends BaseService<UserModel> {
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
	 * Signs in
	 * @param userModel 
	 * @returns in 
	 */
	signIn(userModel: UserModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.SIGN_IN}`, userModel);
	}

	/**
	 * Gets user
	 * @param userModel 
	 * @returns user 
	 */
	getUser(userModel: UserModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.USER_DETAILS}`, userModel);
	}

	//
}
