/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Availability planner page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 20:10:38 
 * Last modified  : 2022-09-22 20:11:52
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { takeUntil } from 'rxjs/operators';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { TranslateService } from '@ngx-translate/core';
import { CrudAvailabilityPlannerComponent } from 'src/app/component/crud-availability-planner/crud-availability-planner.component';
import { AvailabilityPlannerStateFacade } from 'src/app/state/availability-planner/availability-planner.state.facade';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { DatePipe } from '@angular/common';
import { MentorMenteeComponent } from 'src/app/component/mentor-mentee/mentor-mentee.component';

@Component({
	selector: "availability-planner",
	templateUrl: "./availability-planner.page.html",
	styleUrls: ["./availability-planner.page.scss"]
})
export class AvailabilityPlannerPage extends BaseViewComponent implements OnInit, OnDestroy
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
	availabilityPlanners$!: Observable<AvailabilityPlannerModel[]>;

	/**
	 * Determines whether data has
	 */
	hasData$!: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
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

	/**
	 * Gets page title
	 */
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

	/**
	 * Gets page sub title
	 */
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
	 * Gets today or future
	 */
	get todayOrFuture()
	{
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();

		const selectedDate = new Date(this._selectedDate);
		
		return selectedDate >= new Date(`${yyyy}-${mm}-${dd}`) ? true : false;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	
	/**
	 * Creates an instance of availability planner page.
	 * @param injector 
	 * @param availabilityPlannerStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 * @param datePipe 
	 */
	constructor(
		injector: Injector,
		private availabilityPlannerStateFacade: AvailabilityPlannerStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
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
		this.translateService
			.get('loading.holdTight')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				this.errorMessage = data;
			});
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
	 * Descriptions course material page
	 */
	 private trackAvailabilityPlannerCrudOperationStatus()
	 {
		 this.availabilityPlannerStateFacade
			 .availabilityPlannerCurdOperationStatus$
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(async (operationsStatus: OperationsEnum) =>
			 {
 
				 // track operation status and  
				 switch (operationsStatus)
				 {
					 case OperationsEnum.EDIT:
						 this.openCrudAvailabilityPlanner();
						 break;
					 case OperationsEnum.DELETE:
						 this.openCrudAvailabilityPlanner();
						 break;
					 default:
						 break;
				 }
			 });
	 }
 
	 /**
	  * Opens crud course material
	  */
	 private async openCrudAvailabilityPlanner()
	 {
		 const modal = await this.modalController.create({
			 component: CrudAvailabilityPlannerComponent,
			 cssClass: 'modal-view',
			 backdropDismiss: false,
		 });
 
		 // present modal
		 await modal.present();
	 }
 
	 /**
	  * Checks if want to delete
	  * @param selectedAvailabilityPlannerModel 
	  */
	 private checkIfWantToDelete(selectedAvailabilityPlannerModel: AvailabilityPlannerModel)
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
							 handler: (_) => selectedAvailabilityPlannerModel ? this.availabilityPlannerStateFacade.actUponAvailabilityPlanner(selectedAvailabilityPlannerModel, OperationsEnum.DELETE) : undefined
						 },
						 {
							 cssClass: 'cancel-button',
							 text: data['option.no'],
							 handler: () =>
							 {
							 }
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

	loadAvailabilityPlannerData(availabilityDate: string)
	{
		this._selectedDate = availabilityDate;
		this.hasData$ = this.availabilityPlannerStateFacade.availabilityPlannerHasData$(availabilityDate);
		this.availabilityPlanners$ = this.availabilityPlannerStateFacade.allAvailabilityPlannerByDate$(availabilityDate);
		this.getAvailabilityPlanner(availabilityDate);
		this.trackAvailabilityPlannerCrudOperationStatus();
		
		// if no data available ... make a api request, else work with store data
		this.hasData$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				hasData =>
				{
					if (!hasData)
					{
						this.translateService
							.get('noData.noAvailabilityPlannerData')
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{
								this.errorMessage = data;
							});
					}
				}
		);
	
		
	}

	/**
	 * Gets course material material
	 */
	async getAvailabilityPlanner(availabilityDate: string)
	{
		this.translateService
			.get('loading.availabilityPlanner')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		const availabilityPlannerModel: AvailabilityPlannerModel = {
			availabilityDate: availabilityDate
		}
		this.availabilityPlannerStateFacade.requestAvailabilityPlanner(availabilityPlannerModel);
	}

	/**
	 * Creates new course material
	 */
	 async createNewAvailabilityPlanner()
	 {
		 // build a empty object
		 const availabilityPlannerModel: AvailabilityPlannerModel = {
			plannerId: '',	
			availabilityDate: this._selectedDate,
			availabilityFrom: this.datePipe.transform(new Date(), 'H:mm:ss'),
			availabilityTo: this.datePipe.transform(new Date(), 'HH:mm:ss'),
			availabilityContext: '',
			onlineMeetingUrl: '',
			onlineMeetingType: '',
			operation: OperationsEnum.CREATE
		 };
 
		 this.availabilityPlannerStateFacade.actUponAvailabilityPlanner(availabilityPlannerModel, OperationsEnum.CREATE);
 
		 //load crud modal
		 this.openCrudAvailabilityPlanner();
	 }
 
	 /**
	  * Determines whether course material action on
	  * @param selectedAvailabilityPlannerModel 
	  * @param operation 
	  * @returns  
	  */
	 public onAvailabilityPlannerAction(selectedAvailabilityPlannerModel: AvailabilityPlannerModel, operation: OperationsEnum)
	 {
		 // add operation to the object
		 const availabilityPlannerModel: AvailabilityPlannerModel = {
			 ...selectedAvailabilityPlannerModel,
			 operation: operation
		 };
 
		 // act upon operation
		 if (operation === OperationsEnum.EDIT)
		 {
			 return selectedAvailabilityPlannerModel ? this.availabilityPlannerStateFacade.actUponAvailabilityPlanner(availabilityPlannerModel, operation) : undefined;
		 }
		 else
		 {
			 return availabilityPlannerModel ? this.checkIfWantToDelete(availabilityPlannerModel) : undefined;
		 }
	 }
 
	 public navigateToAvailabilityPlannerDetails(plannerId: string)
	 {
		 //this.router.navigate([plannerId, 'details', 'article', 'none'], { relativeTo: this.activatedRoute });
	 }
	
	/**
	  * Opens crud course material
	  */
	 async openMentorMenteeList(availabilityPlannerModel: AvailabilityPlannerModel)
	 {
		 const modal = await this.modalController.create({
			 component: MentorMenteeComponent,
			 cssClass: 'modal-view',
			 backdropDismiss: false,
			 componentProps: {
				 plannerId: availabilityPlannerModel.plannerId
			 }
		 });
 
		 // present modal
		 await modal.present();
	 }
}

