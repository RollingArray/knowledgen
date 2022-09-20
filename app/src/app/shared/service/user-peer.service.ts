/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:41:12 
 * Last modified  : 2022-09-20 15:45:56
 */



import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { ApiUrls } from "../constant/api-urls.constant";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "../model/base.model";
import { UserPeerModel } from "../model/user-peer.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root"
})
export class UserPeerService extends BaseService<BaseModel> {
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
