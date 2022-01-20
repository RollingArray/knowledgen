/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-01-20 01:23:05
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { Observable } from 'rxjs';
import { CourseMaterialStateFacade } from 'src/app/state/course-material/course-material.state.facade';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { takeUntil } from 'rxjs/operators';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { TranslateService } from '@ngx-translate/core';
import { CrudCourseMaterialComponent } from 'src/app/component/crud-course-material/crud-course-material.component';

@Component({
	selector: "project-users",
	templateUrl: "./course-material.page.html",
	styleUrls: ["./course-material.page.scss"]
})
export class CourseMaterialPage extends BaseViewComponent implements OnInit, OnDestroy
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

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of course material page
	 */
	courseMaterials$!: Observable<CourseMaterialModel[]>;

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
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */
	/**
	 * Creates an instance of course material page.
	 * @param injector 
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService,
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
		this.loadData();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions course material page
	 */
	private trackCourseMaterialCrudOperationStatus()
	{
		this.courseMaterialStateFacade
			.courseMaterialCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (operationsStatus: OperationsEnum) =>
			{

				// track operation status and  
				switch (operationsStatus)
				{
					case OperationsEnum.EDIT:
						this.openCrudCourseMaterial();
						break;
					case OperationsEnum.DELETE:
						this.openCrudCourseMaterial();
						break;
					default:
						break;
				}
			});
	}

	/**
	 * Opens crud course material
	 */
	private async openCrudCourseMaterial()
	{
		const modal = await this.modalController.create({
			component: CrudCourseMaterialComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
		});

		// present modal
		await modal.present();
	}

	/**
	 * Checks if want to delete
	 * @param selectedCourseMaterialModel 
	 */
	private checkIfWantToDelete(selectedCourseMaterialModel: CourseMaterialModel)
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
							handler: (_) => selectedCourseMaterialModel ? this.courseMaterialStateFacade.actUponCourseMaterial(selectedCourseMaterialModel, OperationsEnum.DELETE) : undefined
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

	/**
	 * @description Loads data
	 */
	public loadData()
	{
		this.hasData$ = this.courseMaterialStateFacade.courseMaterialHasData$;
		this.courseMaterials$ = this.courseMaterialStateFacade.allCourseMaterial$;

		// if no data available ... make a api request, else work with store data
		this.hasData$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				hasData =>
				{
					if (!hasData)
					{
						this.translateService
							.get('noData.noCourseMaterialData')
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{
								this.errorMessage = data;
							});

						this.getCourseMaterialMaterial()
					}
				}
			);

		// Track courseMaterial crud operation status
		this.trackCourseMaterialCrudOperationStatus();
	}

	/**
	 * Gets course material material
	 */
	async getCourseMaterialMaterial()
	{

		this.translateService
			.get('loading.courseMaterial')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				await this.rootStateFacade.startLoading(data);
			});

		this.courseMaterialStateFacade.requestCourseMaterial();
	}

	/**
	 * Creates new course material
	 */
	async createNewCourseMaterial()
	{
		// build a empty object
		const courseMaterialModel: CourseMaterialModel = {
			courseMaterialId: '',
			courseMaterialName: '',
			courseMaterialDescription: '',
			operation: OperationsEnum.CREATE
		};

		this.courseMaterialStateFacade.actUponCourseMaterial(courseMaterialModel, OperationsEnum.CREATE);

		//load crud modal
		this.openCrudCourseMaterial();
	}

	/**
	 * Determines whether course material action on
	 * @param selectedCourseMaterialModel 
	 * @param operation 
	 * @returns  
	 */
	public onCourseMaterialAction(selectedCourseMaterialModel: CourseMaterialModel, operation: OperationsEnum)
	{
		// add operation to the object
		const courseMaterialModel: CourseMaterialModel = {
			...selectedCourseMaterialModel,
			operation: operation
		};

		// act upon operation
		if (operation === OperationsEnum.EDIT)
		{
			return selectedCourseMaterialModel ? this.courseMaterialStateFacade.actUponCourseMaterial(courseMaterialModel, operation) : undefined;
		}
		else
		{
			return courseMaterialModel ? this.checkIfWantToDelete(courseMaterialModel) : undefined;
		}
	}

	public navigateToCourseMaterialDetails(courseMaterialId: string)
	{
		this.router.navigate([courseMaterialId, 'details', 'article', 'none'], { relativeTo: this.activatedRoute });
	}
}

