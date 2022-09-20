/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User profile component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 08:43:51 
 * Last modified  : 2022-09-20 08:44:10
 */


import
	{
		Component,
		OnInit,
		OnDestroy,
		Input,
		ViewChild,
		Injector,
	} from '@angular/core';
import { IonSlides, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { AlertService } from 'src/app/shared/service/alert.service';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { BaseFormComponent } from '../base/base-form.component';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent
	extends BaseFormComponent
	implements OnInit, OnDestroy
{
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @readonly properties                             |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @private Instance variable                       |
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of user profile component
	 */
	private _userModel: UserModel;

	/**
	 * Modal data of user profile component
	 */
	private _modalData: ModalData;

	/**
	 * If form active of user profile component
	 */
	private _ifFormActive = false;

	/**
	 * Segment  of user profile component
	 */
	private _segment!: number;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @public Instance variable                        |
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of user profile component
	 */
	public modalLoadingIndicatorStatus$: Observable<boolean>;

	/**
	 * Logged in user$ of user profile component
	 */
	public loggedInUser$: Observable<UserModel>;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Getter & Setters                                 |
	 * -------------------------------------------------|
	 */

	//get user email
	get userFirstName()
	{
		return this.formGroup.get('userFirstName');
	}

	get userLastName()
	{
		return this.formGroup.get('userLastName');
	}

	get userEmail()
	{
		return this.formGroup.get('userEmail');
	}

	get userSkills()
	{
		return this.formGroup.get('userSkills');
	}

	/**
	 * @description Gets segment
	 */
	public get segment(): number
	{
		return this._segment;
	}

	/**
	 * Sets segment
	 */
	public set segment(value: number)
	{
		this._segment = value;
	}

	/**
	 * Gets if form active
	 */
	public get ifFormActive()
	{
		return this._ifFormActive;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of user profile component
	 */
	@ViewChild('slides', { static: false }) slides: IonSlides;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Life cycle hook                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of user profile component.
	 * @param injector
	 * @param alertService
	 * @param rootStateFacade
	 * @param navParams
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private rootStateFacade: RootStateFacade,
		public navParams: NavParams
	)
	{
		super(injector);
		this.modalLoadingIndicatorStatus$ =
			this.rootStateFacade.modalLoadingIndicatorStatus$;
		this.loggedInUser$ = this.rootStateFacade.loggedInUser$;
		this._ifFormActive = false;
		this.getActiveUser();
		this.buildFrom();
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this._segment = 0;
	}

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Private methods                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions user profile component
	 */
	private getActiveUser()
	{
		this.loggedInUser$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: UserModel) =>
			{
				this._userModel = data;
			});
	}

	/**
	 * Sets passed value to from
	 */
	private setPassedValueToFrom()
	{
		const form = this.formGroup.value;

		form.userFirstName = this._userModel.userFirstName;
		form.userLastName = this._userModel.userLastName;
		form.userEmail = this._userModel.userEmail;

		this.formGroup.disable();
	}

	/**
	 * Builds from
	 */
	private buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			userFirstName: [
				this._userModel.userFirstName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userLastName: [
				this._userModel.userLastName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userEmail: [
				this._userModel.userEmail,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			],
			userSkills: [
				this._userModel.userSkills,
				this.validators().compose([
					//
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
		const model: UserModel = {
			userFirstName: form.userFirstName,
			userLastName: form.userLastName,
			userEmail: form.userEmail,
			userSkills: form.userSkills,
			operationType: OperationsEnum.EDIT,
		};

		return model;
	}

	/**
	 * Submits data
	 */
	private async submitData()
	{
		//start loader
		this.rootStateFacade.startModalLoading();

		//build pass post data
		const model: UserModel = this.buildDataModelToPass();

		this.rootStateFacade.userProfileUpdate(model);

		this._ifFormActive = false;
	}

	/**
	 * Dismiss modal
	 */
	private dismissModal()
	{
		this.modalController.dismiss(this._modalData).then(() => { });
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Public methods                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions user profile component
	 */
	public async edit()
	{
		this.formGroup.enable();
		this._ifFormActive = true;
	}

	/**
	 * Submits user profile component
	 */
	public async submit()
	{
		if (this.formGroup.invalid)
		{
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else
		{
			await this.submitData();
		}
	}

	/**
	 * Closes modal
	 */
	public closeModal()
	{
		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};

		// store active user
		this.dismissModal();
	}
}
