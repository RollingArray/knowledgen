/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Crud availability planner component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-22 19:59:56 
 * Last modified  : 2022-09-22 20:00:40
 */

import { DatePipe } from "@angular/common";
import { Component, OnInit, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { UserTypeEnum } from "src/app/shared/enum/user-type.enum";
import { AvailabilityPlannerModel } from "src/app/shared/model/availability-planner.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { AvailabilityPlannerStateFacade } from "src/app/state/availability-planner/availability-planner.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'crud-availability-planner',
	templateUrl: './crud-availability-planner.component.html',
	styleUrls: ['./crud-availability-planner.component.scss'],
})
export class CrudAvailabilityPlannerComponent extends BaseFormComponent implements OnInit {
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
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of crud course material component
	 */
	private _availabilityPlanner!: AvailabilityPlannerModel;

	/**
	 * Modal data of crud course material component
	 */
	private _modalData!: ModalData;

	/**
	 * From  of crud availability planner component
	 */
	private _from = '';

	/**
	 * To  of crud availability planner component
	 */
	private _to = '';

	/**
	 * Key word context of crud availability planner component
	 */
	private _keyWordContext = '';

	/**
	 * @description View child of search skill component
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

	/**
	 * @description Gets page title
	 */
	public get pageTitle() {

		let title = '';
		if (this._availabilityPlanner.operation === OperationsEnum.CREATE) {
			title = 'pageTitle.addSchedule';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.EDIT) {
			title = 'pageTitle.editSchedule';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.DELETE) {
			title = 'pageTitle.deleteSchedule';
		}

		return title;
	}

	/**
	 * Gets page sub title
	 */
	public get pageSubTitle() {

		let title = '';
		if (this._availabilityPlanner.operation === OperationsEnum.CREATE) {
			title = 'pageSubTitle.addSchedule';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.EDIT) {
			title = 'pageSubTitle.editSchedule';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.DELETE) {
			title = 'pageSubTitle.deleteSchedule';
		}

		return title;
	}

	/**
	 * @description Gets loading
	 */
	public get loading() {
		let loading = '';
		if (this._availabilityPlanner.operation === OperationsEnum.CREATE) {
			loading = 'loading.newAvailabilityPlanner';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.EDIT) {
			loading = 'loading.editAvailabilityPlanner';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.DELETE) {
			loading = 'loading.deleteAvailabilityPlanner';
		}

		return loading;
	}

	/**
	 * @description Gets response
	 */
	public get response() {
		let response = '';
		if (this._availabilityPlanner.operation === OperationsEnum.CREATE && this.isUserTypeTeacher) {
			response = 'response.teacherNewAvailabilityPlanner';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.CREATE && this.isUserTypeStudent) {
			response = 'response.studentNewAvailabilityPlanner';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.EDIT) {
			response = 'response.editAvailabilityPlanner';
		}
		else if (this._availabilityPlanner.operation === OperationsEnum.DELETE) {
			response = 'response.deleteAvailabilityPlanner';
		}

		return response;
	}

	/**
	 * Gets course material name
	 */
	get availabilityFrom() {
		return this.formGroup.get('availabilityFrom');
	}

	/**
	 * Gets course material description
	 */
	get availabilityTo() {
		return this.formGroup.get('availabilityTo');
	}

	get availabilityContext() {
		return this.formGroup.get('availabilityContext');
	}

	get onlineMeetingUrl() {
		return this.formGroup.get('onlineMeetingUrl');
	}

	get to(){
		return this._to;
	}

	get from(){
		return this._from;
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

	get isUserTypeTeacher()
	{
		return this.userType === UserTypeEnum.Teacher ? true : false;
	}

	get isUserTypeStudent()
	{
		return this.userType === UserTypeEnum.Student ? true : false;
	}

	get keyWordContext()
	{
		return this._keyWordContext;
	}

	get availabilityPlanner()
	{
		return this._availabilityPlanner;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of crud availability planner component.
	 * @param injector 
	 * @param toastService 
	 * @param translateService 
	 * @param alertService 
	 * @param availabilityPlannerStateFacade 
	 * @param rootStateFacade 
	 * @param datePipe 
	 */
	constructor(
		injector: Injector,
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private availabilityPlannerStateFacade: AvailabilityPlannerStateFacade,
		private rootStateFacade: RootStateFacade,
		private datePipe: DatePipe
	) {
		super(injector);

		// get act upon curd model from store
		this.availabilityPlannerStateFacade
			.operationAvailabilityPlanner$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data => this._availabilityPlanner = data
			);

		// build form
		this.buildFrom();

		//if the operation is delete, submit the data
		if (this._availabilityPlanner.operation === OperationsEnum.DELETE) {
			this.submit();
		}
	}

	/**
	 * on init
	 */
	ngOnInit() {
		//
	}

	ngAfterViewInit() {
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Sets passed value to from
	 */
	private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.availabilityContext = this._availabilityPlanner.availabilityDate;
		form.onlineMeetingUrl = this._availabilityPlanner.onlineMeetingUrl;
		this._from = this._availabilityPlanner.availabilityFrom;
		this._to = this._availabilityPlanner.availabilityTo;
	}

	/**
	 * Builds from
	 */
	private buildFrom() {
		
		this.formGroup = this.formBuilder.group({
			availabilityContext: [
				this._availabilityPlanner.availabilityContext,
				this.validators().compose([
					// tslint:disable:no-unbound-method 
					this.validators().required
				]),
			],
			onlineMeetingUrl: [
				this._availabilityPlanner.onlineMeetingUrl,
				this.validators().compose([
					// tslint:disable:no-unbound-method 
				]),
			],
		});

		this.setPassedValueToFrom();
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass() {
		// build data
		const form = this.formGroup.value;
		const model: AvailabilityPlannerModel = {
			plannerId: form.plannerId,
			availabilityDate : this._availabilityPlanner.availabilityDate,
			availabilityFrom : this.submitTimeFormat(this._from),
			availabilityTo : this.submitTimeFormat(this._to),
			availabilityContext : form.availabilityContext,
			onlineMeetingUrl : form.onlineMeetingUrl,
			onlineMeetingType: 'Zoom',
			operationType: this._availabilityPlanner.operation,
		};

		return model;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Inits loading
	 */
	private initLoading() {
		const loading = this.loading;
		
		// present loader
		this.translateService
			.get(loading)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) => {
				await this.rootStateFacade.startLoading(data);
			});
	}

	/**
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion() {
		this.availabilityPlannerStateFacade
			.availabilityPlannerCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) => {

				switch (operationsStatus) {
					case OperationsEnum.SUCCESS:

						const response = this.response;

						// show tost
						this.translateService
							.get(response)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) => {

								// success response
								this.toastService.presentToast(
									data
								);
							});

						// dismiss modal
						this.closeModal();

						break;

					default:
						break;
				}
			});
	}

	/**
	 * Launchs operation
	 */
	private launchOperation() {

		const availabilityPlannerModel: AvailabilityPlannerModel = this.buildDataModelToPass();

		switch (this._availabilityPlanner.operation) {
			case OperationsEnum.CREATE:
				this.availabilityPlannerStateFacade.addNewAvailabilityPlanner(availabilityPlannerModel);
				break;
			case OperationsEnum.EDIT:
				this.availabilityPlannerStateFacade.editAvailabilityPlanner(availabilityPlannerModel);
				break;
			case OperationsEnum.DELETE:
				this.availabilityPlannerStateFacade.deleteAvailabilityPlanner(availabilityPlannerModel);
				break;
			default:
				break;
		}
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
		if (this.formGroup.invalid) {
			this.translateService
				.get([
					'errorMessage.notAllowed',
					'errorMessage.mandatory'
				])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) => {
					this.alertService.presentAlert(
						data['errorMessage.notAllowed'],
						data['errorMessage.mandatory'],
						data['button.ok'],
					);
				});
		} else {
			this.initLoading();
			this.launchOperation();
			this.crudOperationCompletion();
		}
	}

	/**
	 * Closes modal
	 */
	public closeModal() {
		// discard active crud operation
		const availabilityPlannerModel: AvailabilityPlannerModel = {};
		this.availabilityPlannerStateFacade.actUponAvailabilityPlanner(availabilityPlannerModel, OperationsEnum.NONE);

		this.modalController.dismiss();
	}

	formatDate(date: string, type: string)
	{
		const fillDate = `${this._availabilityPlanner.availabilityDate} ${date}:00`

		const form = this.formGroup.value;
		switch (type) {
			case 'availabilityFrom':
				this._from = this.datePipe.transform(fillDate, 'H:mm:ss');
				break;
			case 'availabilityTo':
				this._to = this.datePipe.transform(fillDate, 'H:mm:ss');
				break;
		
			default:
				break;
		}
	}

	submitTimeFormat(time: string)
	{
		const fillDate = `${this._availabilityPlanner.availabilityDate} ${time}`

		return this.datePipe.transform(fillDate, 'HH:mm:ss');
	}

	extractKeyWords()
	{
		const form = this.formGroup.value;
		return this._keyWordContext = form.availabilityContext;
	}
}
