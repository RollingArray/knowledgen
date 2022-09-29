/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2022-09-21 21:07:47
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { Observable, of } from 'rxjs';
import { CourseMaterialStateFacade } from 'src/app/state/course-material/course-material.state.facade';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { takeUntil } from 'rxjs/operators';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { TranslateService } from '@ngx-translate/core';
import { CrudCourseMaterialComponent } from 'src/app/component/crud-course-material/crud-course-material.component';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { CrudLearningPathComponent } from 'src/app/component/crud-learning-path/crud-learning-path.component';
import { LearningPathModel } from 'src/app/shared/model/learning-path.model';
import { LearningPathStateFacade } from 'src/app/state/learning-path/learning-path.state.facade';
import { ModalData } from 'src/app/shared/model/modal-data.model';

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
	public courseMaterials$!: Observable<CourseMaterialModel[]>;

	/**
	 * Determines whether data has
	 */
	public hasData$!: Observable<boolean>;

	/**
	 * Loading indicator status$ of course material page
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
				'pageTitle.myCourseMaterials',
				'pageTitle.recommendedCourseMaterials',
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data) =>
			{
				if (this.isUserTypeTeacher)
				{
					title = data['pageTitle.myCourseMaterials'];
				}
				else
				{
					title = data['pageTitle.recommendedCourseMaterials'];
				}
			});

		return title;
	}

	/**
	 * Gets page sub title
	 */
	get pageSubTitle()
	{
		let pageSubTitle = '';
		this.translateService
			.get([
				'pageSubTitle.myCourseMaterials',
				'pageSubTitle.recommendedCourseMaterials'
			])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data) =>
			{
				if (this.isUserTypeTeacher)
				{
					pageSubTitle = `${data['pageSubTitle.myCourseMaterials']}`;
				}
				else
				{
					pageSubTitle = `${data['pageSubTitle.recommendedCourseMaterials']}`;
				}
			});
		return pageSubTitle;
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
		private courseMaterialStateFacade: CourseMaterialStateFacade,
		private learningPathStateFacade: LearningPathStateFacade,
		private rootStateFacade: RootStateFacade,
		private translateService: TranslateService
	)
	{
		super(injector);
		this.loadingIndicatorStatus$ = this.rootStateFacade.loadingIndicatorStatus$;
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
	 * Opens crud learning path
	 */
	private async openCrudLearningPath()
	{

		const modal = await this.modalController.create({
			component: CrudLearningPathComponent,
			cssClass: 'modal-view',
			backdropDismiss: false,
		});

		// on model dismiss
		modal.onDidDismiss().then((data) =>
		{
			const modalData: ModalData = data.data;
			if (modalData.cancelled)
			{
				//do not do anything
			}

			//  Navigates to learning path
			else
			{
				this.navigateToLearningPath();
			}
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
							.get([
								'noData.noCourseMaterialData',
								'noData.noRecommendedCourseMaterialData'
							])
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{
								if (this.isUserTypeTeacher)
								{
									this.errorMessage = data['noData.noCourseMaterialData'];
								}
								if (this.isUserTypeStudent)
								{
									this.errorMessage = data['noData.noRecommendedCourseMaterialData'];
								}

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
		await this.rootStateFacade.startLoading('');

		if (this.isUserTypeTeacher)
		{
			this.courseMaterialStateFacade.requestCourseMaterial();
		}
		else
		{
			this.courseMaterialStateFacade.requestRecommendedCourseMaterial();
		}
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
			subjectAreaId: '',
			subjectAreaName: '',
			operationType: OperationsEnum.CREATE
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
	public onCourseMaterialAction(selectedCourseMaterialModel: CourseMaterialModel, operationType: OperationsEnum)
	{
		// add operation to the object
		const courseMaterialModel: CourseMaterialModel = {
			...selectedCourseMaterialModel,
			operationType: operationType
		};

		return selectedCourseMaterialModel ? this.courseMaterialStateFacade.actUponCourseMaterial(courseMaterialModel, operationType) : undefined;
	}

	/**
	 * Navigates to course material details
	 * @param courseMaterialId 
	 */
	public navigateToCourseMaterialDetails(courseMaterial: CourseMaterialModel)
	{
		this.router.navigate([courseMaterial.courseMaterialId, 'articles'], { relativeTo: this.activatedRoute });
		if (courseMaterial.firstParentArticleId !== null)
		{
			const firstParentArticleId = courseMaterial.firstParentArticleId.parentArticleId;
			this.router.navigate([courseMaterial.courseMaterialId, 'articles', 'article', firstParentArticleId], { relativeTo: this.activatedRoute });	
		}
		else
		{
			this.router.navigate([courseMaterial.courseMaterialId, 'articles'], { relativeTo: this.activatedRoute });
		}
	}

	/**
	 * Navigates to learning path
	 */
	public navigateToLearningPath()
	{
		this.router.navigate(['/go/learning/path']);
	}

	/**
	 * Determines whether course material action on
	 * @param selectedCourseMaterialModel 
	 * @param operation 
	 * @returns  
	 */
	public onLearningPathAction(selectedCourseMaterialModel: CourseMaterialModel)
	{
		// add operation to the object
		const learningPathModel: LearningPathModel = {
			courseMaterialId: selectedCourseMaterialModel.courseMaterialId,
			operationType: OperationsEnum.CREATE
		};

		this.learningPathStateFacade.actUponLearningPath(learningPathModel, OperationsEnum.CREATE)

		//load crud modal
		this.openCrudLearningPath();
	}
}