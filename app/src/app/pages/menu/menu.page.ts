/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Menu page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 20:47:46 
 * Last modified  : 2022-07-27 21:53:47
 */


import { take, takeUntil } from 'rxjs/operators';
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { UserModel } from "src/app/shared/model/user.model";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { DataCommunicationService } from "src/app/shared/service/data-communication.service";
import { DataCommunicationModel } from "src/app/shared/model/data-communication.model";
import { BaseModel } from "src/app/shared/model/base.model";
import { UserProfileComponent } from "src/app/component/user-profile/user-profile.component";
import { MenuController } from "@ionic/angular";
import { UserService } from 'src/app/shared/service/user.service';
import { RouteChildrenModel, RouteModel } from 'src/app/shared/model/route.model';
import { LearnMoreComponent } from 'src/app/component/learn-more/learn-more.component';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { UpdateCheckerService } from 'src/app/shared/service/update-checker.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LocalStoreKey } from 'src/app/shared/constant/local-store-key.constant';
import { SelectLanguageComponent } from 'src/app/component/select-language/select-language.component';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { Alert } from 'selenium-webdriver';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
	selector: "app-menu",
	templateUrl: "./menu.page.html",
	styleUrls: ["./menu.page.scss"],
})
export class MenuPage extends BaseViewComponent implements OnInit, OnDestroy
{
	/**
	 * User model of menu page
	 */
	private _userModel: UserModel;

	/**
	 * Selected project of menu page
	 */
	private _selectedProject: string;

	/**
	 * Logged in user of menu page
	 */
	private _loggedInUser: string;

	/**
	 * Logged in user id of menu page
	 */
	private _loggedInUserId: string;

	/**
	 * Modal data of menu page
	 */
	private _modalData: ModalData;

	/**
	 * Project id of menu page
	 */
	private _projectId: string;

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
	 * Gets pages
	 */
	public get pages(): RouteModel[]
	{
		this._pages.map(eachPage =>
		{
			eachPage.children.map(eachPageChildren =>
			{
				eachPageChildren.allowMenuAccess = true;
			})
		});
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
	 * Sets logged in user
	 */
	public set loggedInUser(value: string)
	{
		this._loggedInUser = value;
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

	get userType()
	{
		return this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_TYPE);
	}

	get isUserTypeTeacher()
	{
		return this.userType === UserTypeEnum.Teacher ? true : false;
	}

	get isUserTypeStudent()
	{
		return this.userType === UserTypeEnum.Student ? true : false;
	}

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
	 * Creates an instance of menu page.
	 * @param injector 
	 * @param alertService 
	 * @param menuController 
	 * @param localStorageService 
	 * @param loadingService 
	 * @param dataCommunicationService 
	 * @param userService 
	 */
	constructor(
		injector: Injector,
		private menuController: MenuController,
		private localStorageService: LocalStorageService,
		private loadingService: LoadingService,
		private dataCommunicationService: DataCommunicationService,
		private userService: UserService,
		private updateCheckerService: UpdateCheckerService,
		private cookieService: CookieService,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
		private alertService: AlertService
	)
	{

		super(injector);

	}

	/**
	 * Registers back button
	 */
	async registerBackButton()
	{
		this.platform.backButton
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () =>
			{
				await this.userService.logout();
			});
	}

	// Lifecycle hook: ngOnInit
	async ngOnInit()
	{
		//
	}

	// Lifecycle hook: ionViewDidEnter
	async ionViewDidEnter()
	{
		this.updateCheckerService.checkIfAppUpdateAvailable();

		await this.passedProjectId();

		await this.getCurrentUser();

		await this.activeUserId();

		await this.ifInvalidSession();

		await this.registerBackButton();

		this.loadData();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	ionViewDidLeave()
	{
		window.location.reload;
	}

	/**
	 * Loads data
	 */
	async loadData()
	{
		//this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);
	}

	/**
	 * Passed project id
	 */
	async passedProjectId()
	{
		this.activatedRoute.params
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(params =>
			{
				this._projectId = params.projectId;
			});
	}

	/**
	 * Gets current user
	 */
	async getCurrentUser()
	{

		this.localStorageService
			.getActiveUserName()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				this._loggedInUser = data;
			});

		await this.activeUserId();
	}

	/**
	 * Actives user id
	 * @returns  
	 */
	async activeUserId()
	{
		this._loggedInUserId = this.localStorageService.getActiveUserId();
	}

	/**
	 * Actives user email
	 * @returns  
	 */
	async activeUserEmail()
	{
		let activeUserEmail = "";
		const observable = this.localStorageService
			.getActiveUserEmail()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				activeUserEmail = data;
			});
		return activeUserEmail;
	}

	/**
	 * invalid session
	 */
	async ifInvalidSession()
	{
		this.dataCommunicationService
			.getMessage()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((dataCommunicationModel: DataCommunicationModel) =>
			{
				//if the api response comes with invalid session, prompt user to re-sign in
				if (dataCommunicationModel.message === "INVALID_SESSION")
				{
					this.userService.logout();
				}
			});
	}


	/**
	 * Presents logout alert confirm
	 */
	async presentLogoutAlertConfirm()
	{
		const alert = await this.alertController.create({
			header: `${StringKey.CONFIRM_ACTION}`,
			message: `${StringKey.CONFIRM_LOG_OUT}`,
			buttons: [
				{
					text: `${StringKey.NO}`,
					cssClass: "primary",
					handler: () => { },
				},
				{
					text: `${StringKey.YES}`,
					handler: async () =>
					{
						//close the side menu and log out
						this.menuController.close();
						await this.userService.logout();
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
	async viewProfile()
	{
		const modal = await this.modalController.create({
			component: UserProfileComponent,
			componentProps: {
				data: {},
			},
		});

		modal.onDidDismiss().then((data) =>
		{
			this._modalData = data.data;
			if (this._modalData.cancelled)
			{
				//do not refresh the page
			} else
			{
				this._loggedInUser = this.localStorageService.currentActiveUserName$.getValue();
			}
		});

		return await modal.present();
	}

	/**
	 * Goto my projects
	 */
	async gotoMyProjects()
	{
		this.router.navigate(["/go"]);
	}

	/**
	 * Goto page
	 * @param routeChildrenModel 
	 */
	async gotoPage(routeChildrenModel: RouteChildrenModel)
	{

		this.rootStateFacade.studyTimerStatus$.subscribe(
			studyTimerStatus =>
			{
				if (studyTimerStatus === OperationsEnum.END)
				{
					this.routePage(routeChildrenModel);
				}
				else
				{
					this.translateService
						.get('actionAlert.ongoingActivity')
						.pipe(take(1))
						.subscribe(async data =>
						{

							await this.alertService.presentBasicAlert(data);
						});
				}
			}
		)
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
	 * Goto action
	 * @param routeChildrenModel 
	 */
	async gotoAction(routeChildrenModel: RouteChildrenModel)
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
				data: {}
			}
		});

		modal.onDidDismiss().then(data =>
		{
			//
		});

		return await modal.present();
	}

	async changeLanguage()
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
}
