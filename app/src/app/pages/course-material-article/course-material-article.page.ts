/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-01-20 01:40:34
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
	 selector: "course-material-article",
	 templateUrl: "./course-material-article.page.html",
	 styleUrls: ["./course-material-article.page.scss"]
 })
 export class CourseMaterialArticlePage extends BaseViewComponent implements OnInit, OnDestroy
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
 
	 _articleId: string;
 
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

	 get articleId()
	 {
		 return this._articleId;
	 }

	 get noTopic()
	 {
		 return this._articleId === 'none' ? true : false;
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
		this._articleId = this.activatedRoute.snapshot.paramMap.get('articleId');
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
 
 