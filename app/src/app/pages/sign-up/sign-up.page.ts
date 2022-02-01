/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sign up page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:17:44 
 * Last modified  : 2021-12-27 15:34:21
 */


import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/component/base/base-form.component';
import { AlertService } from 'src/app/shared/service/alert.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/model/base.model';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { AnalyticsService } from 'src/app/shared/service/analytics.service';
import { EventPageEnum } from 'src/app/shared/enum/event-page.enum';
import { AccountVerificationComponent } from 'src/app/component/account-verification/account-verification.component';
import { UserModel } from 'src/app/shared/model/user.model';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';


@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.page.html",
	styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage extends BaseFormComponent implements OnInit, OnDestroy {
	
	readonly userTypeEnum = UserTypeEnum;
	
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
		private loadingService: LoadingService,
		private userService: UserService,
		private router: Router,
		private localStorageService: LocalStorageService,
		private analyticsService: AnalyticsService,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService
	) {
		super(injector);
		this.buildFrom();

		/*
		Log event
		*/
		this.analyticsService.log('', EventPageEnum.SIGN_UP,
			{
				'data': ''
			}
		);
	}

	/**
	 * 
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			userFirstName: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userLastName: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
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
	 * 
	 */
	setFormData() {
		const form = this.formGroup.value;
		form.userFirstName = "";
		form.userLastName = "";
		form.userEmail = "";
	}

	/**
	 * Gets user first name
	 */
	get userFirstName() {
		return this.formGroup.get("userFirstName");
	}

	/**
	 * Gets user last name
	 */
	get userLastName() {
		return this.formGroup.get("userLastName");
	}

	/**
	 * Gets user email
	 */
	get userEmail() {
		return this.formGroup.get("userEmail");
	}

	/**
	 * Submits sign up page
	 */
	async submit(userTypeEnum: UserTypeEnum) {
		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			await this.submitData(userTypeEnum);
		}
	}

	/**
	 * Submits data
	 */
	async submitData(userTypeEnum: UserTypeEnum)
	{
		// build data userModel
		const form = this.formGroup.value;
		const userModel = {
			userFirstName: form.userFirstName,
			userLastName: form.userLastName,
			userEmail: form.userEmail,
			userType: userTypeEnum
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
		this.rootStateFacade.selectUserLoggedInStatus$.subscribe(status =>
		{
			if (status === OperationsEnum.SIGNED_UP)
			{
				this.loadAccountVerification(userModel);
			}
		});
	}

	/**
	 * on init
	 */
	ngOnInit() { }

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	// add Community
	async loadAccountVerification(userModel: UserModel) {
		const modal = await this.modalController.create({
			component: AccountVerificationComponent,
			componentProps: {
				data: userModel,
			},
		});

		modal.onDidDismiss().then((data) => {
			//if app, initiate push notificaiton
			
		});

		return await modal.present();

	}
}
