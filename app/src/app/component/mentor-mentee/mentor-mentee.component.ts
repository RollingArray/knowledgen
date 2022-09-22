/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Mentor mentee component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 20:17:46 
 * Last modified  : 2022-09-22 20:18:52
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { takeUntil } from 'rxjs/operators';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { TranslateService } from '@ngx-translate/core';
import { AvailabilityPlannerStateFacade } from 'src/app/state/availability-planner/availability-planner.state.facade';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { NavParams } from '@ionic/angular';
import { MentorMatchModel } from 'src/app/shared/model/mentor-match.model';

@Component({
	selector: "mentor-mentee",
	templateUrl: "./mentor-mentee.component.html"
})
export class MentorMenteeComponent extends BaseViewComponent implements OnInit, OnDestroy
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
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	private _selectedDate: string;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	availabilityPlanner$!: Observable<AvailabilityPlannerModel>;

	/**
	 * Availability match$ of mentor mentee component
	 */
	availabilityMatch$!: Observable<MentorMatchModel[]>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	get selectedDate()
	{
		return this._selectedDate;
	}

	/**
	 * Gets user type
	 */
	get userType()
	{
		let userType: UserTypeEnum;
		// check user type
		this.rootStateFacade.loggedInUserType$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((loggedInUserType) =>
			{
				userType = loggedInUserType;
			});
		return userType;
	}

	/**
	 * Gets whether is user type teacher
	 */
	get isUserTypeTeacher()
	{
		return this.userType === UserTypeEnum.Teacher ? true : false;
	}

	/**
	 * Gets whether is user type student
	 */
	get isUserTypeStudent()
	{
		return this.userType === UserTypeEnum.Student ? true : false;
	}

	get pageTitle()
	{
		let title = '';
		this.translateService
			.get([
				'pageTitle.availabilityPlanner',
				'pageTitle.mentor',
				'pageTitle.mentee',
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data) =>
			{
				if (this.isUserTypeTeacher)
				{
					title = `${data['pageTitle.mentor']} ${data['pageTitle.availabilityPlanner']}`;
				}
				else
				{
					title = `${data['pageTitle.mentee']} ${data['pageTitle.availabilityPlanner']}`;
				}
			});
		return title;
	}

	get pageSubTitle()
	{
		let title = '';
		this.translateService
			.get([
				'pageSubTitle.availabilityPlannerMentor',
				'pageSubTitle.availabilityPlannerMentee'
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data) =>
			{
				if (this.isUserTypeTeacher)
				{
					title = `${data['pageSubTitle.availabilityPlannerMentor']}`;
				}
				else
				{
					title = `${data['pageSubTitle.availabilityPlannerMentee']}`;
				}
			});
		return title;
	}
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	/**
	 * Creates an instance of mentor mentee component.
	 * @param injector 
	 * @param availabilityPlannerStateFacade 
	 * @param translateService 
	 * @param rootStateFacade 
	 * @param navParams 
	 */
	constructor(
		injector: Injector,
		private availabilityPlannerStateFacade: AvailabilityPlannerStateFacade,
		private translateService: TranslateService,
		private rootStateFacade: RootStateFacade,
		public navParams: NavParams,
	)
	{
		super(injector);
	}



	/**
	 * on init
	 */
	async ngOnInit()
	{
		const plannerId = this.navParams.get("plannerId");
		this.availabilityPlanner$ = this.availabilityPlannerStateFacade.availabilityPlannerByAvailabilityPlannerId$(plannerId);
		this.availabilityMatch$ = this.availabilityPlannerStateFacade.availabilityMatchByAvailabilityPlannerId$(plannerId);
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
	 * Closes modal
	 */
	public closeModal()
	{
		this.modalController.dismiss();
	}
}

