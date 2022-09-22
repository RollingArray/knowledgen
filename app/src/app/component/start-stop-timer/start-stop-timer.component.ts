/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Start stop timer component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 18:02:24 
 * Last modified  : 2022-09-22 19:12:06
 */

import { Component, OnInit, Injector, Input, EventEmitter, Output, ElementRef, ViewChild } from "@angular/core";
import { AnimationController } from "@ionic/angular";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { CourseMaterialTypeIdEnum } from "src/app/shared/enum/course-material-type-id.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { MenuSelectModel } from "src/app/shared/model/menu-select.model";
import { CourseMaterialMenuStateFacade } from "src/app/state/course-material-menu/course-material-menu.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'start-stop-timer',
	templateUrl: './start-stop-timer.component.html',
	styleUrls: ['./start-stop-timer.component.scss'],
})
export class StartStopTimerComponent extends BaseFormComponent implements OnInit
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
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of user peer component
	 */
	 @ViewChild("elementSelector", { read: ElementRef, static: true }) elementSelector: ElementRef;

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
		private animationController: AnimationController
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

		// animate to open it
		this.landingAnimation();
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
	 * Landing animation
	 */
	 private landingAnimation()
	 {
		 const animation = this.animationController
			 .create()
			 .addElement(this.elementSelector.nativeElement)
			 .duration(500)
			 .fromTo("right", "-400px", `0px`);
		 animation.play();
	 }

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	private animate

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
	 * Starts session
	 */
	public startSession()
	{
		this._assignmentSessionInitiated = true;
		this._assignmentSessionSubmitted = false; 
		this.startAssignmentEvent.emit();
	}

	/**
	 * Totals quiz session time
	 * @param assignmentTime 
	 */
	 public totalSessionTime(assignmentTime: string)
	 {
		 this._assignmentTime = assignmentTime;
		 this.submitAssignmentEvent.emit(this._assignmentTime);
	 }
}
