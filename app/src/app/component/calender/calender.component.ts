/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Calender component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2022-09-20 16:19:57
 */


import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, ViewChild, Injector, Input, EventEmitter, Output } from "@angular/core";
import { IonSlides, PickerController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { CourseMaterialMenuStateFacade } from 'src/app/state/course-material-menu/course-material-menu.state.facade';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { ChildMenuModel } from 'src/app/shared/model/child-menu.model';
import { DateModel } from 'src/app/shared/model/date.model';

@Component({
	selector: "calender",
	templateUrl: "./calender.component.html",
	styleUrls: ["./calender.component.scss"],
})
export class CalenderComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */
	readonly operationsEnum = OperationsEnum;

	/**
	  * -------------------------------------------------|
	  * @description										|
	  * @input & @output Instance variable								|
	  * -------------------------------------------------|
	  */
	@Input() parentArticleId;

	/**
	 * Input  of child menu component
	 */
	@Input() courseMaterialId;

	@Output() emitAvailabilityDate = new EventEmitter<string>();
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */
	private _selectedDate: string;

	private _moveToIndex: number;

	private _gotoSlide: number;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	@ViewChild('slides', { static: false }) slides: IonSlides;
	/**
	 * Description  of course material page
	 */
	childMenu$!: Observable<ChildMenuModel[]>;

	/**
	 * Total number of sub child menu$ of sub child menu component
	 */
	totalNumberOfChildMenu$!: Observable<number>;

	/**
	 * Determines whether data has
	 */
	hasData$!: Observable<boolean>;

	weeksInMonth$: Observable<DateModel[][]>;

	currentMonth: string;

	currentYear: number;

	public calenderDataStructure$ = new BehaviorSubject<DateModel[][]>([]);

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	get daysInWeek()
	{
		return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	}

	get monthsInYear()
	{
		return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	}


	get today()
	{
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		return `${yyyy}-${mm}-${dd}`;
	}

	get selectedDate()
	{
		return this._selectedDate;
	}

	get moveToIndex()
	{
		return this._moveToIndex;
	}

	get getMonthsPicker()
	{
		let pickerOptions = [];
		this.monthsInYear.map((eachMonth, index) =>
		{
			pickerOptions = [
				...pickerOptions,
				{ text: eachMonth, value: index},
			]
		})

		return {
			name: "month",
			options: pickerOptions
		};
	}

	get getYearsPicker()
	{
		const currentYear = new Date().getFullYear();
		const list = [currentYear - 1, currentYear, currentYear + 1]

		let pickerOptions = [];
		list.map((eachYear, index) =>
		{
			pickerOptions = [
				...pickerOptions,
				{ text: eachYear, value: eachYear },
			]
		})

		return {
			name: "year",
			options: pickerOptions
		};
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	/**
	 * Creates an instance of course material page.
	 * @param injector 
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private translateService: TranslateService,
		private rootStateFacade: RootStateFacade,
		private pickerController: PickerController
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	async ngOnInit()
	{
		this._selectedDate = this.today;
		this.weeksInMonth$ = this.allDateDataStructure(new Date().getFullYear(), new Date().getMonth() + 1);
		this.currentMonth = this.monthsInYear[new Date().getMonth()];
		this.currentYear = new Date().getFullYear();
		this.findSlidePosition();
		this.emitAvailabilityDate.emit(this._selectedDate);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	private findSlidePosition()
	{
		this.weeksInMonth$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(weeksInMonth =>
			{
				this._gotoSlide = 0;

				weeksInMonth.map((eachWeek, index) =>
				{
					eachWeek.map(eachDay =>
					{
						if (eachDay.fullDate === this._selectedDate)
						{
							this._gotoSlide = index;
						}
					});
				});
			});
	}

	private daysInMonth(month: number, year: number)
	{
		return new Date(year, month, 0).getDate();
	}

	

	private allDateDataStructure(year: number, month: number): Observable<any[]>
	{
		const numberOfDayInMonth = this.daysInMonth(month, year);
		let date: DateModel[] = [];
		const firstDayOfMonth = this.getDayForDate(year + "-" + month + "-01");
		//iterate thorugh all the days in week and see if it started from sunday, else empty day
		for (var i = 0; i < this.daysInWeek.length; i++)
		{
			var _day = this.daysInWeek[i];
			if (firstDayOfMonth == _day)
			{

				for (var j = 0; j <= (i - 1); j++)
				{
					const dateModel: DateModel = {
						date: 0
					}
					date = [
						...date,
						dateModel
					];
				};
			}
		};

		//actual dats in month
		for (var i = 1; i <= numberOfDayInMonth; i++)
		{
			const fullDate = `${year}-${this.addZeroFront(month)}-${this.addZeroFront(i)}`;
			const dateModel: DateModel = {
				date: i,
				day: this.getDayForDate(year + "-" + this.addZeroFront(month) + "-" + this.addZeroFront(i)),
				fullDate: `${year}-${this.addZeroFront(month)}-${this.addZeroFront(i)}`,
				isToday: fullDate === this._selectedDate ? true : false
			};

			date = [
				...date,
				dateModel
			];
		};

		this.calenderDataStructure$ = new BehaviorSubject<any[]>(
			this.spliceIntoChunks(date, 7)
		);
		return this.calenderDataStructure$.asObservable();
	}

	private spliceIntoChunks(arr, chunkSize)
	{
		const res = [];
		while (arr.length > 0)
		{
			const chunk = arr.splice(0, chunkSize);
			res.push(chunk);
		}
		return res;
	}

	//getDayForDate
	private getDayForDate(date: string)
	{
		let dateFromString = new Date(date);
		let weekday = this.daysInWeek;
		return weekday[dateFromString.getDay()];
	}

	private addZeroFront(_number)
	{
		return ("0" + (parseInt(_number)).toString()).substr(-2);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	 slidesLoaded($event)
	 {
		 //move to slide number 2
		 $event.target.slideTo(this._gotoSlide);
	 }
	
	selectDate(fullDate: string)
	{
		const date = fullDate.split("-");
		this._selectedDate = fullDate;
		this.weeksInMonth$ = this.allDateDataStructure(parseInt(date[0]), parseInt(date[1]));
		this.emitAvailabilityDate.emit(this._selectedDate);
	}

	async openMonthYearPicker()
	{
		this.translateService
				.get([
					'button.cancel',
					'button.confirm'
				])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) => {
					const picker = this.pickerController.create({
						columns: [this.getMonthsPicker, this.getYearsPicker],
						buttons: [
							{
								text: data['button.cancel']
							},
							{
								text: data['button.confirm'],
								handler: (value) =>
								{
									this.currentMonth = this.monthsInYear[value.month.value];
									this.currentYear = value.year.value;
									this.weeksInMonth$ = this.allDateDataStructure(value.year.value, (value.month.value + 1));
								},
							},
						],
					});
			
					await (await picker).present();
				});
		
		
	}
}
