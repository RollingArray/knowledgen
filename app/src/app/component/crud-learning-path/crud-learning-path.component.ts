/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Crud course material component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-04 19:38:45 
 * Last modified  : 2022-09-07 17:10:08
 */

import { Component, OnInit, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/internal/Observable";
import { takeUntil } from "rxjs/operators";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { LearningPathModel } from "src/app/shared/model/learning-path.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { LearningPathStateFacade } from "src/app/state/learning-path/learning-path.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseFormComponent } from "../base/base-form.component";


@Component({
	selector: 'crud-learning-path',
	templateUrl: './crud-learning-path.component.html',
	styleUrls: ['./crud-learning-path.component.scss'],
})
export class CrudLearningPathComponent extends BaseFormComponent implements OnInit
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
	private _learningPath!: LearningPathModel;

	/**
	 * Modal data of crud learning path component
	 */
	private _modalData: ModalData;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	
	 public loadingIndicatorStatus$: Observable<boolean>

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	public get learningPath()
	{
		return this._learningPath;
	}

	/**
	 * @description Gets page title
	 */
	public get pageTitle()
	{

		let title = '';
		if (this._learningPath.operationType === OperationsEnum.CREATE)
		{
			title = 'pageTitle.addToLearningPath';
		}
		else if (this._learningPath.operationType === OperationsEnum.DELETE)
		{
			title = 'pageTitle.deleteToLearningPath';
		}

		return title;
	}

	/**
	 * Gets page sub title
	 */
	public get pageSubTitle()
	{

		let title = '';
		if (this._learningPath.operationType === OperationsEnum.CREATE)
		{
			title = 'pageSubTitle.addToLearningPath';
		}
		else if (this._learningPath.operationType === OperationsEnum.DELETE)
		{
			title = 'pageSubTitle.deleteLearningPath';
		}

		return title;
	}

	/**
	 * @description Gets loading
	 */
	public get loading()
	{
		let loading = '';
		if (this._learningPath.operationType === OperationsEnum.CREATE)
		{
			loading = 'loading.newLearningPath';
		}
		else if (this._learningPath.operationType === OperationsEnum.DELETE)
		{
			loading = 'loading.deleteLearningPath';
		}

		return loading;
	}

	/**
	 * @description Gets response
	 */
	public get response()
	{
		let response = '';
		if (this._learningPath.operationType === OperationsEnum.CREATE)
		{
			response = 'response.newLearningPath';
		}
		else if (this._learningPath.operationType === OperationsEnum.DELETE)
		{
			response = 'response.deleteLearningPath';
		}

		return response;
	}

	/**
	 * Gets whether is operation delete
	 */
	public get isOperationDelete()
	{
		return this._learningPath.operationType === OperationsEnum.DELETE ? true : false;
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
	 * @param learningPathStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private toastService: ToastService,
		private translateService: TranslateService,
		private alertService: AlertService,
		private learningPathStateFacade: LearningPathStateFacade,
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);

		this.loadingIndicatorStatus$ = this.rootStateFacade.loadingIndicatorStatus$;

		// get act upon curd model from store
		this.learningPathStateFacade.operationLearningPath$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				
				data => this._learningPath = data
			);

		//if the operation is delete, submit the data
		if (this._learningPath.operationType === OperationsEnum.DELETE)
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
		this.learningPathStateFacade
			.learningPathCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
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
								this.toastService.presentToast(
									data
								);
							});

							this._modalData = {
								cancelled: false,
								operationSubmitted: true,
							};
						
						// dismiss modal
						this.dismissModal();

						

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

		switch (this._learningPath.operationType)
		{
			case OperationsEnum.CREATE:
				this.learningPathStateFacade.addNewLearningPath(this._learningPath);
				break;
			case OperationsEnum.DELETE:
				this.learningPathStateFacade.deleteLearningPath(this._learningPath);
				break;
			default:
				break;
		}
	}

	dismissModal()
	{
		// discard active crud operation
		const learningPathModel: LearningPathModel = {};
		this.learningPathStateFacade.actUponLearningPath(learningPathModel, OperationsEnum.NONE);

		// dismiss modal view
		setTimeout(() =>
		{
			this.modalController.dismiss(this._modalData).then(() => { });
		}, 10);
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
		this.rootStateFacade.startLoading('');
		this.launchOperation();
		this.crudOperationCompletion();
	}

	/**
	 * Closes modal
	 */
	closeModal()
	{
		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};

		// store active user
		this.dismissModal();
	}
}
