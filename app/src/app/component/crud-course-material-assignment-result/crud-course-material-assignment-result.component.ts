/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material assignment result component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:56:56 
 * Last modified  : 2022-09-02 15:01:56
 */

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Injector } from "@angular/core";
import { retry, takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { AlertService } from 'src/app/shared/service/alert.service';
import { CourseMaterialAssignmentStateFacade } from 'src/app/state/course-material-assignment/course-material-assignment.state.facade';
import { CourseMaterialAssignmentResultModel } from 'src/app/shared/model/course-material-assignment-result.model';
import { ResultTypeEnum } from 'src/app/shared/enum/retust-type.enum';
import { NavParams } from '@ionic/angular';
import { CourseMaterialMenuStateFacade } from 'src/app/state/course-material-menu/course-material-menu.state.facade';
import { Observable } from 'rxjs';
import { MenuSelectModel } from 'src/app/shared/model/menu-select.model';
import { CoreSubjectAreaTagModel } from 'src/app/shared/model/core-subject-area-tag.model';

@Component({
	selector: 'crud-course-material-assignment-result',
	templateUrl: './crud-course-material-assignment-result.component.html',
	styleUrls: ['./crud-course-material-assignment-result.component.scss'],
})
export class CrudCourseMaterialAssignmentResultComponent extends BaseFormComponent implements OnInit
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
	 * Result type enum of crud course material assignment result component
	 */
	readonly resultTypeEnum = ResultTypeEnum;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud course material assignment result component
	 */
	private _courseMaterialAssignmentResult!: CourseMaterialAssignmentResultModel;

	/**
	 * Result available of crud course material assignment result component
	 */
	private _resultAvailable = false;

	/**
	 * Result type of crud course material assignment result component
	 */
	private _resultType: ResultTypeEnum;

	/**
	 * Space repetition day of crud course material assignment result component
	 */
	private _spaceRepetitionDay: string;

	/**
	 * Strength weakness analysis of crud assignment quiz component
	 */
	private _strengthWeaknessAnalysis: CoreSubjectAreaTagModel[] = [];

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of article session component
	 */
	public selectedMenuArticle$: Observable<MenuSelectModel>;

	/**
	 * Modal loading indicator status$ of crud course material assignment result component
	 */
	public modalLoadingIndicatorStatus$: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	/**
	 * Gets result available
	 */
	public get resultAvailable()
	{
		return this._resultAvailable;
	}

	/**
	 * Gets course material assignment result
	 */
	public get courseMaterialAssignmentResult()
	{
		return this._courseMaterialAssignmentResult;
	}

	/**
	 * Gets result title
	 */
	public resultTitle()
	{

		let title = '';

		if (this._resultType === ResultTypeEnum.SCORE)
		{
			const resultPercentage = (this._courseMaterialAssignmentResult.articleAssignmentTotalNoOfCorrectAnswers / this._courseMaterialAssignmentResult.articleAssignmentTotalNoOfQuestions) * 100;

			if (resultPercentage >= 0 && resultPercentage <= 30)
			{
				title = 'pageTitle.resultLow';
			}
			else if (resultPercentage >= 31 && resultPercentage <= 70)
			{
				title = 'pageTitle.resultMid';
			}
			else if (resultPercentage >= 71 && resultPercentage <= 100)
			{
				title = 'pageTitle.resultTop';
			}
		}
		else if (this._resultType === ResultTypeEnum.TIME)
		{
			// get article completion time
			const articleCompletionTime = parseInt(this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleCompletionTime'));

			// get maximum time allowed for each question
			const eachQuestionAllowedMaxTime = ((articleCompletionTime * 60) / this._courseMaterialAssignmentResult.articleAssignmentTotalNoOfQuestions);

			// find best active recall time in percentage 
			const bestActiveRecallTimePercentage = (this._courseMaterialAssignmentResult.articleAssignmentTotalNoOfCorrectAnswers / eachQuestionAllowedMaxTime) * 100;

			// get number of days for space repetition based on active recall time percentage
			let numberOfDays = 0;

			// set result title based on percentage
			if (bestActiveRecallTimePercentage >= 0 && bestActiveRecallTimePercentage <= 20)
			{
				title = 'pageTitle.timeL1';
			}
			else if (bestActiveRecallTimePercentage >= 21 && bestActiveRecallTimePercentage <= 40)
			{
				title = 'pageTitle.timeL2';
			}
			else if (bestActiveRecallTimePercentage >= 41 && bestActiveRecallTimePercentage <= 60)
			{
				title = 'pageTitle.timeL3';
			}
			else if (bestActiveRecallTimePercentage >= 61 && bestActiveRecallTimePercentage <= 80)
			{
				title = 'pageTitle.timeL4';
			}
			else if (bestActiveRecallTimePercentage >= 81 && bestActiveRecallTimePercentage <= 100)
			{
				title = 'pageTitle.timeL4';
			}
			else if (bestActiveRecallTimePercentage > 100)
			{
				title = 'pageTitle.timeL6';
			}
		}

		else if (this._resultType === ResultTypeEnum.NONE)
		{
			//
		}

		return title;
	}

	/**
	 * Sets result type
	 */
	public get resultType()
	{
		return this._resultType;
	}

	/**
	 * Sets result type
	 */
	public set resultType(value: ResultTypeEnum)
	{
		this._resultType = value;
	}

	/**
	 * Gets strength weakness analysis
	 */
	public get strengthWeaknessAnalysis()
	{
		return this._strengthWeaknessAnalysis;
	}

	/**
	 * Sets strength weakness analysis
	 */
	public set strengthWeaknessAnalysis(value: CoreSubjectAreaTagModel[])
	{
		this._strengthWeaknessAnalysis = value;
	}

	/**
	 * Gets space repetition day
	 */
	public spaceRepetitionDay()
	{
		let setDate: Date;

		if (this._resultType === ResultTypeEnum.SCORE)
		{
			// set revision for next day
			setDate = new Date(Date.now() + 1);
		}
		else if (this._resultType === ResultTypeEnum.TIME)
		{
			// get article completion time
			const articleCompletionTime = parseInt(this.courseMaterialMenuStateFacade.getSpecificPropertyOfMenu('articleCompletionTime'));

			// get maximum time allowed for each question
			const eachQuestionAllowedMaxTime = ((articleCompletionTime * 60) / this._courseMaterialAssignmentResult.articleAssignmentTotalNoOfQuestions);

			// find best active recall time in percentage 
			const bestActiveRecallTimePercentage = (this._courseMaterialAssignmentResult.articleAssignmentTotalNoOfCorrectAnswers / eachQuestionAllowedMaxTime) * 100;

			// get number of days for space repetition based on active recall time percentage
			let numberOfDays = 0;

			// set result title based on percentage
			if (bestActiveRecallTimePercentage >= 0 && bestActiveRecallTimePercentage <= 20)
			{
				numberOfDays = this.arrayKey.SPACE_REPETITION_DAYS[5];
			}
			else if (bestActiveRecallTimePercentage >= 21 && bestActiveRecallTimePercentage <= 40)
			{
				numberOfDays = this.arrayKey.SPACE_REPETITION_DAYS[4];
			}
			else if (bestActiveRecallTimePercentage >= 41 && bestActiveRecallTimePercentage <= 60)
			{
				numberOfDays = this.arrayKey.SPACE_REPETITION_DAYS[3];
			}
			else if (bestActiveRecallTimePercentage >= 61 && bestActiveRecallTimePercentage <= 80)
			{
				numberOfDays = this.arrayKey.SPACE_REPETITION_DAYS[2];
			}
			else if (bestActiveRecallTimePercentage >= 81 && bestActiveRecallTimePercentage <= 100)
			{
				numberOfDays = this.arrayKey.SPACE_REPETITION_DAYS[1];
			}
			else if (bestActiveRecallTimePercentage > 100)
			{
				numberOfDays = this.arrayKey.SPACE_REPETITION_DAYS[0];
			}

			// get date for next reversion
			const millisecondsInADay = 24 * 60 * 60 * 1000;
			setDate = new Date(Date.now() + numberOfDays * millisecondsInADay);
		}

		else if (this._resultType === ResultTypeEnum.NONE)
		{
			// set revision for next day
			setDate = new Date(Date.now() + 1);
		}

		return setDate.toISOString().split('T')[0];
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
		private courseMaterialAssignmentStateFacade: CourseMaterialAssignmentStateFacade,
		private rootStateFacade: RootStateFacade,
		private navParams: NavParams,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		// get result type
		this._resultType = this.navParams.get('resultType');

		// all tags
		let allTags: CoreSubjectAreaTagModel[] = this.navParams.get('strengthWeaknessAnalysis') ? this.navParams.get('strengthWeaknessAnalysis') : [];
		
		// selected menu article
		this.selectedMenuArticle$ = this.courseMaterialMenuStateFacade.selectedMenuArticle$;

		// modal loading indicator
		this.modalLoadingIndicatorStatus$ = this.rootStateFacade.modalLoadingIndicatorStatus$;

		// get result
		if (this._resultType !== ResultTypeEnum.NONE)
		{
			// get act upon curd model from store
			this.courseMaterialAssignmentStateFacade
				.operationCourseMaterialAssignment$
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(
					data =>
					{
						this._courseMaterialAssignmentResult = data;

						// if result analysis available
						if (allTags.length !== 0)
						{
							this._strengthWeaknessAnalysis = this.strengthWeaknessAnalysisFromTag(allTags);
							this._courseMaterialAssignmentResult = {
								...this._courseMaterialAssignmentResult,
								coreSubjectAreaTagAnalysis: this._strengthWeaknessAnalysis
							}
						}
					}
				);

			this.submit();
		}
		else
		{
			this._courseMaterialAssignmentResult = {
				articleAssignmentCompletionTime: this.navParams.get('studyTime')
			}
		}


	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions crud course material assignment result component
	 * @param allTags 
	 * @returns  
	 */
	private strengthWeaknessAnalysisFromTag(allTags: CoreSubjectAreaTagModel[])
	{
		let allTagAnalysis: CoreSubjectAreaTagModel[] = [];
		const uniqueTags = [...new Set(allTags.map((eachSubjectAreaTag: CoreSubjectAreaTagModel) => eachSubjectAreaTag.subjectAreaTagName))];
		uniqueTags.map((eachTag: string) =>
		{
			let tagName = eachTag;
			let tagId: string;
			let strongAreaAnalysis = 0, weakAreaAnalysis = 0;
			allTags.map(eachAnalysis =>
			{
				if (eachAnalysis.subjectAreaTagName === tagName && eachAnalysis.isCorrect)
				{
					tagId = eachAnalysis.subjectAreaTagId;
					strongAreaAnalysis++;
				}
				else if (eachAnalysis.subjectAreaTagName === tagName && !eachAnalysis.isCorrect)
				{
					tagId = eachAnalysis.subjectAreaTagId;
					weakAreaAnalysis++;
				}
			});

			const coreSubjectAreaTagAnalysis: CoreSubjectAreaTagModel = {
				subjectAreaTagId: tagId,
				subjectAreaTagName: tagName,
				weakAreaAnalysis: weakAreaAnalysis,
				strongAreaAnalysis: strongAreaAnalysis,
				strongAreaPercentage: parseInt(((strongAreaAnalysis / (strongAreaAnalysis + weakAreaAnalysis)) * 100).toFixed(2))
			};
			allTagAnalysis = [
				...allTagAnalysis,
				coreSubjectAreaTagAnalysis
			];
		});





		return allTagAnalysis;
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
		this.courseMaterialAssignmentStateFacade
			.courseMaterialAssignmentResultCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{

				switch (operationsStatus)
				{
					case OperationsEnum.SUCCESS:

						this._resultAvailable = true;
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
		this.courseMaterialAssignmentStateFacade.addNewCourseMaterialAssignmentResult(this._courseMaterialAssignmentResult)
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
		this.rootStateFacade.startModalLoading();
		this.launchOperation();
		this.crudOperationCompletion();
	}

	/**
	 * Closes modal
	 */
	public closeModal()
	{
		// discard active crud operation
		const courseMaterialAssignmentResultModel: CourseMaterialAssignmentResultModel = {};
		this.courseMaterialAssignmentStateFacade.actUponCourseMaterialAssignment(courseMaterialAssignmentResultModel, OperationsEnum.NONE);

		// dismiss modal view
		this.modalController.dismiss();
	}

	/**
	 * Splits time
	 * @param time 
	 * @returns  
	 */
	public splitTime(time: string)
	{
		if (time)
		{
			let localization = [];
			this.translateService
				.get([
					'formInfo.minute',
					'formInfo.second',
					'formInfo.millisecond',

				]).pipe(takeUntil(this.unsubscribe))
				.subscribe(async data =>
				{
					localization = data;
				});

			const timeArray = time.split(":");
			const hour = parseInt(timeArray[0]) !== 0 ? `${parseInt(timeArray[0])} ${localization['formInfo.minute']}` : '';
			const minute = parseInt(timeArray[1]) !== 0 ? `${parseInt(timeArray[1])} ${localization['formInfo.second']}` : '';
			const seconds = parseInt(timeArray[2]) !== 0 ? `${parseInt(timeArray[2])} ${localization['formInfo.millisecond']}` : '';

			return `${hour} ${minute} ${seconds}`;
		}
	}
}
