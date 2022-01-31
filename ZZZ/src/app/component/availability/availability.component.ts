/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-01-25 15:50:51
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector, Input } from '@angular/core';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { TranslateService } from '@ngx-translate/core';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { LocalStoreKey } from 'src/app/shared/constant/local-store-key.constant';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';

@Component({
	selector: "availability",
	templateUrl: "./availability.component.html",
	styleUrls: ["./availability.component.scss"]
})
export class AvailabilityComponent extends BaseViewComponent implements OnInit, OnDestroy
{
	/**
	  * -------------------------------------------------|
	  * @description										|
	  * @input & @output Instance variable								|
	  * -------------------------------------------------|
	  */
	 @Input() availabilityPlanner!: AvailabilityPlannerModel;

	
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

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	 get userType()
	 {
		 return this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_TYPE);
	 }
	
	 get isUserTypeTeacher()
	 {
		 return this.availabilityPlanner.userType === UserTypeEnum.Teacher ? true : false;
	 }
 
	 get isUserTypeStudent()
	 {
		 return this.availabilityPlanner.userType === UserTypeEnum.Student ? true : false;
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
		private translateService: TranslateService,
		private cookieService: CookieService,
		private datePipe: DatePipe
	)
	{
		super(injector);
	}



	/**
	 * on init
	 */
	async ngOnInit()
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

}

