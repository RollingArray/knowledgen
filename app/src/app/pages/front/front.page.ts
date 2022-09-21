/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Front page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:14:11
 * Last modified  : 2022-09-21 10:33:33
 */

import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/service/analytics.service';
import { EventPageEnum } from 'src/app/shared/enum/event-page.enum';
import { SelectLanguageComponent } from 'src/app/component/select-language/select-language.component';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';

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
		this.rootStateFacade.loggedInUserId$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((userId) => {
				if (userId) {
					this.router.navigate([
						this.apiUrls.ROOT_APP_URL_AFTER_AUTH,
					]);
				} else {
					// check intro status, if intro not yet done, add intro
				}
			});
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
