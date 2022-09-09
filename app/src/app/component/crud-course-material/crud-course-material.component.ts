/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:38:45 
 * Last modified  : 2022-08-02 20:23:10
 */

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Injector } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { CourseMaterialModel } from "src/app/shared/model/course-material.model";
import { ToastService } from "src/app/shared/service/toast.service";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";
import { CourseMaterialStateFacade } from 'src/app/state/course-material/course-material.state.facade';
import { AlertService } from 'src/app/shared/service/alert.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'crud-course-material',
	templateUrl: './crud-course-material.component.html',
	styleUrls: ['./crud-course-material.component.scss'],
})
export class CrudCourseMaterialComponent extends BaseFormComponent implements OnInit
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
	private _courseMaterial!: CourseMaterialModel;

	/**
	 * Key word context of crud course material component
	 */
	private _keyWordContext = '';

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	 public modalLoadingIndicatorStatus$: Observable<boolean>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Gets page title
	 */
	public get pageTitle()
	{

		let title = '';
		if (this._courseMaterial.operation === OperationsEnum.CREATE)
		{
			title = 'pageTitle.addCourse';
		}
		else if (this._courseMaterial.operation === OperationsEnum.EDIT)
		{
			title = 'pageTitle.editCourse';
		}
		else if (this._courseMaterial.operation === OperationsEnum.DELETE)
		{
			title = 'pageTitle.deleteCourse';
		}

		return title;
	}

	/**
	 * Gets page sub title
	 */
	public get pageSubTitle()
	{

		let title = '';
		if (this._courseMaterial.operation === OperationsEnum.CREATE)
		{
			title = 'pageSubTitle.addCourse';
		}
		else if (this._courseMaterial.operation === OperationsEnum.EDIT)
		{
			title = 'pageSubTitle.editCourse';
		}
		else if (this._courseMaterial.operation === OperationsEnum.DELETE)
		{
			title = 'pageSubTitle.deleteCourse';
		}

		return title;
	}

	/**
	 * @description Gets loading
	 */
	public get loading()
	{
		let loading = '';
		if (this._courseMaterial.operation === OperationsEnum.CREATE)
		{
			loading = 'loading.newCourseMaterial';
		}
		else if (this._courseMaterial.operation === OperationsEnum.EDIT)
		{
			loading = 'loading.editCourseMaterial';
		}
		else if (this._courseMaterial.operation === OperationsEnum.DELETE)
		{
			loading = 'loading.deleteCourseMaterial';
		}

		return loading;
	}

	/**
	 * @description Gets response
	 */
	public get response()
	{
		let response = '';
		if (this._courseMaterial.operation === OperationsEnum.CREATE)
		{
			response = 'response.newCourseMaterial';
		}
		else if (this._courseMaterial.operation === OperationsEnum.EDIT)
		{
			response = 'response.editCourseMaterial';
		}
		else if (this._courseMaterial.operation === OperationsEnum.DELETE)
		{
			response = 'response.deleteCourseMaterial';
		}

		return response;
	}

	/**
	 * Gets course material name
	 */
	get courseMaterialName()
	{
		return this.formGroup.get('courseMaterialName');
	}

	/**
	 * Gets course material description
	 */
	get courseMaterialDescription()
	{
		return this.formGroup.get('courseMaterialDescription');
	}

	/**
	 * Gets key word context
	 */
	get keyWordContext()
	{
		return this._keyWordContext;
	}

	/**
	 * Gets whether is operation delete
	 */
	public get isOperationDelete()
	{
		return this._courseMaterial.operation === OperationsEnum.DELETE ? true : false;
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
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);

		// check status of modal indicator status
		this.modalLoadingIndicatorStatus$ = this.rootStateFacade.modalLoadingIndicatorStatus$;

		// get act upon curd model from store
		this.courseMaterialStateFacade.operationCourseMaterial$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data => this._courseMaterial = data
			);

		// build form
		this.buildFrom();

		//if the operation is delete, submit the data
		if (this._courseMaterial.operation === OperationsEnum.DELETE)
		{
			this.submit();
		}
	}

	/**
	 * on init
	 */
	ngOnInit()
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
	 * Sets passed value to from
	 */
	private setPassedValueToFrom()
	{
		const form = this.formGroup.value;
		form.courseMaterialName = this._courseMaterial.courseMaterialName;
		form.courseMaterialDescription = this._courseMaterial.courseMaterialDescription;
	}

	/**
	 * Builds from
	 */
	private buildFrom()
	{

		this.formGroup = this.formBuilder.group({
			courseMaterialName: [
				this._courseMaterial.courseMaterialName,
				this.validators().compose([
					// tslint:disable:no-unbound-method 
					this.validators().required
				]),
			],
			courseMaterialDescription: [
				this._courseMaterial.courseMaterialDescription,
				this.validators().compose([
					// tslint:disable:no-unbound-method 
					this.validators().required
				]),
			],
		});

		this.setPassedValueToFrom();
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass()
	{
		// build data
		const form = this.formGroup.value;
		const model: CourseMaterialModel = {
			courseMaterialId: this._courseMaterial.courseMaterialId,
			courseMaterialName: form.courseMaterialName,
			courseMaterialDescription: form.courseMaterialDescription,
			operation: this._courseMaterial.operation,
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
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion()
	{
		this.courseMaterialStateFacade
			.courseMaterialCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{

				switch (operationsStatus)
				{
					case OperationsEnum.SUCCESS:

						const response = this.response;

						// remove loading indicator
						this.rootStateFacade.stopModalLoading();
						
						// show tost
						this.translateService
							.get(response)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{

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
	private launchOperation()
	{

		const courseMaterialModel: CourseMaterialModel = this.buildDataModelToPass();

		switch (this._courseMaterial.operation)
		{
			case OperationsEnum.CREATE:
				this.courseMaterialStateFacade.addNewCourseMaterial(courseMaterialModel);
				break;
			case OperationsEnum.EDIT:
				this.courseMaterialStateFacade.editCourseMaterial(courseMaterialModel);
				break;
			case OperationsEnum.DELETE:
				this.courseMaterialStateFacade.deleteCourseMaterial(courseMaterialModel);
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
		if (this.formGroup.invalid)
		{
			this.translateService
				.get([
					'errorMessage.notAllowed',
					'errorMessage.mandatory'
				])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) =>
				{
					this.alertService.presentAlert(
						data['errorMessage.notAllowed'],
						data['errorMessage.mandatory'],
						data['button.ok'],
					);
				});
		} else
		{
			this.rootStateFacade.startModalLoading();
			this.launchOperation();
			this.crudOperationCompletion();
		}
	}

	/**
	 * Closes modal
	 */
	public closeModal()
	{
		// discard active crud operation
		const courseMaterialModel: CourseMaterialModel = {};
		this.courseMaterialStateFacade.actUponCourseMaterial(courseMaterialModel, OperationsEnum.NONE);

		// dismiss modal view
		setTimeout(() =>
		{
			this.modalController.dismiss();
		}, 10);
	}

	/**
	 * Extracts key words
	 * @returns  
	 */
	extractKeyWords()
	{
		const form = this.formGroup.value;
		return this._keyWordContext = form.availabilityContext;
	}
}
