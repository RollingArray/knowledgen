/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary ChildMenu component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-01-26 16:11:17
 */


import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, ViewChild, Injector, Input, EventEmitter, Output } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { SlideModel } from "src/app/shared/model/slide.model";
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { CourseMaterialMenuStateFacade } from 'src/app/state/course-material-menu/course-material-menu.state.facade';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { ChildMenuModel } from 'src/app/shared/model/child-menu.model';
import { CookieService } from 'ngx-cookie-service';
import { CourseMaterialStateFacade } from 'src/app/state/course-material/course-material.state.facade';
import { LocalStoreKey } from 'src/app/shared/constant/local-store-key.constant';

@Component({
	selector: "child-menu",
	templateUrl: "./child-menu.component.html",
	styleUrls: ["./child-menu.component.scss"],
})
export class ChildMenuComponent extends BaseViewComponent implements OnInit
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
	 @Input() parentArticleId;
 
	 /**
	  * Input  of child menu component
	  */
	@Input() courseMaterialId;
	
	@Output() emitChildSelectedArticle = new EventEmitter<string>();
	
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
	 childMenu$!: Observable<ChildMenuModel[]>;
 
	 /**
	  * Total number of sub child menu$ of sub child menu component
	  */
	totalNumberOfChildMenu$!: Observable<number>;
	
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
		 private courseMaterialStateFacade: CourseMaterialStateFacade,
		 private translateService: TranslateService,
		 private rootStateFacade: RootStateFacade,
		 private cookieService: CookieService
	 )
	 {
		 super(injector);
	 }
 
	 /**
	  * on init
	  */
	 async ngOnInit()
	 {
		 this.childMenu$ = this.courseMaterialMenuStateFacade.childMenuByParentMenuId$(this.parentArticleId);
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
 
	 async addNewChild()
	 {
		 let totalNumberOfChildMenu = 0;
		 this.childMenu$
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(data => totalNumberOfChildMenu = data.length)
		 
		 this.translateService
			 .get([
				 'button.addChildMenu',
				 'button.cancel',
				 'button.add',
				 'loading.wait'
			 ])
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(async (data: string[]) =>
			 {
				 const alert = await this.alertController.create({
					 header: data['button.addChildMenu'],
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
								 const childMenuModel: ChildMenuModel = {
									 parentArticleId: this.parentArticleId,
									 childArticleOrder: totalNumberOfChildMenu + 1,
									 courseMaterialId: this.courseMaterialId,
									 articleTitle: data.articleTitle,
									 operationType: OperationsEnum.CREATE
								 }
		 
								 await this.rootStateFacade.startLoading(data['loading.wait']);
												 
								 this.courseMaterialMenuStateFacade.addNewChildMenu(childMenuModel);
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
		 this.emitChildSelectedArticle.emit(articleId);
		//  this.router.navigate([
		// 	 'go/course/material',
		// 	 this.courseMaterialId,
		// 	 'details',
		// 	 'article',
		// 	 articleId
		//  ]);
	 }
}
