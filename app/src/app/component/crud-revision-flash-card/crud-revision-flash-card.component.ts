/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud revision flash card component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-01 18:19:03 
 * Last modified  : 2022-09-01 18:20:14
 */

import { DOCUMENT } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef, Injector, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { MediaTypeEnum } from "src/app/shared/enum/media-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { QuizTypeEnum } from "src/app/shared/enum/quiz-type.enum";
import { CourseMaterialFlashCardModel } from "src/app/shared/model/course-material-flash-card.model";
import { CourseMaterialFileModel } from "src/app/shared/model/course-material-fle.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { UtilityService } from "src/app/shared/service/utility.service";
import { CourseMaterialFlashCardStateFacade } from "src/app/state/course-material-flash-card/course-material-flash-card.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { ContentAudioComponent } from "../content-audio/content-audio.component";
import { ContentImageComponent } from "../content-image/content-image.component";



@Component({
	selector: 'crud-revision-flash-card',
	templateUrl: './crud-revision-flash-card.component.html',
	styleUrls: ['./crud-revision-flash-card.component.scss'],
})
export class CrudRevisionFlashCardComponent extends BaseFormComponent implements OnInit
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
	 * Regex  of crud course material component
	 */
	readonly regex = Regex;

	/**
	 * String key of crud course material component
	 */
	readonly stringKey = StringKey;

	/**
	 * Api urls of crud course material component
	 */
	readonly apiUrls = ApiUrls;

	/**
	 * Quiz type enum of crud quiz question component
	 */
	readonly quizTypeEnum = QuizTypeEnum;

	/**
	 * Operations enum of crud quiz question component
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	 * Media type enum of crud revision flash card component
	 */
	readonly mediaTypeEnum = MediaTypeEnum;

	/**
	 * Audio type of crud revision flash card component
	 */
	readonly audioType = "audio/mpeg";

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud course material component
	 */
	private _courseMaterialFlashCard!: CourseMaterialFlashCardModel;

	/**
	 * Course material quiz answers of crud quiz question component
	 */
	private _courseMaterialFlashCardAnswers: CourseMaterialFlashCardModel[] = [];

	/**
	 * Front media of crud revision flash card component
	 */
	private _frontMedia: string;

	/**
	 * Front media type of crud revision flash card component
	 */
	private _frontMediaType: MediaTypeEnum;

	/**
	 * Back media of crud revision flash card component
	 */
	private _backMedia: string;

	/**
	 * Back media type of crud revision flash card component
	 */
	private _backMediaType: MediaTypeEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud revision flash card component
	 */
	public modalLoadingIndicatorStatus$: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Gets page title
	 */
	public get pageTitle()
	{

		let title = '';
		if (this._courseMaterialFlashCard.operationType === OperationsEnum.CREATE)
		{
			title = 'pageTitle.addFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.EDIT)
		{
			title = 'pageTitle.editFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.DELETE)
		{
			title = 'pageTitle.deleteFlashCard';
		}

		return title;
	}

	/**
	 * Gets page sub title
	 */
	public get pageSubTitle()
	{

		let title = '';
		if (this._courseMaterialFlashCard.operationType === OperationsEnum.CREATE)
		{
			title = 'pageSubTitle.addFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.EDIT)
		{
			title = 'pageSubTitle.editFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.DELETE)
		{
			title = 'pageSubTitle.deleteFlashCard';
		}

		return title;
	}

	/**
	 * @description Gets loading
	 */
	public get loading()
	{
		let loading = '';
		if (this._courseMaterialFlashCard.operationType === OperationsEnum.CREATE)
		{
			loading = 'loading.newFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.EDIT)
		{
			loading = 'loading.editFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.DELETE)
		{
			loading = 'loading.deleteFlashCard';
		}

		return loading;
	}

	/**
	 * @description Gets response
	 */
	public get response()
	{
		let response = '';
		if (this._courseMaterialFlashCard.operationType === OperationsEnum.CREATE)
		{
			response = 'response.newFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.EDIT)
		{
			response = 'response.editFlashCard';
		}
		else if (this._courseMaterialFlashCard.operationType === OperationsEnum.DELETE)
		{
			response = 'response.deleteFlashCard';
		}

		return response;
	}


	/**
	 * Gets whether is operation delete
	 */
	public get isOperationDelete()
	{
		return this._courseMaterialFlashCard.operationType === OperationsEnum.DELETE ? true : false;
	}

	/**
	 * Gets course material quiz answers
	 */
	public get courseMaterialFlashCardAnswers()
	{
		return this._courseMaterialFlashCardAnswers;
	}

	/**
	 * Gets course material quiz
	 */
	public get courseMaterialFlashCard()
	{
		return this._courseMaterialFlashCard;
	}

	/**
	 * Gets course material name
	 */
	get frontContent()
	{
		return this.formGroup.get('frontContent');
	}

	/**
	 * Gets front media
	 */
	get frontMedia()
	{
		return `${this.apiUrls.FILE}${this._frontMedia}`;
	}

	/**
	 * Gets front media type
	 */
	get frontMediaType()
	{
		return this._frontMediaType;
	}

	/**
	 * Gets course material description
	 */
	get backContent()
	{
		return this.formGroup.get('backContent');
	}

	/**
	 * Gets back media
	 */
	get backMedia()
	{
		return `${this.apiUrls.FILE}${this._backMedia}`;
	}

	/**
	 * Gets back media type
	 */
	get backMediaType()
	{
		return this._backMediaType;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud text document component
	 */
	@ViewChild('questionDocument') questionDocument: ElementRef;

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
	 * @param courseMaterialFlashCardStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private courseMaterialFlashCardStateFacade: CourseMaterialFlashCardStateFacade,
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);

		// check status of modal indicator status
		this.modalLoadingIndicatorStatus$ = this.rootStateFacade.modalLoadingIndicatorStatus$;
		
		// get act upon curd model from store
		this.courseMaterialFlashCardStateFacade.operationCourseMaterialFlashCard$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data => this._courseMaterialFlashCard = data
			);

		// build form
		this.buildFrom();

		//if the operation is delete, submit the data
		if (this._courseMaterialFlashCard.operationType === OperationsEnum.DELETE)
		{
			this.checkIfWantToDelete();
		}


	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Sets passed value to from
	 */
	private setPassedValueToFrom()
	{
		const form = this.formGroup.value;

		form.frontContent = this._courseMaterialFlashCard.frontContent;
		form.backContent = this._courseMaterialFlashCard.backContent;
		form.backContentMore = this._courseMaterialFlashCard.backContentMore;
	}

	/**
	 * Builds from
	 */
	private buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			frontContent: [
				this._courseMaterialFlashCard.frontContent,
				this.validators().compose([
					// tslint:disable:no-unbound-method 
					this.validators().required
				]),
			],
			backContent: [
				this._courseMaterialFlashCard.backContent,
				this.validators().compose([
					// tslint:disable:no-unbound-method 
					this.validators().required
				]),
			],
			backContentMore: [
				this._courseMaterialFlashCard.backContentMore,
			],
		});

		this._frontMedia = this._courseMaterialFlashCard.frontMedia;
		this._frontMediaType = this._courseMaterialFlashCard.frontMediaType;
		this._backMedia = this._courseMaterialFlashCard.backMedia;
		this._backMediaType = this._courseMaterialFlashCard.backMediaType;

		console.log(this._frontMedia);

		this.setPassedValueToFrom();
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass()
	{
		// build data
		const form = this.formGroup.value;
		const model: CourseMaterialFlashCardModel = {
			...this._courseMaterialFlashCard,
			frontMediaType: this._frontMediaType,
			frontMedia: this._frontMedia,
			frontContent: form.frontContent,
			backMediaType: this._backMediaType,
			backMedia: this._backMedia,
			backContent: form.backContent,
			backContentMore: form.backContentMore,
		};

		return model;
	}

	/**
	 * Checks if want to delete
	 * @param selectedCourseMaterialModel 
	 */
	 private checkIfWantToDelete()
	 {
		 this.translateService
			 .get([
				 'actionAlert.confirm',
				 'actionAlert.delete',
				 'option.yes',
				 'option.no',
			 ]).pipe(takeUntil(this.unsubscribe))
			 .subscribe(async data =>
			 {
 
				 const alert = await this.alertController.create({
					 header: `${data['actionAlert.confirm']}`,
					 subHeader: data['actionAlert.delete'],
					 cssClass: 'custom-alert',
					 mode: 'md',
					 buttons: [
						 {
							 cssClass: 'ok-button ',
							 text: data['option.yes'],
							 handler: (_) => this.submit()
						 },
						 {
							 cssClass: 'cancel-button',
							 text: data['option.no'],
							 handler: () => this.closeModal()
						 }
					 ]
				 });
				 await alert.present();
			 });
 
	 }

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion()
	{
		this.courseMaterialFlashCardStateFacade
			.courseMaterialFlashCardCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{

				switch (operationsStatus)
				{
					case OperationsEnum.SUCCESS:

						// remove loading indicator
						this.rootStateFacade.stopModalLoading();
						
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

						// dismiss modal
						this.closeModal();

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

		const courseMaterialFlashCardModel: CourseMaterialFlashCardModel = this.buildDataModelToPass();
		
		switch (this._courseMaterialFlashCard.operationType)
		{
			case OperationsEnum.CREATE:
				this.courseMaterialFlashCardStateFacade.addNewCourseMaterialFlashCard(courseMaterialFlashCardModel);
				break;
			case OperationsEnum.EDIT:
				this.courseMaterialFlashCardStateFacade.editCourseMaterialFlashCard(courseMaterialFlashCardModel);
				break;
			case OperationsEnum.DELETE:
				this.courseMaterialFlashCardStateFacade.deleteCourseMaterialFlashCard(courseMaterialFlashCardModel);
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
		if (this.formGroup.invalid)
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
			this.rootStateFacade.startModalLoading();
			this.launchOperation();
			this.crudOperationCompletion();
		}
	}

	/**
	 * Closes modal
	 */
	public closeModal()
	{
		// discard active crud operation
		const model: CourseMaterialFlashCardModel = {};
		this.courseMaterialFlashCardStateFacade.actUponCourseMaterialFlashCard(model, OperationsEnum.NONE);

		// dismiss modal view
		setTimeout(() =>
		{
			this.modalController.dismiss();
		}, 10);
	}

	/**
	 * Inserts image
	 */
	async insertImage(side: string)
	{
		// initial file object state
		const courseMaterialFileModel: CourseMaterialFileModel = {
			articleId: this._courseMaterialFlashCard.articleId,
			courseMaterialId: this._courseMaterialFlashCard.courseMaterialId,
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
			const modalData: ModalData = data.data;
			if (modalData.cancelled)
			{
				//do not refresh the page
			} else
			{
				const courseMaterialFileModel: CourseMaterialFileModel = {
					...modalData.returnData
				}


				const filePath = `${courseMaterialFileModel.fileName}.${courseMaterialFileModel.extension}`;

				switch (side)
				{
					case 'front':
						{
							this._frontMedia = filePath;
							this._frontMediaType = MediaTypeEnum.IMAGE;
							break;
						}

					case 'back':
						{
							this._backMedia = filePath;
							this._backMediaType = MediaTypeEnum.IMAGE;
						}

						break;

					default:
						break;
				}
			}
		});

		// present modal
		await modal.present();
	}

	/**
	 * Inserts image
	 */
	async insertAudio(side: string)
	{
		// initial file object state
		const courseMaterialFileModel: CourseMaterialFileModel = {
			articleId: this._courseMaterialFlashCard.articleId,
			courseMaterialId: this._courseMaterialFlashCard.courseMaterialId,
			operationType: OperationsEnum.CREATE
		}

		// open modal
		const modal = await this.modalController.create({
			component: ContentAudioComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
			componentProps: {
				courseMaterialFile: courseMaterialFileModel
			}
		});

		// on model dismiss
		modal.onDidDismiss().then((data) =>
		{
			const modalData: ModalData = data.data;
			if (modalData.cancelled)
			{
				//do not refresh the page
			} else
			{
				const courseMaterialFileModel: CourseMaterialFileModel = {
					...modalData.returnData
				}


				const filePath = `${courseMaterialFileModel.fileName}.${courseMaterialFileModel.extension}`;

				switch (side)
				{
					case 'front':
						{
							this._frontMedia = filePath;
							this._frontMediaType = MediaTypeEnum.AUDIO;
							break;
						}

					case 'back':
						{
							this._backMedia = filePath;
							this._backMediaType = MediaTypeEnum.AUDIO;
						}

						break;

					default:
						break;
				}
			}
		});

		// present modal
		await modal.present();
	}

	/**
	 * Inserts image
	 */
	async onRemoveMedia(side: string)
	{
		switch (side)
		{
			case 'front':
				{
					this._frontMedia = '';
					this._frontMediaType = MediaTypeEnum.NONE;
					break;
				}

			case 'back':
				{
					this._backMedia = '';
					this._backMediaType = MediaTypeEnum.NONE;
				}

				break;

			default:
				break;
		}
	}
}
