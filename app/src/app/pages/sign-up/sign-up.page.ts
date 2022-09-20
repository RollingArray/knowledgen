/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sign up page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:17:44
 * Last modified  : 2022-09-20 12:16:06
 */

import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/component/base/base-form.component';
import { AlertService } from 'src/app/shared/service/alert.service';
import { takeUntil } from 'rxjs/operators';
import { AnalyticsService } from 'src/app/shared/service/analytics.service';
import { EventPageEnum } from 'src/app/shared/enum/event-page.enum';
import { AccountVerificationComponent } from 'src/app/component/account-verification/account-verification.component';
import { UserModel } from 'src/app/shared/model/user.model';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.page.html',
	styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BaseFormComponent implements OnInit, OnDestroy
{
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @readonly properties                             |
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of sign up page
	 */
	readonly userTypeEnum = UserTypeEnum;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @private Instance variable                       |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @public Instance variable                        |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Getter & Setters                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * Gets user first name
	 */
	get userFirstName()
	{
		return this.formGroup.get('userFirstName');
	}

	/**
	 * Gets user last name
	 */
	get userLastName()
	{
		return this.formGroup.get('userLastName');
	}

	/**
	 * Gets user email
	 */
	get userEmail()
	{
		return this.formGroup.get('userEmail');
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @ViewChild Instance variable                     |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Life cycle hook                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of sign up page.
	 * @param injector
	 * @param alertService
	 * @param loadingService
	 * @param userService
	 * @param router
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private analyticsService: AnalyticsService,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService
	)
	{
		super(injector);
		this.buildFrom();

		/*
		Log event
		*/
		this.analyticsService.log('', EventPageEnum.SIGN_UP, {
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
	 * Descriptions sign up page
	 */
	private buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			userFirstName: [
				'',
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userLastName: [
				'',
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userEmail: [
				'',
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			],
		});

		this.setFormData();
	}

	/**
	 * Sets form data
	 */
	private setFormData()
	{
		const form = this.formGroup.value;
		form.userFirstName = '';
		form.userLastName = '';
		form.userEmail = '';
	}

	/**
	 * Submits data
	 */
	private async submitData(userTypeEnum: UserTypeEnum)
	{
		// build data userModel
		const form = this.formGroup.value;
		const userModel = {
			userFirstName: form.userFirstName,
			userLastName: form.userLastName,
			userEmail: form.userEmail,
			userType: userTypeEnum,
		};

		// loader
		this.translateService
			.get('loading.signIngUp')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		// sign in
		this.rootStateFacade.signUp(userModel);

		// track user status
		this.rootStateFacade.selectUserLoggedInStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((status) =>
			{
				if (status === OperationsEnum.SIGNED_UP)
				{
					this.loadAccountVerification(userModel);
				}
			});
	}

	/**
	 * Loads account verification
	 * @param userModel 
	 * @returns  
	 */
	private async loadAccountVerification(userModel: UserModel)
	{
		const modal = await this.modalController.create({
			component: AccountVerificationComponent,
			componentProps: {
				data: userModel,
			},
		});

		modal.onDidDismiss().then((data) =>
		{
			//if app, initiate push notificaiton
		});

		return await modal.present();
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Public methods                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Submits sign up page
	 */
	public async submit(userTypeEnum: UserTypeEnum)
	{
		if (this.formGroup.invalid)
		{
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else
		{
			await this.submitData(userTypeEnum);
		}
	}
}
