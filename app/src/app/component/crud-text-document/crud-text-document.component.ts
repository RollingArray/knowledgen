/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud text document component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:20:54 
 * Last modified  : 2022-07-19 15:53:29
 */

import { DOCUMENT } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef, Injector, Inject, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ArticleStatusTypeEnum } from "src/app/shared/enum/article-status-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ArticleTextDocumentModel } from "src/app/shared/model/article-text-document.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { ArticleTextDocumentStateFacade } from "src/app/state/article-text-document/article-text-document.state.facade";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'crud-text-document',
	templateUrl: './crud-text-document.component.html',
	styleUrls: ['./crud-text-document.component.scss'],
})
export class CrudTextDocumentComponent extends BaseFormComponent implements OnInit
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
	  * @description									 |
	  * @input & @output Instance variable				 |
	  * -------------------------------------------------|
	  */
	
	/**
	 * Description  of crud text document component
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
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	public selectedMenuArticle$: Observable<MenuSelectModel>;
	/**
	 * Description  of crud text document component
	 */
	public articleTextDocument$!: Observable<ArticleTextDocumentModel>;

	/**
	 * Course material$ of crud text document component
	 */
	courseMaterial$!: Observable<CourseMaterialModel>;

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
		private articleTextDocumentStateFacade: ArticleTextDocumentStateFacade,
		private rootStateFacade: RootStateFacade,
		@Inject(DOCUMENT) private doc: any,
		private sanitizer: DomSanitizer,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private cookieService: CookieService
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
					this.articleTextDocument$ = this.articleTextDocumentStateFacade.articleTextDocumentByArticleId$(this._selectedMenu.articleId);
					this.articleTextDocument$
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(articleTextDocumentModel =>
						{
							// if no object, consider creating new
							if (!articleTextDocumentModel)
							{
								(this.editableTextDocument.nativeElement as HTMLCanvasElement).innerHTML = '';
								this.getArticleTextDocument();

								//
								this._operationType = OperationsEnum.CREATE;
								this._showSave = false;
							}

							// if not material owner ans article is not live
							else if (!this.isMaterialOwner && articleTextDocumentModel.articleStatus === ArticleStatusTypeEnum.PREVIEW)
							{
								(this.editableTextDocument.nativeElement as HTMLCanvasElement).innerHTML = '';
							}
							
							// show content, consider edit
							else
							{
								(this.editableTextDocument.nativeElement as HTMLCanvasElement).contentEditable = "false";
								(this.editableTextDocument.nativeElement as HTMLCanvasElement).innerHTML = articleTextDocumentModel.articleTextDocumentContent;
								
								//
								this._operationType = OperationsEnum.EDIT;
								this._showSave = false;
							}
						}
						)
				}
				);
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
	async getArticleTextDocument()
	{
		const articleTextDocumentModel: ArticleTextDocumentModel = {
			articleId: this._selectedMenu.articleId
		};

		this.translateService
			.get('loading.wait')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		this.articleTextDocumentStateFacade.requestArticleTextDocument(articleTextDocumentModel);
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass()
	{
		// build data
		const model: ArticleTextDocumentModel = {
			articleId: this._selectedMenu.articleId,
			courseMaterialId: this._selectedMenu.courseMaterialId,
			articleTextDocumentContent: (this.editableTextDocument.nativeElement as HTMLCanvasElement).innerHTML,
			operationType: this._operationType
		};

		return model;
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
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion()
	{
		this.articleTextDocumentStateFacade
			.articleTextDocumentCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{

				switch (operationsStatus)
				{
					case OperationsEnum.SUCCESS:

						const response = this.response;

						// show tost
						this.translateService
							.get(response)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{

								// success response
								this.toastService.presentToast(
									data
								);
							});

						break;

					default:
						break;
				}
			});
	}

	/**
	 * Launchs operation
	 */
	private launchOperation()
	{

		const articleTextDocumentModel: ArticleTextDocumentModel = this.buildDataModelToPass();

		switch (this._operationType)
		{
			case OperationsEnum.CREATE:
				this.articleTextDocumentStateFacade.addNewArticleTextDocument(articleTextDocumentModel);
				break;
			case OperationsEnum.EDIT:
				this.articleTextDocumentStateFacade.editArticleTextDocument(articleTextDocumentModel);
				break;
			default:
				break;
		}
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Submits create edit project component
	 */
	async submit()
	{
		if ((this.editableTextDocument.nativeElement as HTMLCanvasElement).innerHTML === '')
		{
			this.translateService
				.get([
					'errorMessage.notAllowed',
					'errorMessage.mandatory'
				])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) =>
				{
					this.alertService.presentAlert(
						data['errorMessage.notAllowed'],
						data['errorMessage.mandatory'],
						data['button.ok'],
					);
				});
		} else
		{
			this.initLoading();
			this.launchOperation();
			this.crudOperationCompletion();
		}
	}

	/**
	 * Adds new content
	 */
	public addNewContent()
	{
		const editableTextDocument = this.editableTextDocument.nativeElement as HTMLCanvasElement;
		editableTextDocument.contentEditable = "true";
		this.translateService
			.get([
				'formInfo.yourContent',
			]).pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{
				editableTextDocument.innerHTML = data['formInfo.yourContent'];

			});
		this._showSave = true;
		this._operationType = OperationsEnum.CREATE;
	}

	/**
	 * Edits content
	 */
	public editContent()
	{
		const editableTextDocument = this.editableTextDocument.nativeElement as HTMLCanvasElement;
		editableTextDocument.contentEditable = "true";
		this._showSave = true;
		this._operationType = OperationsEnum.EDIT;
	}
}
