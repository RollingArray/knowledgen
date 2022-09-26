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
import { Component, OnInit, Injector, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
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
import { AnimationController } from '@ionic/angular';
import { CoreSubjectAreaModel } from 'src/app/shared/model/core-subject-area.model';

@Component({
	selector: 'crud-course-material',
	templateUrl: './crud-course-material.component.html',
	styleUrls: ['./crud-course-material.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	 * Private animation duration of user peer component
	 */
	private _animationDuration = 100;

	/**
	 * Transition height of user peer component
	 */
	private _transitionHeight = -291;

	/**
	 * Selected subject area of crud course material component
	 */
	private _selectedSubjectArea: CoreSubjectAreaModel;

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
		if (this._courseMaterial.operationType === OperationsEnum.CREATE)
		{
			title = 'pageTitle.addCourse';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.EDIT)
		{
			title = 'pageTitle.editCourse';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.DELETE)
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
		if (this._courseMaterial.operationType === OperationsEnum.CREATE)
		{
			title = 'pageSubTitle.addCourse';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.EDIT)
		{
			title = 'pageSubTitle.editCourse';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.DELETE)
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
		if (this._courseMaterial.operationType === OperationsEnum.CREATE)
		{
			loading = 'loading.newCourseMaterial';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.EDIT)
		{
			loading = 'loading.editCourseMaterial';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.DELETE)
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
		if (this._courseMaterial.operationType === OperationsEnum.CREATE)
		{
			response = 'response.newCourseMaterial';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.EDIT)
		{
			response = 'response.editCourseMaterial';
		}
		else if (this._courseMaterial.operationType === OperationsEnum.DELETE)
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
		return this._courseMaterial.operationType === OperationsEnum.DELETE ? true : false;
	}

	/**
	 * Gets selected subject area
	 */
	public get selectedSubjectArea()
	{
		return this._selectedSubjectArea;
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
	@ViewChild("dropSelector", { read: ElementRef, static: true }) dropSelector: ElementRef;

	/**
	 * View child of user peer component
	 */
	@ViewChild("dropSelectorBackdrop", { read: ElementRef, static: true }) dropSelectorBackdrop: ElementRef;

	/**
	 * View child of user peer component
	 */
	@ViewChild("coreSubjectAreaSearchDropSelector", { read: ElementRef, static: true }) coreSubjectAreaSearchDropSelector: ElementRef;


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
		private rootStateFacade: RootStateFacade,
		private animationController: AnimationController,
		private changeDetectorRef: ChangeDetectorRef
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.dropSelectorBackdrop.nativeElement.hidden = true;

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
		if (this._courseMaterial.operationType === OperationsEnum.DELETE)
		{
			this.checkIfWantToDelete();
		}
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

		// set default subject area
		this._selectedSubjectArea = {
			subjectAreaId: this._courseMaterial.subjectAreaId,
			subjectAreaName: this._courseMaterial.subjectAreaName,
		}
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
			subjectAreaId: this._selectedSubjectArea.subjectAreaId,
			subjectAreaName: this._selectedSubjectArea.subjectAreaName,
			operationType: this._courseMaterial.operationType,
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
						
						if (response)
						{
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
						}


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

		switch (this._courseMaterial.operationType)
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
	 * Checks if want to delete
	 * @param selectedCourseMaterialModel 
	 */
	 private checkIfWantToDelete()
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
							 handler: (_) => this.submit()
						 },
						 {
							 cssClass: 'cancel-button',
							 text: data['option.no'],
							 handler: () => this.closeModal()
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
		return this._keyWordContext = form.courseMaterialDescription;
	}

	/**
	 * Opens crud peer drop selector
	 */
	async openCoreSubjectAreaSearchDropSelector()
	{
		//hide drop selectors
		this.dropSelectorBackdrop.nativeElement.hidden = false;
		this.coreSubjectAreaSearchDropSelector.nativeElement.hidden = false;

		// animate to open it
		const animation = this.animationController
			.create()
			.addElement(this.dropSelector.nativeElement)
			.duration(this._animationDuration)
			.fromTo("transform", "translateY(0px)", `translateY(${this._transitionHeight}px)`);
		animation.play();
	}

	/**
	 * Closes crud peer drop selector
	 */
	async closeCoreSubjectAreaSearchDropSelector()
	{
		this.dropSelectorBackdrop.nativeElement.hidden = true;
		const animation = this.animationController
			.create()
			.addElement(this.dropSelector.nativeElement)
			.duration(this._animationDuration)
			.fromTo("transform", `translateY(${this._transitionHeight}px)`, "translateY(0px)");
		animation.play();
	}

	public addSearchResult(searchResultCoreSubjectArea: CoreSubjectAreaModel)
	{
		this._selectedSubjectArea = {
			subjectAreaId: searchResultCoreSubjectArea.subjectAreaId,
			subjectAreaName: searchResultCoreSubjectArea.subjectAreaName,
		}

		this.closeCoreSubjectAreaSearchDropSelector();
	}
}
