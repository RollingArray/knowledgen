/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 16:18:07 
 * Last modified  : 2022-09-20 16:18:29
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
	providedIn: "root"
})
export class UserService extends BaseService<BaseModel> {
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
	signIn(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.SIGN_IN}`, userModel);
	}

	/**
	 * Gets user
	 * @param userModel 
	 * @returns user 
	 */
	getUser(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_DETAILS}`, userModel);
	}

	/**
	 * Signs up
	 * @param userModel 
	 * @returns up 
	 */
	signUp(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.SIGN_UP}`, userModel);
	}

	/**
	 * Activates user account
	 * @param userModel 
	 * @returns user account 
	 */
	activateUserAccount(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_ACTIVATE}`, userModel);
	}

	/**
	 * Resends activation code
	 * @param userModel 
	 * @returns activation code 
	 */
	resendActivationCode(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_ACTIVATE_CODE_RESEND}`, userModel);
	}

	/**
	 * Users profile update
	 * @param userModel 
	 * @returns profile update 
	 */
	userProfileUpdate(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_PROFILE_UPDATE}`, userModel);
	}

	/**
	   * Logouts menu page
	   */
	async logout()
	{
		// await this.loadingService.present(
		// 	`${StringKey.API_REQUEST_MESSAGE_5}`
		// );
		this.rootStateFacade.deleteUser();	
	}









	//


}
