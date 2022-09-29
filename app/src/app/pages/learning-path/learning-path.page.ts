/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-09-21 21:05:38
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { CrudLearningPathComponent } from "src/app/component/crud-learning-path/crud-learning-path.component";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { LearningPathModel } from "src/app/shared/model/learning-path.model";
import { LearningPathStateFacade } from "src/app/state/learning-path/learning-path.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";

@Component({
	selector: "learning-path",
	templateUrl: "./learning-path.page.html",
	styleUrls: ["./learning-path.page.scss"]
})
export class LearningPathPage extends BaseViewComponent implements OnInit, OnDestroy
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
	public courseMaterials$!: Observable<LearningPathModel[]>;

	/**
	 * Determines whether data has
	 */
	public hasData$!: Observable<boolean>;

	/**
	 * Learning path total progress percentage$ of learning path page
	 */
	public learningPathTotalProgressPercentage$: Observable<string[]>;

	/**
	 * Loading indicator status$ of learning path page
	 */
	public loadingIndicatorStatus$: Observable<boolean>

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Status color icon
	 * @param courseMaterialProgress 
	 * @returns  
	 */
	public statusColorIcon(courseMaterialProgress: number)
	{
		if (courseMaterialProgress === 0)
		{
			return ['index not-start', this.stringKey.ICON_BEGIN];
		}
		else if (courseMaterialProgress > 0 && courseMaterialProgress < 99)
		{
			return ['index in-progress', this.stringKey.ICON_IN_PROGRESS];
		}
		else
		{
			return ['index complete', this.stringKey.ICON_SELECT];
		}
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
	 * @param courseMaterialStateFacade 
	 * @param rootStateFacade 
	 * @param translateService 
	 */
	constructor(
		injector: Injector,
		private learningPathStateFacade: LearningPathStateFacade,
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
		this.loadingIndicatorStatus$ = this.rootStateFacade.loadingIndicatorStatus$;
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
	 * Checks if want to delete
	 * @param selectedLearningPathModel 
	 */
	private checkIfWantToDelete(selectedLearningPathModel: LearningPathModel)
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
							handler: (_) => selectedLearningPathModel ? this.learningPathStateFacade.actUponLearningPath(selectedLearningPathModel, OperationsEnum.DELETE) : undefined
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
	 * Opens crud learning path
	 */
	private async openCrudLearningPath()
	{

		const modal = await this.modalController.create({
			component: CrudLearningPathComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
		});

		// present modal
		await modal.present();
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
		this.hasData$ = this.learningPathStateFacade.learningPathHasData$;
		this.courseMaterials$ = this.learningPathStateFacade.allLearningPath$;
		this.learningPathTotalProgressPercentage$ = this.learningPathStateFacade.learningPathTotalProgressPercentage$;

		// if no data available ... make a api request, else work with store data
		this.hasData$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				hasData =>
				{
					if (!hasData)
					{
						this.translateService
							.get([
								'noData.noMyLearningPath',
							])
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{
								this.errorMessage = data['noData.noMyLearningPath'];
							});

						this.getLearningPathMaterial()
					}
				}
			);
	}

	/**
	 * Gets course material material
	 */
	async getLearningPathMaterial()
	{
		await this.rootStateFacade.startLoading('');
		this.learningPathStateFacade.requestLearningPath();
	}

	/**
	 * Navigates to learning path details
	 * @param courseMaterial 
	 */
	public navigateToLearningPathDetails(courseMaterial: LearningPathModel)
	{
		if (courseMaterial.firstParentArticleId !== null)
		{
			const firstParentArticleId = courseMaterial.firstParentArticleId.parentArticleId;
			this.router.navigate(['go', 'course', 'material',courseMaterial.courseMaterialId, 'articles', 'article', firstParentArticleId]);	
		}
	}

	/**
	 * Determines whether learning path action on
	 * @param selectedLearningPathModel 
	 */
	public onLearningPathAction(selectedLearningPathModel: LearningPathModel)
	{
		// add operation to the object
		const learningPathModel: LearningPathModel = {
			...selectedLearningPathModel,
			operationType: OperationsEnum.DELETE
		};

		this.learningPathStateFacade.actUponLearningPath(learningPathModel, OperationsEnum.DELETE)

		//load crud modal
		this.openCrudLearningPath();
	}
}