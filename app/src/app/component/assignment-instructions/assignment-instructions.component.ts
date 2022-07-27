/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Assignment instructions component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-27 18:49:32 
 * Last modified  : 2022-07-27 18:50:09
 */

import { Component, OnInit, ViewChild, ElementRef, Injector, Inject, Input, EventEmitter, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { LocalStoreKey } from "src/app/shared/constant/local-store-key.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { QuizTypeEnum } from "src/app/shared/enum/quiz-type.enum";
import { AssignmentTimeModel } from "src/app/shared/model/assignment-time.model";
import { CourseMaterialAssignmentResultModel } from "src/app/shared/model/course-material-assignment-result.model";
import { CourseMaterialQuizAnswerModel } from "src/app/shared/model/course-material-quiz-answer.model";
import { CourseMaterialQuizModel } from "src/app/shared/model/course-material-quiz.model";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { UtilityService } from "src/app/shared/service/utility.service";
import { CourseMaterialAssignmentStateFacade } from "src/app/state/course-material-assignment/course-material-assignment.state.facade";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { CourseMaterialQuizStateFacade } from "src/app/state/course-material-quiz/course-material-quiz.state.facade";
import { CourseMaterialStateFacade } from "src/app/state/course-material/course-material.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { CrudCourseMaterialAssignmentResultComponent } from "../crud-course-material-assignment-result/crud-course-material-assignment-result.component";
import { CrudQuizQuestionComponent } from "../crud-quiz-question/crud-quiz-question.component";

@Component({
	selector: 'assignment-instructions',
	templateUrl: './assignment-instructions.component.html',
	styleUrls: ['./assignment-instructions.component.scss'],
})
export class AssignmentInstructionsComponent extends BaseFormComponent implements OnInit
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
	 * Course material type id enum of assignment instructions component
	 */
	readonly courseMaterialTypeIdEnum = CourseMaterialTypeIdEnum;

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
	 * Input  of assignment instructions component
	 */
	@Input() isMaterialOwner = false;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() noOfQuestions = 0;

	/**
	 * Input  of assignment instructions component
	 */
	@Input() courseMaterialTypeId: CourseMaterialTypeIdEnum;

	/**
	 * Output  of assignment instructions component
	 */
	@Output() submitAssignmentEvent = new EventEmitter<string>();

	/**
	 * Output  of assignment instructions component
	 */
	@Output() startAssignmentEvent = new EventEmitter();
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

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
	 * Selected menu of assignment instructions component
	 */
	private _selectedMenu: MenuSelectModel;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	public selectedMenuArticle$: Observable<MenuSelectModel>;
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

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

	/**
	 * Gets selected menu
	 */
	get selectedMenu()
	{
		return this._selectedMenu;
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
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions assignment instructions component
	 */
	public submitAssignment()
	{
		this._assignmentSessionInitiated = false;
		this._assignmentSessionSubmitted = true; 
	}

	/**
	 * Starts assignment
	 */
	public startAssignment()
	{
		this._assignmentSessionInitiated = true;
		this._assignmentSessionSubmitted = false; 
		this.startAssignmentEvent.emit();
	}

	/**
	 * Totals quiz session time
	 * @param assignmentTime 
	 */
	 public totalQuizSessionTime(assignmentTime: string)
	 {
		 this._assignmentTime = assignmentTime;
		 this.submitAssignmentEvent.emit(this._assignmentTime);
	 }
}
