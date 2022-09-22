/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Availability component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 19:55:29 
 * Last modified  : 2022-09-22 19:57:15
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector, Input } from '@angular/core';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { takeUntil } from 'rxjs/operators';

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
		return this.availabilityPlanner.userType === UserTypeEnum.Teacher ? true : false;
	}

	/**
	 * Gets whether is user type student
	 */
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
	 * Creates an instance of availability component.
	 * @param injector 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private rootStateFacade: RootStateFacade,
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

