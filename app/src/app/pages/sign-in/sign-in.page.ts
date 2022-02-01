/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Sign in page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 17:23:00 
 * Last modified  : 2022-01-20 18:31:59
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";
import { AccountVerificationComponent } from "src/app/component/account-verification/account-verification.component";
import { BaseFormComponent } from "src/app/component/base/base-form.component";
import { EventPageEnum } from "src/app/shared/enum/event-page.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserModel } from "src/app/shared/model/user.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { AnalyticsService } from "src/app/shared/service/analytics.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";

@Component({
	selector: "app-sign-in",
	templateUrl: "./sign-in.page.html",
	styleUrls: ["./sign-in.page.scss"],
})
export class SignInPage extends BaseFormComponent implements OnInit, OnDestroy
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
	 * Gets user email
	 */
	get userEmail()
	{
		return this.formGroup.get("userEmail");
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Life cycle hook                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of sign in page.
	 * @param injector 
	 * @param alertService 
	 * @param analyticsService 
	 * @param rootStateFacade 
	 * @param translateService 
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
		this.analyticsService.log('', EventPageEnum.SIGN_IN,
			{
				'data': ''
			}
		);
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
	 * Descriptions sign in page
	 */
	private buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			userEmail: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			]
		});

		this.setFormData();
	}

	/**
	 * Sets form data
	 */
	private setFormData()
	{
		const form = this.formGroup.value;
		form.userEmail = "";
	}

	/**
	 * Submits data
	 */
	private async submitData()
	{
		// build data userModel
		const form = this.formGroup.value;
		const userModel: UserModel = {
			userEmail: form.userEmail
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
		this.rootStateFacade.signIn(userModel);

		// track user status
		this.rootStateFacade.selectUserLoggedInStatus$.subscribe(status =>
		{
			if (status === OperationsEnum.SIGNED_IN_NOT_VERIFIED)
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
			//
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
	async submit()
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
}
