/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud flash card component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-01 18:16:20 
 * Last modified  : 2022-09-07 21:04:57
 */

import { DOCUMENT } from "@angular/common";
import { Component, OnInit, Input, ElementRef, ViewChild, Injector, Renderer2, ChangeDetectorRef, Inject } from "@angular/core";
import { IonContent } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { FlashCardActionEnum } from "src/app/shared/enum/flash-card-action.enum";
import { MediaTypeEnum } from "src/app/shared/enum/media-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ResultTypeEnum } from "src/app/shared/enum/retust-type.enum";
import { CourseMaterialAssignmentResultModel } from "src/app/shared/model/course-material-assignment-result.model";
import { CourseMaterialFlashCardModel } from "src/app/shared/model/course-material-flash-card.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { FlashCardAssignmentTimeModel } from "src/app/shared/model/flash-card-assignment-time.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { StatisticsService } from "src/app/shared/service/statistics.service";
import { CourseMaterialAssignmentStateFacade } from "src/app/state/course-material-assignment/course-material-assignment.state.facade";
import { CourseMaterialFlashCardStateFacade } from "src/app/state/course-material-flash-card/course-material-flash-card.state.facade";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { CrudCourseMaterialAssignmentResultComponent } from "../crud-course-material-assignment-result/crud-course-material-assignment-result.component";
import { CrudRevisionFlashCardComponent } from "../crud-revision-flash-card/crud-revision-flash-card.component";

@Component({
	selector: 'crud-flash-card',
	templateUrl: './crud-flash-card.component.html',
	styleUrls: ['./crud-flash-card.component.scss']
})
export class CrudFlashCardComponent extends BaseFormComponent implements OnInit
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
	 * Course material type id enum of crud assignment quiz component
	 */
	readonly courseMaterialTypeIdEnum = CourseMaterialTypeIdEnum;

	/**
	 * Media type enum of crud flash card component
	 */
	readonly mediaTypeEnum = MediaTypeEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud assignment quiz component
	 */
	@Input() isContentLive = false;

	/**
	 * Input  of crud assignment quiz component
	 */
	@Input() articleCompletionReward = '';

	/**
	 * Input  of crud assignment quiz component
	 */
	@Input() public articleView: IonContent;

	/**
	 * Input  of crud assignment quiz component
	 */
	@Input() public articleTitleView: ElementRef;

	/**
	 * Input  of crud assignment quiz component
	 */
	@Input() public assignmentPropertiesView: ElementRef;

	
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
	 * Course material quiz of crud assignment quiz component
	 */
	private _courseMaterialFlashCard: CourseMaterialFlashCardModel[] = [];

	/**
	 * Submitted answer of crud assignment quiz component
	 */
	private _submittedAnswer = false;

	/**
	 * Total score of crud assignment quiz component
	 */
	private _totalScore = 0;

	/**
	 * Quiz session initiated of crud assignment quiz component
	 */
	private _assignmentSessionInitiated = false;

	/**
	 * Quiz session submitted of crud assignment quiz component
	 */
	private _assignmentSessionSubmitted = false;

	/**
	 * Assignment time of crud assignment quiz component
	 */
	private _assignmentTime: string;

	/**
	 * Best active recall time of crud flash card component
	 */
	private _bestActiveRecallTime: number;

	/**
	 * Selected card of crud flash card component
	 */
	private _selectedCard: CourseMaterialFlashCardModel;

	/**
	 * Card index of crud flash card component
	 */
	private _cardIndex = 0;

	/**
	 * Reset flash card of crud flash card component
	 */
	private _resetFlashCard = true;

	/**
	 * Flash card action of crud flash card component
	 */
	private _flashCardAction: FlashCardActionEnum;

	/**
	 * Flash card assignment time of crud flash card component
	 */
	private _flashCardAssignmentTime: FlashCardAssignmentTimeModel[] = [];

	/**
	 * Card flipped of crud flash card component
	 */
	private _cardFlipped = false;

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
	public courseMaterialFlashCard$!: Observable<CourseMaterialFlashCardModel[]>;

	/**
	 * Course material$ of crud text document component
	 */
	public courseMaterial$!: Observable<CourseMaterialModel>;

	/**
	 * Determines whether data has
	 */
	public hasData$!: Observable<boolean>;

	/**
	 * Loading indicator status$ of crud flash card component
	 */
	public loadingIndicatorStatus$: Observable<boolean>


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud text document component
	 */
	//@ViewChild('frontCard') frontCard: ElementRef;

	/**
	 * View child of crud text document component
	 */
	@ViewChild('contentTopScrollView') contentTopScrollView: ElementRef;
	
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
		this.courseMaterial$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data =>
			{

				if (data && data.userId)
				{
					const loggedInUser = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_ID);
					isMaterialOwner = loggedInUser === data.userId ? true : false
				}
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
	 * Gets course material quiz
	 */
	get courseMaterialFlashCard()
	{
		return this._courseMaterialFlashCard;
	}

	/**
	 * Gets submitted answer
	 */
	get submittedAnswer()
	{
		return this._submittedAnswer;
	}

	/**
	 * Gets total score
	 */
	get totalScore()
	{
		return this._totalScore;
	}

	/**
	 * Gets quiz session initiated
	 */
	get assignmentSessionInitiated()
	{
		return this._assignmentSessionInitiated;
	}

	/**
	 * Gets quiz session submitted
	 */
	get assignmentSessionSubmitted()
	{
		return this._assignmentSessionSubmitted;
	}

	get assignmentTime()
	{
		return this._assignmentTime;
	}

	/**
	 * Gets selected card
	 */
	get selectedCard()
	{
		return this._selectedCard;
	}

	/**
	 * Gets card index
	 */
	get cardIndex()
	{
		return this._cardIndex;
	}

	get resetFlashCard()
	{
		return this._resetFlashCard;
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
		private translateService: TranslateService,
		private rootStateFacade: RootStateFacade,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private courseMaterialFlashCardStateFacade: CourseMaterialFlashCardStateFacade,
		private courseMaterialAssignmentStateFacade: CourseMaterialAssignmentStateFacade,
		private cookieService: CookieService,
		@Inject(DOCUMENT) document: Document,
		private statisticsService: StatisticsService
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.loadingIndicatorStatus$ = this.rootStateFacade.loadingIndicatorStatus$;
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
					this._assignmentSessionInitiated = false;
					this._assignmentSessionSubmitted = false;
					this._selectedMenu = _selectedMenu;
					this.courseMaterial$ = this.courseMaterialStateFacade.courseMaterialByCourseMaterialId$(this._selectedMenu.courseMaterialId);
					this.courseMaterialFlashCard$ = this.courseMaterialFlashCardStateFacade.allCourseMaterialFlashCardByArticleId$(this._selectedMenu.articleId);
					this.hasData$ = this.courseMaterialFlashCardStateFacade.courseMaterialArticleHasQuizData$(this._selectedMenu.articleId);

					// if no data available ... make a api request, else work with store data
					this.hasData$
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(
							hasData =>
							{
								// if no data, get data from network
								if (!hasData)
								{
									this.getCourseMaterialFlashCard();
								}

								// get first card
								else
								{
									this.getSelectedCard();

									// add all flash cards to track time
									this.addFlashCardsToTrackTime();
									
									// track card time
									this.trackCardSpendTime(OperationsEnum.START);
								}
							}
						);
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
	 * Descriptions crud flash card component
	 */
	private getSelectedCard()
	{
		
		this._selectedCard = null;
		 this.courseMaterialFlashCard$
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(
				 data =>
				 {
					 this._courseMaterialFlashCard = data;
					 // initiate first card
					 this._selectedCard = data[this._cardIndex];
					 this._flashCardAction = FlashCardActionEnum.RIGHT;
				 }
			 );
	 }

	/**
	 * Adds flash cards to track time
	 */
	private addFlashCardsToTrackTime()
	{
		this._flashCardAssignmentTime = [];
		this.courseMaterialFlashCard$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				flashCards =>
				{
					flashCards.map(eachFlashCard =>
						{
							const flashCardAssignmentTimeModel: FlashCardAssignmentTimeModel = {
								cardId: eachFlashCard.cardId,
								startTime: 0,
								endTime: 0,
								spendTime: 0
							};
				
							this._flashCardAssignmentTime = [
								...this._flashCardAssignmentTime,
								flashCardAssignmentTimeModel
							];
						});
				});
		
	}

	/**
	 * Tracks card spend time
	 * @param cardOperation 
	 */
	private trackCardSpendTime(cardOperation: OperationsEnum)
	{
		let spendTime: number[] = [];
		this._flashCardAssignmentTime.filter(eachFlashCard =>
		{
			if (eachFlashCard.cardId === this._selectedCard.cardId)
			{
				if (cardOperation === OperationsEnum.START)
				{
					eachFlashCard.startTime = new Date().valueOf() / 1000 // get seconds
				}
				else if (cardOperation === OperationsEnum.END)
				{
					const endTime = new Date().valueOf() / 1000; // get seconds
					const spendTime = endTime - eachFlashCard.startTime;
					eachFlashCard.endTime = endTime;
					eachFlashCard.spendTime = spendTime;
				}	
			}
			spendTime = [
				...spendTime,
				eachFlashCard.spendTime
			]
		});

		
		// return best active recall time
		this._bestActiveRecallTime =  Math.round(this.statisticsService.median(spendTime));
	}

	/**
	 * Descriptions crud text document component
	 */
	async getCourseMaterialFlashCard()
	{
		const model: CourseMaterialFlashCardModel = {
			articleId: this._selectedMenu.articleId
		};

		this.rootStateFacade.startLoading('');

		this.courseMaterialFlashCardStateFacade.requestCourseMaterialFlashCard(model);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Opens crud model
	 */
	private async openCrudModel()
	{
		// open modal
		const modal = await this.modalController.create({
			component: CrudRevisionFlashCardComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
			componentProps: {
				//
			}
		});

		// on model dismiss
		modal.onDidDismiss().then((data) =>
		{
			switch (this._operationType)
				{
					case OperationsEnum.CREATE:
						//this.openCrudModel();
						break;
					case OperationsEnum.EDIT:
						//this.openCrudModel();
						break;
					case OperationsEnum.DELETE:
						this.resetCard();
						break;
					default:
						break;
				}
		});

		// present modal
		await modal.present();
	}

	/**
	 * Tracks crud operation status
	 */
	private trackCrudOperationStatus()
	{
		this.courseMaterialFlashCardStateFacade
			.courseMaterialFlashCardCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{

				// track operation status and  
				switch (operationsStatus)
				{
					case OperationsEnum.CREATE:
						this._operationType = OperationsEnum.CREATE;
						this.openCrudModel();
						break;
					case OperationsEnum.EDIT:
						this._operationType = OperationsEnum.EDIT;
						this.openCrudModel();
						break;
					case OperationsEnum.DELETE:
						this._operationType = OperationsEnum.DELETE;
						this.openCrudModel();
						break;
					default:
						break;
				}
			});
	}

	/**
	 * Adds new assignment result
	 */
	public async addNewAssignmentResult()
	{
		const courseMaterialAssignmentResultModel: CourseMaterialAssignmentResultModel = {
			articleId: this._selectedMenu.articleId,
			articleAssignmentCompletionTime: this._assignmentTime,
			articleAssignmentCompletionReward: 0,
			articleAssignmentTotalNoOfQuestions: this._courseMaterialFlashCard.length,
			articleAssignmentTotalNoOfCorrectAnswers: this._bestActiveRecallTime,
			operationType: OperationsEnum.CREATE
		}

		this.courseMaterialAssignmentStateFacade.actUponCourseMaterialAssignment(courseMaterialAssignmentResultModel, OperationsEnum.CREATE);
	}

	/**
	 * Opens crud assignment result 
	 */
	private async openCrudAssignmentResult()
	{
		const modal = await this.modalController.create({
			component: CrudCourseMaterialAssignmentResultComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
			componentProps: {
				resultType: ResultTypeEnum.TIME
			}
		});

		// present modal
		await modal.present();
	}

	/**
	 * Scrolls to article content
	 */
	 private scrollToArticleContent()
	 {
		 const pageBaseHeight = this.contentTopScrollView.nativeElement.offsetHeight;
		 const parentArticleTitleViewHeight = this.articleTitleView.nativeElement.offsetHeight;
		 const parentAssignmentPropertiesViewViewHeight = this.assignmentPropertiesView.nativeElement.offsetHeight;
		 const deltaMargin = 40;
		 const scrollY = pageBaseHeight + parentArticleTitleViewHeight + parentAssignmentPropertiesViewViewHeight + deltaMargin;
		 const scrollX = 0;
		 const animationDelay = 1500;
		 this.articleView.scrollToPoint(scrollX,  scrollY , animationDelay);
	 }

	/**
	 * Tracks card flip
	 */
	private trackCardFlip()
	 {
		 if (this._cardFlipped)
		 {
			 const primaryCardId = 'back ' + this._selectedCard.cardId;
			 const secondaryCardId = 'front ' + this._selectedCard.cardId;
			 this.toggleCard(primaryCardId, secondaryCardId, false);
		 }
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
	public addNewCard()
	{
		// build data
		const model: CourseMaterialFlashCardModel = {
			courseMaterialId: this._selectedMenu.courseMaterialId,
			articleId: this._selectedMenu.articleId,
			frontMediaType: MediaTypeEnum.NONE,
			frontMedia: '',
			frontContent: '',
			backMediaType: MediaTypeEnum.NONE,
			backMedia : '',
			backContent : '',
			backContentMore : '',
			operationType: OperationsEnum.CREATE
		};

		this.courseMaterialFlashCardStateFacade.actUponCourseMaterialFlashCard(model, OperationsEnum.CREATE);
	}

	/**
	 * Determines whether course material quiz action on
	 * @param selectedCourseMaterialFlashCardModel 
	 * @param operation 
	 * @returns  
	 */
	public onCourseMaterialFlashCardAction(selectedCourseMaterialFlashCardModel: CourseMaterialFlashCardModel, operation: OperationsEnum)
	{
		// add operation to the object
		const model: CourseMaterialFlashCardModel = {
			...selectedCourseMaterialFlashCardModel,
			operationType: operation
		};

		// act upon operation
		return selectedCourseMaterialFlashCardModel ? this.courseMaterialFlashCardStateFacade.actUponCourseMaterialFlashCard(model, operation) : undefined;
	}

	/**
	 * Determines whether course material quiz copy action on
	 * @param selectedCourseMaterialFlashCardModel 
	 * @param operation 
	 */
	public onCourseMaterialFlashCardCopyAction(selectedCourseMaterialFlashCardModel: CourseMaterialFlashCardModel)
	{
		// add operation to the object
		const model: CourseMaterialFlashCardModel = {
			...selectedCourseMaterialFlashCardModel,
			cardId: '',
			operationType: OperationsEnum.CREATE
		};

		// act upon operation
		this.courseMaterialFlashCardStateFacade.actUponCourseMaterialFlashCard(model, OperationsEnum.CREATE);
	}

	/**
	 * Submits answers
	 */
	public submitAnswers(assignmentTime: string)
	{
		this.translateService
			.get([
				'actionAlert.confirm',
				'actionAlert.answerSubmit',
				'option.yes',
				'option.no',
			]).pipe(takeUntil(this.unsubscribe))
			.subscribe(async data =>
			{

				const alert = await this.alertController.create({
					header: `${data['actionAlert.confirm']}`,
					subHeader: data['actionAlert.answerSubmit'],
					cssClass: 'custom-alert',
					mode: 'md',
					buttons: [
						{
							cssClass: 'ok-button ',
							text: data['option.yes'],
							handler: (_) =>
							{
								this._assignmentSessionSubmitted = true;
								this._assignmentSessionInitiated = false;

								this._assignmentTime = assignmentTime;
								this.addNewAssignmentResult();
								this.openCrudAssignmentResult();
							}
						},
						{
							cssClass: 'cancel-button',
							text: data['option.no'],
							handler: () => { }
						}
					]
				});
				await alert.present();
			});
	}

	/**
	 * Starts active recall
	 */
	public startActiveRecall()
	{
		this._assignmentSessionInitiated = true;
		this._assignmentSessionSubmitted = false;

		this.scrollToArticleContent();
	}

	/**
	 * Toggles card
	 * @param primaryCardId 
	 * @param secondaryCardId 
	 */
	public toggleCard(primaryCardId: string, secondaryCardId: string, cardFlipped: boolean)
	{
		if (document.getElementById(primaryCardId) && document.getElementById(secondaryCardId))
		{
			this._flashCardAction = FlashCardActionEnum.FLIP;
			document.getElementById(primaryCardId).classList.remove('display-block');
			document.getElementById(primaryCardId).classList.add('display-none');
			
			document.getElementById(secondaryCardId).classList.remove('display-none');
			document.getElementById(secondaryCardId).classList.add('display-block');

			this._cardFlipped = cardFlipped;
		}
		
	}

	/**
	 * Next card
	 */
	public nextCard()
	{
		// track previous card end time before moving next card
		this.trackCardSpendTime(OperationsEnum.END);

		this._flashCardAction = FlashCardActionEnum.NONE;
		//this._resetFlashCard = false;
		this._cardIndex++;
		this.getSelectedCard();
		setTimeout(() =>
		{
			this._flashCardAction = FlashCardActionEnum.LEFT;
			//this._resetFlashCard = true;

			// track card time
			this.trackCardSpendTime(OperationsEnum.START);

			// track if card flipped
			this.trackCardFlip();
		}, 0);
	}

	

	/**
	 * Previous card
	 */
	public previousCard()
	{
		// track previous card end time before moving next card
		this.trackCardSpendTime(OperationsEnum.END);
		
		this._flashCardAction = FlashCardActionEnum.NONE;
		//this._resetFlashCard = false;
		this._cardIndex--;
		this.getSelectedCard();
		setTimeout(() =>
		{
			this._flashCardAction = FlashCardActionEnum.RIGHT;
			//this._resetFlashCard = true;

			// track card time
			this.trackCardSpendTime(OperationsEnum.START);

			// track if card flipped
			this.trackCardFlip();
		}, 0);
	}

	/**
	 * Previous card
	 */
	 public resetCard()
	 {
		 this._flashCardAction = FlashCardActionEnum.NONE;
		 this._cardIndex = 0;
		 this.getSelectedCard();
		 setTimeout(() =>
		 {
			 this._flashCardAction = FlashCardActionEnum.RIGHT;
			 
			 // track if card flipped
			 this.trackCardFlip();
		 }, 0);
	 }

	/**
	 * Gets class
	 * @param type 
	 * @returns  
	 */
	getClass(type: string)
	{
		const commonClass= "animate__animated flash-card card-solid-shadow"
		const displayNone = type === 'front' ? 'display-block' : 'display-none';
		switch (this._flashCardAction) {
			case FlashCardActionEnum.FLIP:
				return `${commonClass} animate__flipInX ${displayNone}`;
				break;
			case FlashCardActionEnum.LEFT:
				return `${commonClass} animate__fadeInRight ${displayNone}`;
				break;
			case FlashCardActionEnum.RIGHT:
				return `${commonClass} animate__fadeInLeft ${displayNone}`;
				break;
			default:
				break;
		}
	}
}


