/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud text document component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:20:54 
 * Last modified  : 2022-07-06 17:46:26
 */

import { DOCUMENT } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef, Injector, Inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ArticleTextDocumentModel } from "src/app/shared/model/article-text-document.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { ArticleTextDocumentStateFacade } from "src/app/state/article-text-document/article-text-document.state.facade";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
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
	  * @description										|
	  * @input & @output Instance variable								|
	  * -------------------------------------------------|
	  */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
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
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable								|
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
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade
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
					this.articleTextDocument$ = this.articleTextDocumentStateFacade.articleTextDocumentByArticleId$(this._selectedMenu.articleId);
					this.articleTextDocument$
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(articleTextDocumentModel =>
						{
							if (!articleTextDocumentModel)
							{
								console.log("no content", articleTextDocumentModel);
								(this.editableTextDocument.nativeElement as HTMLCanvasElement).innerHTML = '';
								this.getArticleTextDocument();

								//
								this._operationType = OperationsEnum.CREATE;
								this._showSave = false;
							}
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
	 * Triggers command
	 * @param command 
	 * @returns  
	 */
	triggerCommand(command: string)
	{
		console.log(this.doc.getSelection());
		const commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
		if (commands.includes(command))
		{
			this.doc.execCommand('formatBlock', false, command);
			return;
		}
		this.doc.execCommand(command, false, null);
	}

	/**
	 * Inserts url
	 */
	insertUrl()
	{
		this.saveSelection();
		this.translateService
			.get([
				'actionAlert.link',
				'option.done',
				'option.cancel',
			]).pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{

				const alert = await this.alertController.create({
					header: `${data['actionAlert.link']}`,
					mode: 'md',
					inputs: [
						{
							name: 'url',
							type: 'text'
						}
					],
					buttons: [
						{
							cssClass: 'ok-button ',
							text: data['option.done'],
							handler: (data) =>
							{
								const range = this.restoreSelection();
								if (range)
								{
									const range = this.doc.getSelection().getRangeAt(0);
									const line = range.commonAncestorContainer.data;
									const startOffset = range.startOffset;
									const endOffset = range.endOffset;
									let result = line.slice(startOffset, endOffset);
									const innerHTML = `<a href=${data.url}>${result}</a>`;
									this.doc.execCommand('insertHTML', false, innerHTML);
								}
							}
						},
						{
							cssClass: 'cancel-button',
							text: data['option.cancel'],
							handler: () =>
							{
							}
						}
					]
				});
				await alert.present();
			});
	}


	insertImage()
	{
		//
	}

	/**
	 * save selection when the editor is focussed out
	 */
	public saveSelection()
	{
		if (this.doc.getSelection)
		{
			const sel = this.doc.getSelection();
			if (sel.getRangeAt && sel.rangeCount)
			{
				this._savedSelection = sel.getRangeAt(0);
				this._selectedText = sel.toString();
			}
		} else if (this.doc.getSelection && this.doc.createRange)
		{
			this._savedSelection = document.createRange();
		} else
		{
			this._savedSelection = null;
		}
	}

	/**
	 * restore selection when the editor is focused in
	 */
	public restoreSelection()
	{
		if (this._savedSelection)
		{
			if (this.doc.getSelection)
			{
				const sel = this.doc.getSelection();
				sel.removeAllRanges();
				sel.addRange(this._savedSelection);
				return true;
			} else if (this.doc.getSelection /*&& this._savedSelection.select*/)
			{
				// this._savedSelection.select();
				return true;
			}
		} else
		{
			return false;
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
