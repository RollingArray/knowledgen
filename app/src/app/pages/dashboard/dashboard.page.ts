/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Dashboard page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-12 20:05:53 
 * Last modified  : 2022-08-12 20:08:19
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { CharacteristicsEnum } from "src/app/shared/enum/characteristics.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserTypeEnum } from "src/app/shared/enum/user-type.enum";
import { DashboardStudentModel } from "src/app/shared/model/dashboard-student.model";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { DashboardStateFacade } from "src/app/state/dashboard/dashboard.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";

@Component({
	selector: "dashboard",
	templateUrl: "./dashboard.page.html",
	styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage extends BaseViewComponent implements OnInit, OnDestroy
{

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	 * Characteristics enum of dashboard page
	 */
	readonly characteristicsEnum = CharacteristicsEnum;

	/**
	 * User type enum of dashboard page
	 */
	readonly userTypeEnum = UserTypeEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of dashboard page
	 */
	dashboardStudent$!: Observable<DashboardStudentModel>;

	/**
	 * Determines whether student data$ has
	 */
	hasStudentData$!: Observable<boolean>;

	/**
 * Loading indicator status$ of course material page
 */
	public loadingIndicatorStatus$: Observable<boolean>

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get userType()
	{
		return this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_TYPE);
	}

	/**
	 * Gets whether is user type teacher
	 */
	get isUserTypeTeacher()
	{
		return this.userType === UserTypeEnum.Teacher ? true : false;
	}

	/**
	 * Gets whether is user type student
	 */
	get isUserTypeStudent()
	{
		return this.userType === UserTypeEnum.Student ? true : false;
	}

	/**
	 * Gets logged in user
	 */
	public get loggedInUser(): string
	{
		let loggedInUserName = '';
		this.localStorageService
			.getActiveUserName()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				loggedInUserName = data;
			});

		return loggedInUserName;
	}

	/**
	 * Gets greeting
	 */
	get greeting()
	{
		const hr = new Date().getHours();
		let greet = '';

		if (hr < 12)
		{
			greet = 'pageTitle.morning';
		}
		else if (hr >= 12 && hr <= 17)
		{
			greet = 'pageTitle.afternoon';
		}
		else if (hr >= 17 && hr <= 24)
		{
			greet = 'pageTitle.evening';
		}

		return greet;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	/**
	 * Creates an instance of dashboard page.
	 * @param injector 
	 * @param dashboardStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 * @param cookieService 
	 * @param localStorageService 
	 */
	constructor(
		injector: Injector,
		private dashboardStateFacade: DashboardStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
		private cookieService: CookieService,
		private localStorageService: LocalStorageService,
	)
	{
		super(injector);
		this.loadingIndicatorStatus$ = this.rootStateFacade.loadingIndicatorStatus$;
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		this.loadData();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Loads data
	 */
	public loadData()
	{
		if (this.userType === UserTypeEnum.Student)
		{
			this.hasStudentData$ = this.dashboardStateFacade.hasStudentData$;
			this.dashboardStudent$ = this.dashboardStateFacade.dashboardStudent$;

			// if no data available ... make a api request, else work with store data
			this.hasStudentData$
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(
					hasData =>
					{
						if (!hasData)
						{
							this.getDashboard()
						}
					}
				);
		}

	}

	/**
	 * Gets course material material
	 */
	async getDashboard()
	{
		this.rootStateFacade.startLoading('');
		this.dashboardStateFacade.requestDashboardStudent();
	}
}