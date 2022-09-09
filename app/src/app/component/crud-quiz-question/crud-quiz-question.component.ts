/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:38:45 
 * Last modified  : 2022-07-19 20:02:56
 */

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Injector, ViewChild, ElementRef, Inject } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialQuizModel } from "src/app/shared/model/course-material-quiz.model";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { AlertService } from 'src/app/shared/service/alert.service';
import { QuizTypeEnum } from 'src/app/shared/enum/quiz-type.enum';
import { CourseMaterialQuizAnswerModel } from 'src/app/shared/model/course-material-quiz-answer.model';
import { CourseMaterialQuizStateFacade } from 'src/app/state/course-material-quiz/course-material-quiz.state.facade';
import { DOCUMENT } from '@angular/common';
import { UtilityService } from 'src/app/shared/service/utility.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'crud-quiz-question',
	templateUrl: './crud-quiz-question.component.html',
	styleUrls: ['./crud-quiz-question.component.scss'],
})
export class CrudQuizQuestionComponent extends BaseFormComponent implements OnInit
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
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud course material component
	 */
	private _courseMaterialQuiz!: CourseMaterialQuizModel;

	/**
	 * Course material quiz answers of crud quiz question component
	 */
	private _courseMaterialQuizAnswers: CourseMaterialQuizAnswerModel[] = [];

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud quiz question component
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
		if (this._courseMaterialQuiz.operationType === OperationsEnum.CREATE)
		{
			title = 'pageTitle.addQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.EDIT)
		{
			title = 'pageTitle.editQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.DELETE)
		{
			title = 'pageTitle.deleteQuestion';
		}

		return title;
	}

	/**
	 * Gets page sub title
	 */
	public get pageSubTitle()
	{

		let title = '';
		if (this._courseMaterialQuiz.operationType === OperationsEnum.CREATE)
		{
			title = 'pageSubTitle.addQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.EDIT)
		{
			title = 'pageSubTitle.editQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.DELETE)
		{
			title = 'pageSubTitle.deleteQuestion';
		}

		return title;
	}

	/**
	 * @description Gets loading
	 */
	public get loading()
	{
		let loading = '';
		if (this._courseMaterialQuiz.operationType === OperationsEnum.CREATE)
		{
			loading = 'loading.newQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.EDIT)
		{
			loading = 'loading.editQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.DELETE)
		{
			loading = 'loading.deleteQuestion';
		}

		return loading;
	}

	/**
	 * @description Gets response
	 */
	public get response()
	{
		let response = '';
		if (this._courseMaterialQuiz.operationType === OperationsEnum.CREATE)
		{
			response = 'response.newQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.EDIT)
		{
			response = 'response.editQuestion';
		}
		else if (this._courseMaterialQuiz.operationType === OperationsEnum.DELETE)
		{
			response = 'response.deleteQuestion';
		}

		return response;
	}


	/**
	 * Gets whether is operation delete
	 */
	public get isOperationDelete()
	{
		return this._courseMaterialQuiz.operationType === OperationsEnum.DELETE ? true : false;
	}

	/**
	 * Gets course material quiz answers
	 */
	public get courseMaterialQuizAnswers()
	{
		return this._courseMaterialQuizAnswers;
	}

	/**
	 * Gets course material quiz
	 */
	public get courseMaterialQuiz()
	{
		return this._courseMaterialQuiz;
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
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private courseMaterialQuizStateFacade: CourseMaterialQuizStateFacade,
		private rootStateFacade: RootStateFacade,
		@Inject(DOCUMENT) document: Document,
		private utilityService: UtilityService
	)
	{
		
		super(injector);

		// check status of modal indicator status
		this.modalLoadingIndicatorStatus$ = this.rootStateFacade.modalLoadingIndicatorStatus$;
		
		this.modalLoadingIndicatorStatus$.subscribe(data => console.log(data));

		// get act upon curd model from store
		this.courseMaterialQuizStateFacade
			.operationCourseMaterialQuiz$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data => this._courseMaterialQuiz = data
			);
		
		//if the operation is delete, submit the data
		if (this._courseMaterialQuiz.operationType === OperationsEnum.DELETE)
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
	 * after view init
	 */
	ngAfterViewInit()
	{
		(this.questionDocument.nativeElement as HTMLCanvasElement).innerHTML = this._courseMaterialQuiz.question;
		this._courseMaterialQuiz.options.map(eachAnswerOption =>
		{
			document.getElementById(eachAnswerOption.answerId).innerHTML = eachAnswerOption.answer;
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
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion()
	{
		this.courseMaterialQuizStateFacade
			.courseMaterialQuizCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{
				
				
				switch (operationsStatus)
				{
					case OperationsEnum.SUCCESS:

						const response = this.response;

						if (response)
						{
							// remove loading indicator
							this.rootStateFacade.stopModalLoading();
							
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
						}

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
		switch (this._courseMaterialQuiz.operationType)
		{
			case OperationsEnum.CREATE:
				this.courseMaterialQuizStateFacade.addNewCourseMaterialQuiz(this._courseMaterialQuiz);
				break;
			case OperationsEnum.EDIT:
				this.courseMaterialQuizStateFacade.editCourseMaterialQuiz(this._courseMaterialQuiz);
				break;
			case OperationsEnum.DELETE:
				this.courseMaterialQuizStateFacade.deleteCourseMaterialQuiz(this._courseMaterialQuiz);
				break;
			default:
				break;
		}
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private ifFormValid()
	{
		// map each answer to the html answer text content
		let courseMaterialQuizOptions: CourseMaterialQuizAnswerModel[] = [];
		this._courseMaterialQuiz.options.map(eachAnswerOption =>
		{
			let option: CourseMaterialQuizAnswerModel = {
				...eachAnswerOption,
				answer: document.getElementById(eachAnswerOption.answerId).innerHTML,
			};

			courseMaterialQuizOptions = [
				...courseMaterialQuizOptions,
				option
			]
		})

		// map question to the html question text content
		this._courseMaterialQuiz = {
			...this._courseMaterialQuiz,
			question: (this.questionDocument.nativeElement as HTMLCanvasElement).innerHTML,
			options: courseMaterialQuizOptions
		};

		const correctOption = this._courseMaterialQuiz.options.filter(eachAnswerOption => eachAnswerOption.isCorrect === true)

		if (this._courseMaterialQuiz.options.length < 2)
		{
			this.translateService
				.get([
					'errorMessage.notAllowed',
					'errorMessage.minimumAnswer',
					'button.ok'
				])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) =>
				{
					this.alertService.presentAlert(
						data['errorMessage.notAllowed'],
						data['errorMessage.minimumAnswer'],
						data['button.ok'],
					);
				});
			

			return false;
		}
		else if (correctOption.length === 0)
		{
			this.translateService
				.get([
					'errorMessage.notAllowed',
					'errorMessage.minimumCorrectAnswer',
					'button.ok'
				])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) =>
				{
					this.alertService.presentAlert(
						data['errorMessage.notAllowed'],
						data['errorMessage.minimumCorrectAnswer'],
						data['button.ok'],
					);
				});
			

			return false;
		}

		return true
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
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions crud quiz question component
	 */
	public async submit()
	{
		if (this.ifFormValid())
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
		// dismiss modal view
		this.courseMaterialQuizStateFacade.actUponCourseMaterialQuiz(this._courseMaterialQuiz, OperationsEnum.NONE);
		this.modalController.dismiss();
	}

	/**
	 * Adds answer type
	 * @param quizType 
	 */
	public addAnswerType(quizType: QuizTypeEnum)
	{
		switch (quizType)
		{
			case QuizTypeEnum.MCQ:

				const mcqAnswerModel: CourseMaterialQuizAnswerModel = {
					answerId: this.utilityService.getTempId(),
					answer: '',
					isCorrect: false,
					isChecked: false,
				}
				this._courseMaterialQuiz = {
					...this._courseMaterialQuiz,
					quizType: QuizTypeEnum.MCQ,
					options: [
						...this._courseMaterialQuiz.options,
						mcqAnswerModel
					]
				}

				break;
			case QuizTypeEnum.TF:

				const trueAnswerModel: CourseMaterialQuizAnswerModel = {
					answerId: this.utilityService.getTempId(),
					answer: 'True',
					isCorrect: true,
					isChecked: false
				}
				const falseAnswerModel: CourseMaterialQuizAnswerModel = {
					answerId: this.utilityService.getTempId(),
					answer: 'False',
					isCorrect: false,
					isChecked: false
				}

				this._courseMaterialQuiz = {
					...this._courseMaterialQuiz,
					options: [
						trueAnswerModel,
						falseAnswerModel
					],
					quizType: QuizTypeEnum.TF
				}
				break;
			default:
				break;
		}
	}

	/**
	 * Removes answer
	 * @param answer 
	 */
	public removeAnswer(answer: CourseMaterialQuizAnswerModel)
	{
		this._courseMaterialQuiz.options = this._courseMaterialQuiz.options.filter(eachAnswer => eachAnswer.answerId !== answer.answerId);
	}

	/**
	 * Answers check
	 * @param answer 
	 */
	public answerCheck(answer: CourseMaterialQuizAnswerModel)
	{
		let courseMaterialQuizOptions: CourseMaterialQuizAnswerModel[] = [];

		if (this._courseMaterialQuiz.quizType === QuizTypeEnum.MCQ)
		{
			this._courseMaterialQuiz.options.map(eachAnswer =>
			{
				if (eachAnswer.answerId === answer.answerId)
				{
					console.log(document.getElementById(eachAnswer.answerId).innerHTML);
					let option: CourseMaterialQuizAnswerModel = {
						...eachAnswer,
						answer: document.getElementById(eachAnswer.answerId).innerHTML,
						isCorrect: !eachAnswer.isCorrect
					};

					courseMaterialQuizOptions = [
						...courseMaterialQuizOptions,

						option
					]
				}
				else
				{
					let option: CourseMaterialQuizAnswerModel = {
						...eachAnswer,
						answer: document.getElementById(eachAnswer.answerId).innerHTML,
					};

					courseMaterialQuizOptions = [
						...courseMaterialQuizOptions,
						option
					]
				}
			});
		}
		else if (this._courseMaterialQuiz.quizType === QuizTypeEnum.TF)
		{
			this._courseMaterialQuiz.options.map(eachAnswer =>
			{
				let option: CourseMaterialQuizAnswerModel = {
					...eachAnswer,
					answer: document.getElementById(eachAnswer.answerId).innerHTML,
					isCorrect: !eachAnswer.isCorrect
				};

				courseMaterialQuizOptions = [
					...courseMaterialQuizOptions,
					option
				]
			});	
		}

		this._courseMaterialQuiz = {
			...this._courseMaterialQuiz,
			options: courseMaterialQuizOptions
		}
	}
}
