/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material type component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-06-30 12:28:23
 * Last modified  : 2022-06-30 21:06:30
 */

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ApiUrls } from 'src/app/shared/constant/api-urls.constant';
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { Regex } from 'src/app/shared/constant/regex.constant';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { ToastService } from 'src/app/shared/service/toast.service';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { BaseFormComponent } from '../base/base-form.component';
import { AlertService } from 'src/app/shared/service/alert.service';
import { CourseMaterialTypeIdEnum } from 'src/app/shared/enum/course-material-type-id.enum';
import { MenuTypeEnum } from 'src/app/shared/enum/menu-type.enum';
import { CourseMaterialMenuStateFacade } from 'src/app/state/course-material-menu/course-material-menu.state.facade';
import { SubChildMenuModel } from 'src/app/shared/model/sub-child-menu.model';
import { ChildMenuModel } from 'src/app/shared/model/child-menu.model';
import { ParentMenuModel } from 'src/app/shared/model/parent-menu.model';
import { NavParams } from '@ionic/angular';
import { CourseMaterialTypeModel } from 'src/app/shared/model/course-material-type.model';

@Component({
	selector: 'crud-course-material-type',
	templateUrl: './crud-course-material-type.component.html',
	styleUrls: ['./crud-course-material-type.component.scss'],
})
export class CrudCourseMaterialTypeComponent
	extends BaseFormComponent
	implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description									    |
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

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
	 * Description  of crud course material type component
	 */
	private _menuType: MenuTypeEnum;
	
	/**
	 * Description  of crud course material type component
	 */
	private _subChildMenuModel!: SubChildMenuModel;

	/**
	 * Child menu model of crud course material type component
	 */
	private _childMenuModel!: ChildMenuModel;

	/**
	 * Parent menu model of crud course material type component
	 */
	private _parentMenuModel!: ParentMenuModel;

	/**
	 * Course material type id of crud course material type component
	 */
	private _courseMaterialTypeId = CourseMaterialTypeIdEnum.TD;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Getter & @Setters								|
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

	/**
	 * Gets description
	 */
	get courseMaterialTypeId()
	 {
		 return this._courseMaterialTypeId;
	 }

	/**
	 * Gets operation type
	 * @returns  
	 */
	private getOperationType()
	{
		let operation: OperationsEnum;

		switch (this._menuType)
		{
			case MenuTypeEnum.PARENT_MENU:
				operation = this._parentMenuModel.operationType;
				break;
			case MenuTypeEnum.CHILD_MENU:
				operation = this._childMenuModel.operationType;
				break;
			case MenuTypeEnum.SUB_CHILD_MENU:
				operation = this._subChildMenuModel.operationType;
				break;
			default:
				break;
		}

		return operation;
	}

	/**
	 * @description Gets page title
	 */
	public get pageTitle()
	{
		let title = '';
		const operation = this.getOperationType();
		if (operation === OperationsEnum.CREATE)
		{
			title = 'pageTitle.addCourseMenu';
		} else if (operation === OperationsEnum.EDIT)
		{
			title = 'pageTitle.editCourseMenu';
		} else if (operation === OperationsEnum.DELETE)
		{
			title = 'pageTitle.deleteCourseMenu';
		}

		return title;
	}

	/**
	 * Gets page sub title
	 */
	public get pageSubTitle()
	{
		let title = '';
		const operation = this.getOperationType();
		if (operation === OperationsEnum.CREATE)
		{
			title = 'pageSubTitle.addCourseMenu';
		} else if (operation === OperationsEnum.EDIT)
		{
			title = 'pageSubTitle.editCourseMenu';
		} else if (operation === OperationsEnum.DELETE)
		{
			title = 'pageSubTitle.deleteCourseMenu';
		}

		return title;
	}

	/**
	 * @description Gets loading
	 */
	public get loading()
	{
		let loading = '';
		const operation = this.getOperationType();
		if (operation === OperationsEnum.CREATE)
		{
			loading = 'loading.newCourseMaterialMenu';
		} else if (operation === OperationsEnum.EDIT)
		{
			loading = 'loading.editCourseMaterialMenu';
		} else if (operation === OperationsEnum.DELETE)
		{
			loading = 'loading.deleteCourseMaterialMenu';
		}

		return loading;
	}

	/**
	 * @description Gets response
	 */
	public get response()
	{
		let response = '';
		const operation = this.getOperationType();
		if (operation === OperationsEnum.CREATE)
		{
			response = 'response.newCourseMaterialMenu';
		} else if (operation === OperationsEnum.EDIT)
		{
			response = 'response.editCourseMaterialMenu';
		} else if (operation === OperationsEnum.DELETE)
		{
			response = 'response.deleteCourseMaterialMenu';
		}

		return response;
	}

	/**
	 * Gets course material name
	 */
	get articleTitle()
	{
		return this.formGroup.get('articleTitle');
	}

	/**
	 * Gets allow editable fields
	 */
	public get allowEditableFields()
	 {
		 let allowed = false;
		 const operation = this.getOperationType();
		 if (operation === OperationsEnum.CREATE)
		 {
			allowed = true;
		 } else if (operation === OperationsEnum.EDIT)
		 {
			allowed = false;
		 } else if (operation === OperationsEnum.DELETE)
		 {
			allowed = false;
		 }
 
		 return allowed;
	}
	
	/**
	 * Gets article title from model
	 */
	get articleTitleFromModel()
	 {
		 switch (this._menuType)
		 {
			 case MenuTypeEnum.PARENT_MENU:
				 return this._parentMenuModel.articleTitle;
				 break;
			 case MenuTypeEnum.CHILD_MENU:
				return this._childMenuModel.articleTitle;
				 break;
			 case MenuTypeEnum.SUB_CHILD_MENU:
				return this._subChildMenuModel.articleTitle;
				 break;
 
			 default:
				 break;
		 }
	}
	
	/**
	 * Gets whether is operation delete
	 */
	public get isOperationDelete()
	 {
		const operation = this.getOperationType();
		return operation === OperationsEnum.DELETE ? true : false;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of crud course material type component.
	 * @param injector 
	 * @param toastService 
	 * @param translateService 
	 * @param alertService 
	 * @param courseMaterialMenuStateFacade 
	 * @param rootStateFacade 
	 * @param navParams 
	 */
	constructor(
		injector: Injector,
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private courseMaterialMenuStateFacade: CourseMaterialMenuStateFacade,
		private rootStateFacade: RootStateFacade,
		public navParams: NavParams,
	)
	{
		super(injector);
		this._menuType = this.navParams.get('menuType');
		
		this.buildSegmentedData();

		// build form
		this.buildFrom();

		//find menu type and if the operation is delete, submit the data
		this.initiateDeleteOperation();
		
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
	 * Builds segmented data
	 */
	 private buildSegmentedData()
	 {
		 switch (this._menuType)
		 {
			 case MenuTypeEnum.PARENT_MENU:
 
				 // get act upon curd model from store
				 this.courseMaterialMenuStateFacade.operationParentMenu$.subscribe(
					 (data) => (this._parentMenuModel = data)
				 );
				 break;
			 case MenuTypeEnum.CHILD_MENU:
 
				 // get act upon curd model from store
				 this.courseMaterialMenuStateFacade.operationChildMenu$.subscribe(
					 (data) => (this._childMenuModel = data)
				 );
				 break;
 
			 case MenuTypeEnum.SUB_CHILD_MENU:
 
				 // get act upon curd model from store
				 this.courseMaterialMenuStateFacade.operationSubChildMenu$.subscribe(
					 (data) => (this._subChildMenuModel = data)
				 );
				 break;
 
			 default:
				 break;
		 }
	 }
 
	 /**
	  * Initiates delete operation
	  */
	 private initiateDeleteOperation()
	 {
		 switch (this._menuType)
		 {
			 case MenuTypeEnum.PARENT_MENU:
 
				 if (this._parentMenuModel.operationType === OperationsEnum.DELETE)
				 {
					 this.submit();
				 }
				 break;
			 case MenuTypeEnum.CHILD_MENU:
 
				 if (this._childMenuModel.operationType === OperationsEnum.DELETE)
				 {
					 this.submit();
				 }
				 break;
 
			 case MenuTypeEnum.SUB_CHILD_MENU:
 
				 if (this._subChildMenuModel.operationType === OperationsEnum.DELETE)
				 {
					 this.submit();
				 }
				 break;
 
			 default:
				 break;
		 }
	 }
	
	/**
	 * Sets passed value to from
	 */
	private setPassedValueToFrom()
	{
		const form = this.formGroup.value;
		form.articleTitle = this.articleTitleFromModel;
	}

	/**
	 * Builds from
	 */
	private buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			articleTitle: [
				this.articleTitleFromModel,
				this.validators().compose([
					// tslint:disable:no-unbound-method
					this.validators().required,
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
		switch (this._menuType)
		{
			case MenuTypeEnum.PARENT_MENU:
				const parentMenuModel: ParentMenuModel = {
					...this._parentMenuModel,
					articleTitle: form.articleTitle,
					courseMaterialTypeId: this._courseMaterialTypeId
				};

				return parentMenuModel;

				break;
			case MenuTypeEnum.CHILD_MENU:
				const childMenuModel: ChildMenuModel = {
					...this._childMenuModel,
					articleTitle: form.articleTitle,
					courseMaterialTypeId: this._courseMaterialTypeId
				};

				return childMenuModel;
				break;
			case MenuTypeEnum.SUB_CHILD_MENU:
				const subChildMenuModel: SubChildMenuModel = {
					...this._subChildMenuModel,
					articleTitle: form.articleTitle,
					courseMaterialTypeId: this._courseMaterialTypeId
				};

				return subChildMenuModel;
				break;

			default:
				break;
		}
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
	private initLoading()
	{
		const loading = this.loading;

		// present loader
		this.translateService
			.get(loading)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});
	}

	/**
	 * @description Cruds operation completion
	 */
	private crudOperationCompletion()
	{
		switch (this._menuType)
		{
			case MenuTypeEnum.PARENT_MENU:
				this.courseMaterialMenuStateFacade.parentMenuCurdOperationStatus$
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (operationsStatus: OperationsEnum) =>
					{
						this.operationCompletionStatusFollowUp(operationsStatus);
					});
				break;
			case MenuTypeEnum.CHILD_MENU:
				this.courseMaterialMenuStateFacade.childMenuCurdOperationStatus$
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (operationsStatus: OperationsEnum) =>
					{
						this.operationCompletionStatusFollowUp(operationsStatus);
					});
				break;
			case MenuTypeEnum.SUB_CHILD_MENU:
				this.courseMaterialMenuStateFacade.subChildMenuCurdOperationStatus$
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (operationsStatus: OperationsEnum) =>
					{
						this.operationCompletionStatusFollowUp(operationsStatus);
					});
				break;
			default:
				break;
		}
	}

	/**
	 * Operations completion status follow up
	 * @param operationsStatus 
	 */
	private operationCompletionStatusFollowUp(operationsStatus: OperationsEnum)
	{
		switch (operationsStatus)
		{
			
			case OperationsEnum.SUCCESS:
				
				const response = this.response;
				
				// show tost
				this.translateService
					.get(response)
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (data: string) =>
					{
						// success response
						this.toastService.presentToast(data);
					});

				// dismiss modal
				this.closeModal();

				break;

			default:
				break;
		}
	}

	/**
	 * Launchs operation
	 */
	private launchOperation()
	{
		switch (this._menuType)
		{
			case MenuTypeEnum.PARENT_MENU:
				this.parentMenuOperations();
				break;
			case MenuTypeEnum.CHILD_MENU:
				this.childMenuOperations();
				break;
			case MenuTypeEnum.SUB_CHILD_MENU:
				this.subChildMenuOperations();
				break;
			default:
				break;
		}
	}

	/**
	 * Parents menu operations
	 */
	private parentMenuOperations()
	{
		switch (this.getOperationType())
		{
			case OperationsEnum.CREATE:
				this.courseMaterialMenuStateFacade.addNewParentMenu(
					this.buildDataModelToPass()
				);
				break;
			case OperationsEnum.EDIT:
				this.courseMaterialMenuStateFacade.editParentMenu(
					this.buildDataModelToPass()
				);
				break;
			case OperationsEnum.DELETE:
				this.courseMaterialMenuStateFacade.deleteParentMenu(
					this.buildDataModelToPass()
				);
				break;
			default:
				break;
		}
	}

	/**
	 * Childs menu operations
	 */
	private childMenuOperations()
	{
		switch (this.getOperationType())
		{
			case OperationsEnum.CREATE:
				this.courseMaterialMenuStateFacade.addNewChildMenu(
					this.buildDataModelToPass()
				);
				break;
			case OperationsEnum.EDIT:
				this.courseMaterialMenuStateFacade.editChildMenu(
					this.buildDataModelToPass()
				);
				break;
			case OperationsEnum.DELETE:
				this.courseMaterialMenuStateFacade.deleteChildMenu(
					this.buildDataModelToPass()
				);
				break;
			default:
				break;
		}
	}

	/**
	 * Subs child menu operations
	 */
	private subChildMenuOperations()
	{
		switch (this.getOperationType())
		{
			case OperationsEnum.CREATE:
				this.courseMaterialMenuStateFacade.addNewSubChildMenu(
					this.buildDataModelToPass()
				);
				break;
			case OperationsEnum.EDIT:
				this.courseMaterialMenuStateFacade.editSubChildMenu(
					this.buildDataModelToPass()
				);
				break;
			case OperationsEnum.DELETE:
				this.courseMaterialMenuStateFacade.deleteSubChildMenu(
					this.buildDataModelToPass()
				);
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
	 * Selects material type id
	 * @param courseMaterialTypeId
	 */
	async selectMaterialTypeId(courseMaterialTypeId: CourseMaterialTypeIdEnum)
	{
		this._courseMaterialTypeId = courseMaterialTypeId;
	}

	/**
	 * Submits crud course material type component
	 */
	async submit()
	{
		if (this.formGroup.invalid)
		{
			this.translateService
				.get(['errorMessage.notAllowed', 'errorMessage.mandatory'])
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data) =>
				{
					this.alertService.presentAlert(
						data['errorMessage.notAllowed'],
						data['errorMessage.mandatory'],
						data['button.ok']
					);
				});
		} else
		{
			this.initLoading();
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
		switch (this._menuType)
		{
			case MenuTypeEnum.PARENT_MENU:
				this.courseMaterialMenuStateFacade.actUponParentMenu(
					{},
					OperationsEnum.NONE
				);
				break;
			case MenuTypeEnum.CHILD_MENU:
				this.courseMaterialMenuStateFacade.actUponChildMenu(
					{},
					OperationsEnum.NONE
				);
				break;
			case MenuTypeEnum.SUB_CHILD_MENU:
				this.courseMaterialMenuStateFacade.actUponSubChildMenu(
					{},
					OperationsEnum.NONE
				);
			default:
				break;
		}
		
		// dismiss modal view
		setTimeout(() =>
		{
			this.modalController.dismiss();
		}, 10);
		
	}

	/**
	 * Selected course material type
	 * @param courseMaterialType 
	 * @returns  
	 */
	public selectedCourseMaterialType(courseMaterialType: CourseMaterialTypeModel)
	{
		return this._courseMaterialTypeId === courseMaterialType.id ? 'success' : 'primary';
	}
}
