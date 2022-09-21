/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Account verification page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 14:25:52
 * Last modified  : 2022-08-12 13:02:43
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { NavParams } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EventPageEnum } from "src/app/shared/enum/event-page.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserTypeEnum } from "src/app/shared/enum/user-type.enum";
import { PlatformHelper } from "src/app/shared/helper/platform.helper";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { AnalyticsService } from "src/app/shared/service/analytics.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'app-account-verification',
	templateUrl: './account-verification.component.html',
	styleUrls: ['./account-verification.component.scss'],
})
export class AccountVerificationComponent
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
	 * @private Instance variable                               |
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of account verification component
	 */
	private loggedInUser$: Observable<UserModel>;

	/**
	 * Modal data of account verification component
	 */
	private _modalData: ModalData;

	/**
	 * Passed user of account verification component
	 */
	private _passedUser: UserModel;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @public Instance variable                                |
	 * -------------------------------------------------|
	 */


	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Getter & Setters                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * Gets active user email
	 */
	get activeUserEmail()
	{
		let activeUserEmail = '';
		this.loggedInUser$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((user: UserModel) =>
			{
				activeUserEmail = user.userEmail;
			});

		return activeUserEmail;
	}

	/**
	 * Gets user email
	 */
	get userEmail()
	{
		return this.formGroup.get('userEmail');
	}

	/**
	 * Gets user activation code
	 */
	get userVerificationCode()
	{
		return this.formGroup.get('userVerificationCode');
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Life cycle hook                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of account verification component.
	 * @param injector 
	 * @param alertService 
	 * @param router 
	 * @param platformHelper 
	 * @param navParams 
	 * @param analyticsService 
	 * @param translateService 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private router: Router,
		private platformHelper: PlatformHelper,
		public navParams: NavParams,
		private analyticsService: AnalyticsService,
		private translateService: TranslateService,
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);
		this._passedUser = this.navParams.get('data');
		this.loggedInUser$ = this.rootStateFacade.loggedInUser$;
		this.buildFrom();

		/*
			Log event
			*/
		this.analyticsService.log('', EventPageEnum.ACTIVATE, {
			data: '',
		});
	}

	/**
	 * on init
	 */
	ngOnInit() { }

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
	 * Builds from
	 */
	private async buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			userEmail: [
				this.activeUserEmail,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			],
			userVerificationCode: [
				'',
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.VERIFICATION_CODE_PATTERN),
				]),
			],
		});

		this.setFormData();
	}

	/**
	 * Sets form data
	 */
	private async setFormData()
	{
		const form = this.formGroup.value;
		form.userEmail = this._passedUser.userEmail;
		form.userVerificationCode = '';
	}

	/**
	 * Submits data
	 */
	private async submitData()
	{
		// build data userModel
		const form = this.formGroup.value;
		const userModel: UserModel = {
			userEmail: form.userEmail,
			userVerificationCode: form.userVerificationCode,
			userLoginType: 'FRESH_LOGIN',
			userPlatform: this.platformHelper.getDevicePlatform(),
		};

		// loader
		this.translateService
			.get('loading.signIngIn')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		// sign in
		this.rootStateFacade.accountVerification(userModel);

		// track user status
		this.rootStateFacade
			.selectUserLoggedInStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(status =>
			{
				if (status === OperationsEnum.SIGNED_IN_VERIFIED)
				{
					this.dismissModal();

					// check user type
					this.rootStateFacade.loggedInUserType$
					.pipe(takeUntil(this.unsubscribe))
					.subscribe((userType) => {
						if (userType === UserTypeEnum.Student)
						{
							this.router.navigate([
								this.apiUrls.STUDENT_ROOT_APP_URL_AFTER_AUTH,
							]);
						} 
						
						else if (userType === UserTypeEnum.Teacher)
						{
							this.router.navigate([
								this.apiUrls.TEACHER_ROOT_APP_URL_AFTER_AUTH,
							]);
						}
					});
				}
			});
	}

	/**
	 * Dismiss modal
	 */
	private dismissModal()
	{
		this.modalController.dismiss(this._modalData).then(() =>
		{
			this.formGroup.reset();
		});
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Public methods                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Submits account activation page
	 */
	async submit()
	{
		if (this.formGroup.invalid)
		{
			this.translateService
				.get('errorMessage.mandatory')
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data: string) =>
				{
					await this.alertService.presentBasicAlert(data);
				});
		} else
		{
			await this.submitData();
		}
	}

	/**
	 * Cancels modal
	 */
	cancelModal()
	{
		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};
		// store active user
		this.dismissModal();
	}

	/**
	 * Resends verification code
	 */
	public async resendVerificationCode()
	{
		// build data userModel
		const form = this.formGroup.value;
		const userModel: UserModel = {
			userEmail: form.userEmail
		};

		// loader
		this.translateService
			.get('loading.activationCode')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		// sign in
		this.rootStateFacade.signIn(userModel);
	}
}
