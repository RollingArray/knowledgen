/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-08-02 20:27:36
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { takeUntil } from 'rxjs/operators';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { TranslateService } from '@ngx-translate/core';
import { ParentMenuModel } from 'src/app/shared/model/parent-menu.model';
import { CourseMaterialMenuStateFacade } from 'src/app/state/course-material-menu/course-material-menu.state.facade';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { CourseMaterialStateModel } from 'src/app/state/course-material/course-material/course-material.state.model';
import { CourseMaterialStateFacade } from 'src/app/state/course-material/course-material.state.facade';
import { ParentMenuComponent } from 'src/app/component/parent-menu/parent-menu.component';
import { PopoverController } from '@ionic/angular';

@Component({
	selector: "project-users",
	templateUrl: "./course-material-details.page.html",
	styleUrls: ["./course-material-details.page.scss"]
})
export class CourseMaterialDetailsPage extends BaseViewComponent implements OnInit, OnDestroy
{

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */
	
	/**
	 * Article menu closed of course material details page
	 */
	private _articleMenuClosed: boolean = false;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	@ViewChild('articleMenu', { read: ElementRef, static: false }) articleMenu: ElementRef;
	
	/**
	 * Description  of course material page
	 */
	courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * First parent menu id$ of course material details page
	 */
	firstParentMenuId$: Observable<string | number>;

	/**
	 * Selected article of course material details page
	 */
	selectedArticle: string;

	/**
	 * Determines whether data has
	 */
	hasData$!: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	get articleMenuClosed()
	{
		return this._articleMenuClosed;
	}

	/**
	 * Gets back available
	 */
	get backAvailable()
	{
		return this.rootStateFacade.studyTimerStatus$;
	}
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	/**
	 * Creates an instance of course material page.
	 * @param injector 
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
		private popoverController: PopoverController
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		const courseMaterialId = this.activatedRoute.snapshot.paramMap.get('courseMaterialId');
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(courseMaterialId);
		this.firstParentMenuId$ = this.courseMaterialMenuStateFacade.getFirstParentMenuId$;
		this.firstParentMenuId$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(articleId =>
			{
				if (articleId)
				{
					this.selectedArticle = articleId as string;
				}
				else
				{
					///
				}
				
			});
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Knowledges base navigation
	 * @param ev 
	 */
	 async knowledgeBaseNavigation(ev: any) {
		const popover = await this.popoverController.create({
			component: ParentMenuComponent,
			cssClass: 'popover-view',
			event: ev,
			componentProps: {
				// data: this._rootMenuModel,
				// selectedMenu: this._articleId
			}
		});
		await popover.present();

		// check the return data
		popover.onDidDismiss().then(async data => {
			if (data.data.returnData) {
				//this.gotoPage(data.data.returnData);
			}

		});
	 }
	
	/**
	 * Goto page
	 * @param articleId 
	 */
	gotoPage(articleId  : string)
	{
		this.selectedArticle = articleId as string;
	}
	
	/**
	 * Shows menu
	 */
	public async showMenu()
	{
		this._articleMenuClosed = !this._articleMenuClosed;
	} 	
}

