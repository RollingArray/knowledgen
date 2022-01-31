/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary SubChildMenu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-26 15:15:44
 */

import { Component, OnInit, Input, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";

@Component({
	selector: "sub-child-menu",
	templateUrl: "./sub-child-menu.component.html",
	styleUrls: ["./sub-child-menu.component.scss"],
})
export class SubChildMenuComponent extends BaseViewComponent implements OnInit
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
	  * @input & @output Instance variable								|
	  * -------------------------------------------------|
	  */
	@Input() childArticleId;

	/**
	 * Input  of child menu component
	 */
	 @Input() courseMaterialId;
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
	 * Description  of course material page
	 */
	subChildMenu$!: Observable<SubChildMenuModel[]>;

	/**
	 * Total number of sub child menu$ of sub child menu component
	 */
	totalNumberOfSubChildMenu$!: Observable<number>;

	courseMaterial$!: Observable<CourseMaterialModel>;

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

	 get isMaterialOwner()
	 {
		 let isMaterialOwner = false;
		 this.courseMaterial$.subscribe(data =>
		 {
			 const loggedInUser = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_ID);
			 isMaterialOwner = loggedInUser === data.userId ? true : false
		 });
 
		 return isMaterialOwner;
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
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private translateService: TranslateService,
		private rootStateFacade: RootStateFacade,
		private cookieService: CookieService,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		this.subChildMenu$ = this.courseMaterialMenuStateFacade.subChildMenuByChildId$(this.childArticleId);
		this.totalNumberOfSubChildMenu$ = this.courseMaterialMenuStateFacade.totalNumberOfSubChildMenu$;
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this.courseMaterialId);
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

	async addNewSubChild()
	{
		let totalNumberOfSubChildMenu = 0;
		this.subChildMenu$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => totalNumberOfSubChildMenu = data.length)
		
		this.translateService
			.get([
				'button.addSubChildMenu',
				'button.cancel',
				'button.add',
				'loading.wait'
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string[]) =>
			{
				const alert = await this.alertController.create({
					header: data['button.addSubChildMenu'],
					inputs: [
						{
							name: 'articleTitle',
							type: 'text'
						},
					],
					buttons: [
						{
							text: data['button.cancel'],
							handler: () =>
							{
								console.log('Confirm Cancel');
							}
						}, {
							text: data['button.add'],
							handler: async (data) =>
							{
								const subChildMenuModel: SubChildMenuModel = {
									childArticleId: this.childArticleId,
									subChildArticleOrder: totalNumberOfSubChildMenu + 1,
									courseMaterialId: this.courseMaterialId,
									articleTitle: data.articleTitle,
									operationType: OperationsEnum.CREATE
								}
		
								await this.rootStateFacade.startLoading(data['loading.wait']);
												
								this.courseMaterialMenuStateFacade.addNewSubChildMenu(subChildMenuModel);
							}
						}
					]
				});
		
				await alert.present();
			}
		);
	}

	public navigateToCourseMaterialArticle(articleId: string)
	{
		this.cookieService.set('_selArt', articleId);
		// this.router.navigate([
		// 	'go/course/material',
		// 	this.courseMaterialId,
		// 	'details',
		// 	'article',
		// 	articleId
		// ]);
	}
}
