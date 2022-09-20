/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Crud peer component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:32:06 
 * Last modified  : 2022-09-20 07:33:04
 */

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Injector, EventEmitter, Output } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { AlertService } from 'src/app/shared/service/alert.service';
import { Observable } from 'rxjs';
import { UserPeerStateFacade } from 'src/app/state/user-peer/user-peer.state.facade';
import { UserPeerModel } from 'src/app/shared/model/user-peer.model';

@Component({
	selector: 'crud-peer',
	templateUrl: './crud-peer.component.html',
	styleUrls: ['./crud-peer.component.scss'],
})
export class CrudPeerComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud peer component
	 */
	readonly arrayKey = ArrayKey;

	/**
	 * Regex  of crud peer component
	 */
	readonly regex = Regex;

	/**
	 * String key of crud peer component
	 */
	readonly stringKey = StringKey;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud peer component
	 */
	private _userPeer: UserPeerModel;
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud peer component
	 */
	public modalLoadingIndicatorStatus$: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud peer component
	 */
	@Output() submitPeerEvent = new EventEmitter<string>();
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get userEmail()
	{
		return this.formGroup.get('userEmail');
	}

	/**
	 * @description Gets response
	 */
	 public get response()
	 {
		 let response = '';
		 if (this._userPeer.operationType === OperationsEnum.CREATE)
		 {
			 response = 'response.newPeer';
		 }
		 else if (this._userPeer.operationType === OperationsEnum.DELETE)
		 {
			 response = 'response.deletePeer';
		 }
 
		 return response;
	 }

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of crud peer component.
	 * @param injector 
	 * @param toastService 
	 * @param translateService 
	 * @param alertService 
	 * @param userPeerStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private userPeerStateFacade: UserPeerStateFacade,
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);

		// check status of modal indicator status
		this.modalLoadingIndicatorStatus$ = this.rootStateFacade.modalLoadingIndicatorStatus$;

		// get act upon curd model from store
		this.userPeerStateFacade.operationUserPeer$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data =>
				{
					this._userPeer = data;
					
					//if the operation is delete, submit the data
					if (this._userPeer.operationType === OperationsEnum.DELETE)
					{
						console.log(this._userPeer);
						this.checkIfWantToDelete();
					}
				}
			);

		// build form
		this.buildFrom();

		
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Sets passed value to from
	 */
	private setPassedValueToFrom()
	{
		const form = this.formGroup.value;
		form.userEmail = this._userPeer.userEmail;
	}

	/**
	 * Resets from
	 */
	private resetFrom()
	{
		const form = this.formGroup.value;
		form.userEmail = '';
	}

	/**
	 * Builds from
	 */
	private buildFrom()
	{

		this.formGroup = this.formBuilder.group({
			userEmail: [
				this._userPeer.userEmail,
				this.validators().compose([
					// tslint:disable:no-unbound-method 
					this.validators().required
				]),
			],
		});

		this.setPassedValueToFrom();
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass()
	{
		// build data
		const form = this.formGroup.value;
		const model: UserPeerModel = {
			userEmail: form.userEmail,
			peerId: this._userPeer.peerId,
			userPeerId: this._userPeer.userPeerId,
			operationType: this._userPeer.operationType,
		};

		return model;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion()
	{
		this.userPeerStateFacade
			.userPeerCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{
				switch (operationsStatus)
				{
					case OperationsEnum.SUCCESS:

						// remove loading indicator
						this.rootStateFacade.stopModalLoading();
						
						//response
						const response = this.response;

						// show tost
						this.translateService
							.get(response)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{

								// success response
								this.toastService.presentToast(
									data
								);

								//reset form
								this.resetFrom();

								// reset crud model
								const model: UserPeerModel = {};
								this.userPeerStateFacade.actUponUserPeer(model, OperationsEnum.OPERATION_COMPLETE);
							});

						break;

					default:
						break;
				}
			});
	}

	/**
	 * Launchs operation
	 */
	private launchOperation()
	{

		const model: UserPeerModel = this.buildDataModelToPass();
		
		switch (this._userPeer.operationType)
		{
			case OperationsEnum.CREATE:
				this.userPeerStateFacade.addNewUserPeer(model);
				break;
			case OperationsEnum.DELETE:
				this.userPeerStateFacade.deleteUserPeer(model);
				break;
			default:
				break;
		}
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions crud peer component
	 */
	async submit()
	{
		if (this.formGroup.invalid)
		{
			this.translateService
				.get([
					'errorMessage.notAllowed',
					'errorMessage.mandatory'
				])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) =>
				{
					this.alertService.presentAlert(
						data['errorMessage.notAllowed'],
						data['errorMessage.mandatory'],
						data['button.ok'],
					);
				});
		} else
		{
			this.submitPeerEvent.emit();
			this.rootStateFacade.startModalLoading();
			this.launchOperation();
			this.crudOperationCompletion();
		}
	}

	/**
	 * Checks if want to delete
	 */
	private checkIfWantToDelete()
	 {
		 this.translateService
			 .get([
				 'actionAlert.confirm',
				 'actionAlert.delete',
				 'option.yes',
				 'option.no',
			 ]).pipe(takeUntil(this.unsubscribe))
			 .subscribe(async data =>
			 {
 
				 const alert = await this.alertController.create({
					 header: `${data['actionAlert.confirm']}`,
					 subHeader: data['actionAlert.delete'],
					 cssClass: 'custom-alert',
					 mode: 'md',
					 buttons: [
						 {
							 cssClass: 'ok-button ',
							 text: data['option.yes'],
							 handler: (_) =>
							 {
								this.rootStateFacade.startModalLoading();
								this.launchOperation();
								this.crudOperationCompletion();
							 }
						 },
						 {
							 cssClass: 'cancel-button',
							 text: data['option.no'],
							 handler: () =>
							 {
							 }
						 }
					 ]
				 });
				 await alert.present();
			 });
 
	 }
}
