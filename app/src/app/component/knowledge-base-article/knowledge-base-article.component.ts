/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-12-11 12:02:58
 * @modify date 2021-12-11 12:02:58
 * @desc Knowledge base article component
 */

import { Component, OnInit, AfterViewInit, Input, Output, Injector, EventEmitter } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";

import { StringKey } from "src/app/shared/constant/string.constant";
import { ElementTypeEnum } from "src/app/shared/enum/element-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { TitleTypeEnum } from "src/app/shared/enum/title-type.enum";
import { ArticleModel } from "src/app/shared/model/article.model";
import { ContentModel } from "src/app/shared/model/content.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { ArticleComponentService } from "src/app/shared/service/article-element.service";
import { KnowledgeBaseArticleService } from "src/app/shared/service/knowledge-base-article.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { BaseViewComponent } from "../base/base-view.component";



@Component({
	selector: 'knowledge-base-article',
	templateUrl: './knowledge-base-article.component.html',
	styleUrls: ['./knowledge-base-article.component.scss'],
})
export class KnowledgeBaseArticleComponent extends BaseViewComponent implements OnInit, AfterViewInit {
	
	readonly courseMaterialId = this.activatedRoute.snapshot.paramMap.get('courseMaterialId');

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Input & Output properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Description  of knowledge base article component
	 */
	@Input() articleId: string | number = '';

	/**
	 * @description Output  of knowledge base menu component
	 */
	@Output() emitSelectedArticle = new EventEmitter<string>();

	courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * Article model of articles page
	 */
	private _articleModel!: ArticleModel;

	/**
	 * @description Title type enum of search skill component
	 */
	readonly titleTypeEnum = TitleTypeEnum;

	/**
	 * @description String key of search skill component
	 */
	readonly stringKey = StringKey;

	/**
	 * @description Element type enum of knowledge base article component
	 */
	readonly elementTypeEnum = ElementTypeEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */
	/**
	 * Gets article model
	 */
	get articleModel() {
		return this._articleModel;
	}

	/**
	 * @description Gets article title
	 */
	get articleTitle() {
		let articleTitle = this.articleId!.toString().trim().toLowerCase().replace(/-/g, " ");
		const words = articleTitle.split(" ");
		let capitalEachWord = '';
		words.map(word => { 
			const capWord = word[0].toUpperCase() + word.substring(1);
			capitalEachWord = `${capitalEachWord} ${capWord}`; 
		});
		return capitalEachWord.trim();
	}

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

	ngOnChanges()
	{
		console.log(this.articleId);
		this.loadData();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of knowledge base article component.
	 * @param injector 
	 */
	constructor(
		injector: Injector,
		private knowledgeBaseArticleService: KnowledgeBaseArticleService,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private articleComponentService: ArticleComponentService,
		private cookieService: CookieService,
		private loadingService: LoadingService
	)
	{
		
		super(injector);
	}

	/**
	 * @description Descriptions search skill component
	 */
	ngOnInit() {
		this.loadData();
	}

	/**
	 * @description after view init
	 */
	ngAfterViewInit() {
		//
	}

	/**
	 * @description Descriptions skill requirement page
	 */
	loadData()
	{
		this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this.courseMaterialId);

		const articleModel: ArticleModel = {
			articleId: this.articleId as string
		}
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_1}`);
		this.knowledgeBaseArticleService.getArticle(articleModel).subscribe(async data =>
		{
			await this.loadingService.dismiss();
			// if (data.data.success)
			// {
			// 	this._articleModel = {
			// 		...this._articleModel,
			// 		articleTitle: this.articleTitle
			// 	}
			// }
			this._articleModel = data.data;
			
		});
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Gets image path
	 * @param imageName 
	 * @returns  
	 */
	

	

	/**
	 * @description Selects un searched skill
	 */
	 public goToPage(selectedArticle: string) {
		const articleId = selectedArticle!.trim().toLowerCase().replace(/ /g, "-");
		 this.emitSelectedArticle.emit(articleId);
		 console.log(articleId);
	 }
	
	/**
	 * Adds sub main menu
	 */
	 public async addArticleComponent()
	 {
 
		 const alert = await this.alertController.create({
			 cssClass: 'myClass',
			 header: 'Prompt!',
			 inputs: [
				 {
					 name: 'articleComponentContent',
					 type: 'textarea',
					 placeholder: 'Article title'
				 },
 
			 ],
			 buttons: [
				 {
					 text: `${ElementTypeEnum.LEVEL_1}`,
					 handler: (data) =>
					 {
						 const contentModel: ContentModel = {
							 articleComponentContent: data.articleComponentContent
						 };
 
						 this.generateContent(ElementTypeEnum.LEVEL_1, contentModel, OperationsEnum.CREATE);
					 }
				 }, {
					 text: `${ElementTypeEnum.LEVEL_2}`,
					 handler: (data) =>
					 {
						 const contentModel: ContentModel = {
							 articleComponentContent: data.articleComponentContent
						 };
						 this.generateContent(ElementTypeEnum.LEVEL_2, contentModel, OperationsEnum.CREATE);
					 }
				 },
				 {
					 text: `${ElementTypeEnum.LEVEL_3}`,
					 handler: (data) =>
					 {
						 const contentModel: ContentModel = {
							 articleComponentContent: data.articleComponentContent
						 };
						 this.generateContent(ElementTypeEnum.LEVEL_3, contentModel, OperationsEnum.CREATE);
					 }
				 }
				 , {
					 text: `${ElementTypeEnum.LIST}`,
					 handler: (data) =>
					 {
						 const contentModel: ContentModel = {
							 articleComponentContent: data.articleComponentContent
						 };
						 this.generateContent(ElementTypeEnum.LIST, contentModel, OperationsEnum.CREATE);
					 }
				 },
				 {
					 text: `${ElementTypeEnum.PARA}`,
					 handler: (data) =>
					 {
						 const contentModel: ContentModel = {
							 articleComponentContent: data.articleComponentContent
						 };
						 this.generateContent(ElementTypeEnum.PARA, contentModel, OperationsEnum.CREATE);
					 }
				 },
				 {
					 text: `${ElementTypeEnum.PARA_IMAGE}`,
					 handler: (data) =>
					 {
						 const contentModel: ContentModel = {
							 articleComponentContent: data.articleComponentContent
						 };
						 this.generateContent(ElementTypeEnum.PARA_IMAGE, contentModel, OperationsEnum.CREATE);
					 }
				 }
			 ]
		 });
 
		 await alert.present();
	 }
 
	 /**
	  * Generates content
	  * @param elementTypeEnum 
	  * @param articleComponentContent 
	  * @param operationType 
	  */
	 private generateContent(elementTypeEnum: ElementTypeEnum, contentModel: ContentModel, operationType: OperationsEnum)
	 {
		 
		 
		 if (operationType === OperationsEnum.CREATE)
		 {
			 contentModel = {
				 courseMaterialId: this.courseMaterialId,
				 articleId: this.articleId as string,
				 articleComponentOrder: this._articleModel.success ? this._articleModel.data.length + 1 : 1,
				 articleComponentType: elementTypeEnum,
				 articleComponentContent: contentModel.articleComponentContent,
				 operationType: operationType
			 };
		 }
 
		 else if (operationType === OperationsEnum.EDIT)
		 {
			 contentModel = {
				courseMaterialId: this.courseMaterialId,
				 articleId: this.articleId as string,
				 articleComponentId: contentModel.articleComponentId,
				 articleComponentOrder: contentModel.articleComponentOrder,
				 articleComponentType: elementTypeEnum,
				 articleComponentContent: contentModel.articleComponentContent,
				 operationType: operationType
			 };
		 }
 
 
		 this.articleComponentService.crudArticleComponent(contentModel).subscribe(data =>
		 {
			 this.loadData();
		 });
	 }

}
