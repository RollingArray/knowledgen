/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-01-20 01:28:23
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
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
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	courseMaterial$!: Observable<CourseMaterialModel>;

	private _courseMaterialId: string;

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
		const firstParentMenuId$ = this.courseMaterialMenuStateFacade.getFirstParentMenuId$;

		firstParentMenuId$.subscribe(articleId =>
		{
			if (articleId)
			{
				this.router.navigate([
					'go/course/material',
					courseMaterialId,
					'details',
					'article',
					articleId
				]);
			}
			else
			{
				console.log(articleId);
				this.router.navigate([
					'go/course/material',
					courseMaterialId,
					'details',
					'article',
					'none'
				]);
			}
			
		})
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

	
	
}

