/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:41:12 
 * Last modified  : 2022-09-19 19:41:36
 */



import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { UserPeerModel } from "../model/user-peer.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class UserPeerService extends BaseService<BaseModel> {
	/**
	 * Creates an instance of user peer service.
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
	 * Gets peer points
	 * @returns peer points 
	 */
	getPeerPoints(): Observable<BaseModel>
	{
		return this.get(`${ApiUrls.PEER_ALL}`);
	}

	/**
	 * Cruds peer
	 * @param userPeerModel 
	 * @returns peer 
	 */
	crudPeer(userPeerModel: UserPeerModel): Observable<UserPeerModel>
	{
		switch (userPeerModel.operationType)
		{
			case OperationsEnum.CREATE:
				return this.post(ApiUrls.PEER_ADD, userPeerModel);
				break;
			case OperationsEnum.DELETE:
				return this.post(ApiUrls.PEER_DELETE, userPeerModel);
				break;
			default:
				break;
		}
	}
}
