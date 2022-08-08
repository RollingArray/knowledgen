/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Html content toolbar component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 11:33:29 
 * Last modified  : 2022-08-08 13:19:59
 */

import { DOCUMENT } from "@angular/common";
import { Component, OnInit, Input, Injector, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialFileModel } from "src/app/shared/model/course-material-fle.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { BaseViewComponent } from "../base/base-view.component";
import { ContentImageComponent } from "../content-image/content-image.component";

@Component({
	selector: 'html-content-toolbar',
	templateUrl: './html-content-toolbar.component.html',
	styleUrls: ['./html-content-toolbar.component.scss'],
})
export class HtmlContentToolbarComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */


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
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable								|
	 * -------------------------------------------------|
	 */

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
	 * Creates an instance of html content toolbar component.
	 * @param injector 
	 * @param translateService 
	 * @param courseMaterialMenuStateFacade 
	 */
	constructor(
		injector: Injector,
		@Inject(DOCUMENT) private doc: any,
		private translateService: TranslateService,
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
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Triggers command
	 * @param command 
	 * @returns  
	 */
	triggerCommand(command: string)
	{
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

	/**
	 * Inserts image
	 */
	async insertImage()
	{
		this.saveSelection();

		// initial file object state
		const courseMaterialFileModel: CourseMaterialFileModel = {
			articleId: this._selectedMenu.articleId,
			courseMaterialId: this._selectedMenu.courseMaterialId,
			operationType: OperationsEnum.CREATE
		}

		// open modal
		const modal = await this.modalController.create({
			component: ContentImageComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
			componentProps: {
				courseMaterialFile: courseMaterialFileModel
			}
		});

		// on model dismiss
		modal.onDidDismiss().then((data) =>
		{
			this._modalData = data.data;
			if (this._modalData.cancelled)
			{
				//do not refresh the page
			} else
			{
				this.restoreSelection();
				const courseMaterialFileModel: CourseMaterialFileModel = {
					...this._modalData.returnData
				}


				const filePath = `${ApiUrls.FILE}${courseMaterialFileModel.fileName}/${courseMaterialFileModel.extension}`
				this.doc.execCommand('insertImage', false, filePath);
			}
		});

		// present modal
		await modal.present();
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
}
