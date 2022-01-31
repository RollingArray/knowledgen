/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-01-25 18:18:23
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
import { CookieService } from 'ngx-cookie-service';
import { LocalStoreKey } from 'src/app/shared/constant/local-store-key.constant';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { DatePipe } from '@angular/common';
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
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */

	private _selectedDate: string;
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	availabilityPlanner$!: Observable<AvailabilityPlannerModel>;

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

	get userType()
	{
		return this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_TYPE);
	}

	get isUserTypeTeacher()
	{
		return this.userType === UserTypeEnum.Teacher ? true : false;
	}

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
				.subscribe(async (data) => {
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
				.subscribe(async (data) => {
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
	 * Creates an instance of course material page.
	 * @param injector 
	 * @param availabilityPlannerStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private availabilityPlannerStateFacade: AvailabilityPlannerStateFacade,
		private translateService: TranslateService,
		private cookieService: CookieService,
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
	 public closeModal() {
		this.modalController.dismiss();
	}
}

