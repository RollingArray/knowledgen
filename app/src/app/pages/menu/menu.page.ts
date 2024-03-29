/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Menu page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 20:47:46
 * Last modified  : 2022-09-21 20:30:59
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { LearnMoreComponent } from "src/app/component/learn-more/learn-more.component";
import { SelectLanguageComponent } from "src/app/component/select-language/select-language.component";
import { UserProfileComponent } from "src/app/component/user-profile/user-profile.component";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserTypeEnum } from "src/app/shared/enum/user-type.enum";
import { DataCommunicationModel } from "src/app/shared/model/data-communication.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { RouteModel, RouteChildrenModel } from "src/app/shared/model/route.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { DataCommunicationService } from "src/app/shared/service/data-communication.service";
import { UpdateCheckerService } from "src/app/shared/service/update-checker.service";
import { UserService } from "src/app/shared/service/user.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { environment } from "src/environments/environment";

@Component({
	selector: 'app-menu',
	templateUrl: './menu.page.html',
	styleUrls: ['./menu.page.scss'],
})
export class MenuPage extends BaseViewComponent implements OnInit, OnDestroy
{
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @readonly properties                             |
	 * -------------------------------------------------|
	 */

	/**
	 * App environment of learn more component
	 */
	readonly appEnvironment = environment.level ? environment.level : '';

	/**
	 * App version of learn more component
	 */
	readonly appVersion = environment.version;

	/**
	 * User type enum of menu page
	 */
	readonly userTypeEnum = UserTypeEnum;


	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @private Instance variable                       |
	 * -------------------------------------------------|
	 */

	/**
	 * Pages  of menu page
	 */
	private _pages = ArrayKey.APP_PRIMARY_ROUTE_PAGES;

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean;

	/**
	 * Load route of menu page
	 */
	private _loadRoute: boolean = true;

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @public Instance variable                        |
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of menu page
	 */
	public ifUserStudent$: Observable<boolean>;

	/**
	 * If user teacher$ of menu page
	 */
	public ifUserTeacher$: Observable<boolean>;

	/**
	 * Logged in user name$ of menu page
	 */
	public loggedInUserName$: Observable<string>;

	/**
	 * Logged in user id$ of menu page
	 */
	public loggedInUserId$: Observable<string>;

	/**
	 * Logged in user type$ of menu page
	 */
	public loggedInUserType$: Observable<UserTypeEnum>;
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Getter & Setters                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * Gets pages
	 */
	public get pages(): RouteModel[]
	{
		const currentURL = window.location.href;
		
		this._pages.map(eachRoute =>
		{
			eachRoute.children.map(eachChildPage =>
			{
				if (eachChildPage.url)
				{
					let constructUrl = ''
					eachChildPage.url.map(eachUrlSegment =>
					{
						constructUrl = `${constructUrl}/${eachUrlSegment}`;
					})
					eachChildPage.isSelected = currentURL.includes(constructUrl) ? true : false;
				}
			})
		})
		return this._pages;
	}

	/**
	 * Gets whether has data
	 */
	public get hasData(): boolean
	{
		return this._hasData;
	}

	/**
	 * Sets pages
	 */
	public set pages(value: RouteModel[])
	{
		this._pages = value;
	}

	/**
	 * Sets whether has data
	 */
	public set hasData(value: boolean)
	{
		this._hasData = value;
	}

	/**
	 * Gets load route
	 */
	get loadRoute()
	{
		return this._loadRoute;
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
	 * Creates an instance of menu page.
	 * @param injector 
	 * @param menuController 
	 * @param dataCommunicationService 
	 * @param userService 
	 * @param updateCheckerService 
	 * @param rootStateFacade 
	 * @param translateService 
	 * @param alertService 
	 */
	constructor(
		injector: Injector,
		private menuController: MenuController,
		private dataCommunicationService: DataCommunicationService,
		private userService: UserService,
		private updateCheckerService: UpdateCheckerService,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
		private alertService: AlertService
	)
	{
		super(injector);
		this.ifUserStudent$ = this.rootStateFacade.ifUserStudent$;
		this.ifUserTeacher$ = this.rootStateFacade.ifUserTeacher$;
		this.loggedInUserName$ = this.rootStateFacade.loggedInUserName$;
		this.loggedInUserId$ = this.rootStateFacade.loggedInUserId$;
		this.loggedInUserType$ = this.rootStateFacade.loggedInUserType$;
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		//
	}

	/**
	 * Ions view did enter
	 */
	async ionViewDidEnter()
	{
		this.updateCheckerService.checkIfAppUpdateAvailable();

		await this.ifInvalidSession();

		await this.registerBackButton();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	/**
	 * Ions view did leave
	 */
	ionViewDidLeave()
	{
		window.location.reload;
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Private methods                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * Registers back button
	 */
	private async registerBackButton()
	{
		this.platform.backButton
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () =>
			{
				await this.userService.logout();
			});
	}

	/**
	 * invalid session
	 */
	private async ifInvalidSession()
	{
		this.dataCommunicationService
			.getMessage()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((dataCommunicationModel: DataCommunicationModel) =>
			{
				//if the api response comes with invalid session, prompt user to re-sign in
				if (dataCommunicationModel.message === 'INVALID_SESSION')
				{
					this.userService.logout();
				}
			});
	}

	/**
	 * Presents logout alert confirm
	 */
	public async presentLogoutAlertConfirm()
	{
		const alert = await this.alertController.create({
			header: `${StringKey.CONFIRM_ACTION}`,
			message: `${StringKey.CONFIRM_LOG_OUT}`,
			buttons: [
				{
					text: `${StringKey.NO}`,
					cssClass: 'primary',
					handler: () => { },
				},
				{
					text: `${StringKey.YES}`,
					handler: async () =>
					{
						//close the side menu and log out
						//this.menuController.close();
						this.rootStateFacade.deleteUser();
					},
				},
			],
		});
		await alert.present();
	}

	/**
	 * Views profile
	 * @returns
	 */
	public async viewProfile()
	{
		const modal = await this.modalController.create({
			component: UserProfileComponent,
			componentProps: {
				data: {},
			},
		});

		modal.onDidDismiss().then((data) =>
		{
			//
		});

		return await modal.present();
	}



	/**
	 * Routes page
	 * @param routeChildrenModel
	 */
	private routePage(routeChildrenModel: RouteChildrenModel)
	{
		let constructUrl = [];

		constructUrl.push('go');

		for (const url of routeChildrenModel.url)
		{
			constructUrl.push(url);
		}
		this.router.navigate(constructUrl);
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Public methods                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Goto page
	 * @param routeChildrenModel
	 */
	public async gotoPage(routeChildrenModel: RouteChildrenModel)
	{
		this.rootStateFacade.studyTimerStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((studyTimerStatus) =>
			{
				if (studyTimerStatus === OperationsEnum.END)
				{
					this.routePage(routeChildrenModel);
				} else
				{
					this.translateService
						.get('actionAlert.ongoingActivity')
						.pipe(take(1))
						.subscribe(async (data) =>
						{
							await this.alertService.presentBasicAlert(data);
						});
				}
			});
	}

	/**
	 * Goto action
	 * @param routeChildrenModel
	 */
	public async gotoAction(routeChildrenModel: RouteChildrenModel)
	{
		switch (routeChildrenModel.action)
		{
			case 'changeLanguage':
				this.changeLanguage();
				break;

			default:
				break;
		}
	}

	/**
	 * Learns more
	 * @returns
	 */
	public async learnMore()
	{
		const modal = await this.modalController.create({
			component: LearnMoreComponent,
			componentProps: {
				data: {},
			},
		});

		modal.onDidDismiss().then((data) =>
		{
			//
		});

		return await modal.present();
	}

	/**
	 * Changes language
	 * @returns
	 */
	public async changeLanguage()
	{
		const modal = await this.modalController.create({
			component: SelectLanguageComponent,
			componentProps: {
				//
			},
		});

		modal.onDidDismiss().then((data) =>
		{
			//if app, initiate push notificaiton
			window.location.reload();
		});

		return await modal.present();
	}

	/**
	 * Checks if menu should show
	 * @param eachSubMenu
	 * @returns
	 */
	public checkIfMenuShouldShow(eachSubMenu: RouteChildrenModel)
	{
		let allowed = false;
		this.loggedInUserType$
			.pipe(take(1))
			.subscribe(async (userType) =>
			{
				allowed = eachSubMenu.allowAccess.filter(
					(access) => access === userType
				).length > 0
					? true
					: false;
			});
		return allowed;
	}
}
