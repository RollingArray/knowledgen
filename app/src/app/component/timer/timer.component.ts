/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Timer component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-25 19:35:16 
 * Last modified  : 2022-08-25 17:07:09
 */

import { Component, OnInit, Output, Injector, EventEmitter, Input } from "@angular/core";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseViewComponent } from "../base/base-view.component";

@Component({
	selector: "timer",
	templateUrl: "./timer.component.html",
	styleUrls: ["./timer.component.scss"],

})
export class TimerComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	  * -------------------------------------------------|
	  * @description									 |
	  * @input & @output Instance variable				 |
	  * -------------------------------------------------|
	  */
	/**
	 * Description  of timer component
	 */
	@Input() timerStarted = false;

	/**
	 * Input  of timer component
	 */
	@Input() timerEnded = false;

	/**
	 * Output  of timer component
	 */
	@Output() timeEventEmitter = new EventEmitter<string>();

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Minute  of record page
	 */
	private _minute = 0;

	/**
	 * Second  of record page
	 */
	private _second = 0;

	/**
	 * Millisecond  of record page
	 */
	private _millisecond = 0;

	/**
	 * Determines whether running is
	 */
	private _isRunning = false;

	/**
	  * Timer id of record page
	  */
	private _timerId: null | ReturnType<typeof setTimeout> = null

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Gets minute
	 */
	get minute()
	{
		return this._minute;
	}

	/**
	 * Gets second
	 */
	get second()
	{
		return this._second;
	}

	/**
	 * Gets millisecond
	 */
	get millisecond()
	{
		return this._millisecond;
	}

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
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	constructor(
		injector: Injector,
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		if (this.timerStarted && !this.timerEnded)
		{
			this.startTimer();
		}
	}

	/**
	 * on changes
	 */
	ngOnChanges()
	{
		if (this.timerStarted && !this.timerEnded)
		{
			this.startTimer();
		}
		else if (this.timerEnded && !this.timerStarted)
		{
			this.stopTimer();
		}
	}


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	private reset()
	{
		this._minute = 0;
		this._second = 0;
		this._millisecond = 0;
	}
	/**
	 * Formats record page
	 * @param num 
	 * @returns  
	 */
	format(num: number)
	{
		return (num + '').length === 1 ? '0' + num : num + '';
	}

	/**
	 * Timers cycle
	 */
	private timerCycle()
	{
		if (!this._isRunning)
		{
			this.reset();
			// Stop => Running
			this._timerId = setInterval(() =>
			{
				this._millisecond = this._millisecond + 10;

				if (this._millisecond >= 100)
				{
					this._second++;
					this._millisecond = 0;
				}
				if (this._second >= 60)
				{
					this._minute++;
					this._second = 0
				}
			}, 100);
		} else
		{
			clearInterval(this._timerId);
		}
		this._isRunning = !this._isRunning;
	}

	/**
	 * Starts timer
	 */
	private startTimer()
	{
		this.rootStateFacade.startStudyTimer(OperationsEnum.START);
		this.timerCycle();
	}

	/**
	 * Stops timer
	 */
	private stopTimer()
	{
		this.rootStateFacade.startStudyTimer(OperationsEnum.END);
		this.timerCycle();
		const assignmentTime = `${this.format(this._minute)}:${this.format(this._second)}:${this.format(this._millisecond)}`;

		this.timeEventEmitter.emit(assignmentTime);
		//this.reset();

	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */
}
