/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Front page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:14:11
 * Last modified  : 2022-10-11 21:11:38
 */

import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/service/analytics.service';
import { EventPageEnum } from 'src/app/shared/enum/event-page.enum';
import { SelectLanguageComponent } from 'src/app/component/select-language/select-language.component';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';

@Component({
	selector: 'app-front',
	templateUrl: './front.page.html',
	styleUrls: ['./front.page.scss'],
})
export class FrontPage extends BaseViewComponent implements OnInit, OnDestroy {
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @readonly properties                             |
	 * -------------------------------------------------|
	 */

	/**
	 * Year  of front page
	 */
	 readonly year = new Date().getFullYear();

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @private Instance variable                       |
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of front page
	 */
	private _checkIfUserLoggedIn = false;

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
	 * Gets description
	 */
	get checkIfUserLoggedIn()
	{
		return this._checkIfUserLoggedIn;
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
	 * Creates an instance of front page.
	 * @param injector 
	 * @param analyticsService 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private analyticsService: AnalyticsService,
		private rootStateFacade: RootStateFacade
	) {
		super(injector);

		/*
		Log event
		*/
		this.analyticsService.log('', EventPageEnum.FRONT, {
			data: '',
		});
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * on init
	 */
	async ngOnInit() {
		
	}

	/**
	 * Ions view did enter
	 */
	ionViewDidEnter()
	{
		// take a moment to do the check, this will allow the menu of the modules to lazy load
		setTimeout(() =>
		{
			this.rootStateFacade.loggedInUserId$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((userId) => {
				this._checkIfUserLoggedIn = true;
				if (userId)
				{
					
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
				} else {
					// check intro status, if intro not yet done, add intro
				}
			});
		}, 100);
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Private methods                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Public methods                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions front page
	 * @returns  
	 */
	public async changeLanguage() {
		const modal = await this.modalController.create({
			component: SelectLanguageComponent,
			componentProps: {
				//
			},
		});

		modal.onDidDismiss().then((data) => {
			//if app, initiate push notificaiton
			window.location.reload();
		});

		return await modal.present();
	}
}
