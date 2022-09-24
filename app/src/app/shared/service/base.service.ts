/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Base api service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 10:15:11 
 * Last modified  : 2022-09-20 16:18:34
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Subscription, Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { StringKey } from "../constant/string.constant";
import { BaseModel } from "../model/base.model";
import { UserModel } from "../model/user.model";

@Injectable({
	providedIn: "root",
})
export abstract class BaseService<T extends BaseModel> {
	/**
	 * String key of base service
	 */
	readonly stringKey = StringKey;

	/**
	 * User model of base service
	 */
	private _userModel: UserModel;

	/**
	 * Subscription  of base service
	 */
	private subscription: Subscription = new Subscription();

	/**
	 * Creates an instance of base service.
	 * @param httpClient 
	 * @param alertController 
	 * @param toastController 
	 * @param rootStateFacade 
	 */
	constructor(
		private httpClient: HttpClient,
		public alertController: AlertController,
		private toastController: ToastController,
		public rootStateFacade: RootStateFacade

	) { }

	/**
	 * Determines whether init on
	 */
	onInit() { }

	/**
	 * Determines whether destroy on
	 */
	onDestroy()
	{
		this.subscription.unsubscribe();
	}

	/**
	 * Gets base service
	 * @param url 
	 * @returns get 
	 */
	public get(url: string): Observable<T>
	{
		const apiData = this.httpClient.get(url).pipe(
			map((response: any) => response as T),
			catchError((error) => of(null))
		);
		return apiData;
	}

	/**
	 * Posts base service
	 * @param url 
	 * @param data 
	 * @returns post 
	 */
	public post(url: string, data: T): Observable<T>
	{
		return this.abstractPost(url, data);
	}

	/**
	 * Posts multi part
	 * @param url 
	 * @param data 
	 * @returns multi part 
	 */
	 public postMultiPart(url: string, data: T): Observable<T>
	 {
		var formData = new FormData();
		Object.keys(data).forEach(key => {
			formData.append(key, data[key]);
		});
		return this.abstractPost(url, formData);
	 }
	
	/**
	 * Abstracts post
	 * @param url 
	 * @param data 
	 * @returns  
	 */
	private abstractPost(url: string, data: T | FormData)
	{
		const apiData = this.httpClient.post<T>(url, data).pipe(
			map((response: BaseModel) =>
			{
				//if response has success true
				if (response.success)
				{
					//success block
					//if api token has updated, update in local service
					if (response.token)
					{
						this._userModel = {
							token: response.token,
						};
						this.rootStateFacade.updateUserToken(this._userModel);
					}
				}
				else
				{
					// logout is invalid session
					if (response.error)
					{
						const errorMessages: string[] = response.message;
						errorMessages.map(async (responseMessage) =>
						{
							if (this.toastController)
							{
								this.toastController.dismiss();
							}

							const toast = await this.toastController.create({
								message: responseMessage,
								cssClass: 'custom-toast',
								color: 'danger',
								duration: 2000,
								buttons: [
									{
										side: 'start',
										icon: 'information-circle',
										handler: () =>
										{
											//
										}
									}
								]
							});
							toast.present();

						});



					}
					else
					{
						//this.errorAlert(JSON.stringify(response.error.message));
					}
				}

				return response as T;
			}),
			catchError((error) => of(null))
		);
		return apiData;
	}

	/**
	 * Puts base service
	 * @param url 
	 * @param data 
	 * @returns put 
	 */
	public put(url: string, data: T): Observable<T>
	{
		const apiData = this.httpClient.put<T>(url, data).pipe(
			map((response: any) => response as T),
			catchError((error) => of(null))
		);
		return apiData;
	}

	/**
	 * Deletes base service
	 * @param url 
	 * @returns delete 
	 */
	public delete(url: string): Observable<T>
	{
		const apiData = this.httpClient.delete<T>(url).pipe(
			map((response: any) => response as T),
			catchError((error) => of(null))
		);
		return apiData;
	}

	/**
	 * Errors alert
	 * @param message 
	 * @returns  
	 */
	errorAlert(message: string)
	{
		return this.alertController
			.create({
				header: this.stringKey.APP_NAME,
				message,
				buttons: [
					{
						text: "Okay",
						handler: (data) => { },
					},
				],
			})
			.then((response) =>
			{
				response.present();
			});
	}
}
