/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud assignment quiz component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 11:11:44 
 * Last modified  : 2022-07-19 15:59:35
 */

import { Component, OnInit, ViewChild, ElementRef, Injector, Inject, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { QuizTypeEnum } from "src/app/shared/enum/quiz-type.enum";
import { CourseMaterialQuizModel } from "src/app/shared/model/course-material-quiz.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { UtilityService } from "src/app/shared/service/utility.service";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialQuizStateFacade } from "src/app/state/course-material-quiz/course-material-quiz.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { CrudQuizQuestionComponent } from "../crud-quiz-question/crud-quiz-question.component";

@Component({
	selector: 'crud-assignment-quiz',
	templateUrl: './crud-assignment-quiz.component.html',
	styleUrls: ['./crud-assignment-quiz.component.scss'],
})
export class CrudAssignmentQuizComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud course material component
	 */
	readonly arrayKey = ArrayKey;

	/**
	 * String key of crud course material component
	 */
	readonly stringKey = StringKey;

	/**
	 * Operations enum of crud text document component
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	 @Input() isContentLive = false;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud text document component
	 */
	private _selectedText = '';

	/**
	 * Selected menu of crud text document component
	 */
	private _selectedMenu: MenuSelectModel;
	/**
	 * Saved selection of crud text document component
	 */
	private _savedSelection: Range | null;

	/**
	 * Operation type of crud text document component
	 */
	private _operationType: OperationsEnum;

	/**
	 * Show save of crud text document component
	 */
	private _showSave = false;

	/**
	 * Modal data of menu page
	 */
	private _modalData: ModalData;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	public selectedMenuArticle$: Observable<MenuSelectModel>;
	
	/**
	 * Course material quiz$ of crud assignment quiz component
	 */
	public courseMaterialQuiz$!: Observable<CourseMaterialQuizModel[]>;

	/**
	 * Course material$ of crud text document component
	 */
	 public courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * Determines whether data has
	 */
	 public hasData$!: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud text document component
	 */
	@ViewChild('editableTextDocument') editableTextDocument: ElementRef;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Gets loading
	 */
	public get loading()
	{
		let loading = '';
		if (this._operationType === OperationsEnum.CREATE)
		{
			loading = 'loading.settingContent';
		}
		else if (this._operationType === OperationsEnum.EDIT)
		{
			loading = 'loading.settingContent';
		}

		return loading;
	}

	/**
	 * @description Gets response
	 */
	public get response()
	{
		let response = '';
		if (this._operationType === OperationsEnum.CREATE)
		{
			response = 'response.settingContent';
		}
		else if (this._operationType === OperationsEnum.EDIT)
		{
			response = 'response.settingContent';
		}

		return response;
	}

	/**
	 * Gets description
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
	 * Gets operation type
	 */
	public get operationType()
	{
		return this._operationType;
	}

	/**
	 * Gets show save
	 */
	get showSave()
	{
		return this._showSave;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of crud course material component.
	 * @param injector 
	 * @param toastService 
	 * @param translateService 
	 * @param alertService 
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private rootStateFacade: RootStateFacade,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private courseMaterialQuizStateFacade: CourseMaterialQuizStateFacade,
		private cookieService: CookieService,
		private utilityService: UtilityService
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.selectedMenuArticle$ = this.courseMaterialMenuStateFacade.selectedMenuArticle$;
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{
		setTimeout(() =>
		{
			this.selectedMenuArticle$
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(_selectedMenu =>
				{
					this._selectedMenu = _selectedMenu;
					this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this._selectedMenu.courseMaterialId);
					this.courseMaterialQuiz$ = this.courseMaterialQuizStateFacade.allCourseMaterialQuizByArticleId$(this._selectedMenu.articleId);
					this.hasData$ = this.courseMaterialQuizStateFacade.courseMaterialArticleHasQuizData$(this._selectedMenu.articleId);
					
					// if no data available ... make a api request, else work with store data
					this.hasData$
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(
							hasData =>
							{
								if (!hasData)
								{
									this.getCourseMaterialQuiz();
								}
							}
					);
					this.courseMaterialQuiz$
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(
							data =>
							{
								//
							}
					);
							
					this.courseMaterialQuiz$
				}
			);
			
			// Track crud operation status
			this.trackCrudOperationStatus();
		}, 0);

	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions crud text document component
	 */
	async getCourseMaterialQuiz()
	{
		const model: CourseMaterialQuizModel = {
			articleId: this._selectedMenu.articleId
		};

		this.translateService
			.get('loading.wait')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		this.courseMaterialQuizStateFacade.requestCourseMaterialQuiz(model);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Inits loading
	 */
	private initLoading()
	{
		const loading = this.loading;

		// present loader
		this.translateService
			.get(loading)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});
	}

	/**
	 * Opens crud model
	 */
	private async openCrudModel()
	{
		// open modal
		const modal = await this.modalController.create({
			component: CrudQuizQuestionComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
			componentProps: {
				//
			}
		});

		// on model dismiss
		modal.onDidDismiss().then((data) =>
		{
			//
		});

		// present modal
		await modal.present();
	}

	/**
	 * Tracks crud operation status
	 */
	private trackCrudOperationStatus()
	 {
		 this.courseMaterialQuizStateFacade
			 .courseMaterialQuizCurdOperationStatus$
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(async (operationsStatus: OperationsEnum) =>
			 {
 
				 // track operation status and  
				 switch (operationsStatus)
				 {
					case OperationsEnum.CREATE:
						this.openCrudModel();
						break;
					 case OperationsEnum.EDIT:
						 this.openCrudModel();
						 break;
					 case OperationsEnum.DELETE:
						 this.openCrudModel();
						 break;
					 default:
						 break;
				 }
			 });
	}
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions crud assignment quiz component
	 */
	public addNewQuestion()
	{
		// build data
		const model: CourseMaterialQuizModel = {
			articleId: this._selectedMenu.articleId,
			courseMaterialId: this._selectedMenu.courseMaterialId,
			quizType: QuizTypeEnum.MCQ,
			questionId: '',
			question: '',
			options: [],
			operationType: OperationsEnum.CREATE
		};

		this.courseMaterialQuizStateFacade.actUponCourseMaterialQuiz(model, OperationsEnum.CREATE);
	}

	/**
	 * Determines whether course material quiz action on
	 * @param selectedCourseMaterialQuizModel 
	 * @param operation 
	 * @returns  
	 */
	public onCourseMaterialQuizAction(selectedCourseMaterialQuizModel: CourseMaterialQuizModel, operation: OperationsEnum)
	 {
		 // add operation to the object
		 const model: CourseMaterialQuizModel = {
			 ...selectedCourseMaterialQuizModel,
			 operationType: operation
		 };
		
		// act upon operation
		return selectedCourseMaterialQuizModel ? this.courseMaterialQuizStateFacade.actUponCourseMaterialQuiz(model, operation) : undefined;
	}
	
	/**
	 * Determines whether course material quiz copy action on
	 * @param selectedCourseMaterialQuizModel 
	 * @param operation 
	 */
	public onCourseMaterialQuizCopyAction(selectedCourseMaterialQuizModel: CourseMaterialQuizModel)
	{
		// add operation to the object
		const model: CourseMaterialQuizModel = {
			...selectedCourseMaterialQuizModel,
			questionId: '',
			operationType: OperationsEnum.CREATE
		};
	   
	   // act upon operation
	   this.courseMaterialQuizStateFacade.actUponCourseMaterialQuiz(model, OperationsEnum.CREATE);
   }
}
