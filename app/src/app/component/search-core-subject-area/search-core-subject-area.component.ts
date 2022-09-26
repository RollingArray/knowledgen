/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Search core subject area component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-26 14:17:31 
 * Last modified  : 2022-09-26 14:18:54
 */

import { Component, OnInit, Injector, EventEmitter, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { StringKey } from "src/app/shared/constant/string.constant";
import { TitleTypeEnum } from "src/app/shared/enum/title-type.enum";
import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { CoreSubjectAreaStateFacade } from "src/app/state/core-subject-area/core-subject-area.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseViewComponent } from "../base/base-view.component";



@Component({
	selector: 'search-core-subject-area',
	templateUrl: './search-core-subject-area.component.html',
	styleUrls: ['./search-core-subject-area.component.scss'],
})
export class SearchCoreSubjectAreaComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @readonly properties                             |
	 * -------------------------------------------------|
	 */

	/**
	 * @description Title type enum of search skill component
	 */
	readonly titleTypeEnum = TitleTypeEnum;

	/**
	 * @description String key of search skill component
	 */
	readonly stringKey = StringKey;

	/**
	 * @description Add unsearchable entity of search skill component
	 */
	readonly addUnsearchableEntity = true;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of search core subject area component
	 */
	private _enableUnsearchableAddButton = false;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Determines whether data has
	 */
	hasData$!: Observable<boolean>;

	/**
	 * Core subject areas$ of search core subject area component
	 */
	coreSubjectAreas$: Observable<CoreSubjectAreaModel[]>;

	/**
	 * @description Search key$ of search skill component
	 */
	searchKey$: Observable<string>;

	/**
	 * @description Determines whether valid is
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
	get enableUnsearchableAddButton()
	{
		return this._enableUnsearchableAddButton;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Input & Output properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Output of search input component
	 */
	 @Output() emitSearchResult = new EventEmitter<CoreSubjectAreaModel>();

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of search skill component.
	 * @param injector 
	 * @param translateService 
	 * @param coreSubjectAreaStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private translateService: TranslateService,
		private coreSubjectAreaStateFacade: CoreSubjectAreaStateFacade,
		private rootStateFacade: RootStateFacade
	)
	{
		super(injector);
	}

	/**
	 * @description Descriptions search skill component
	 */
	ngOnInit()
	{
		this.loadData();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Loads data
	 */
	public loadData()
	{
		this.hasData$ = this.coreSubjectAreaStateFacade.coreSubjectAreaHasData$;
		this.coreSubjectAreas$ = this.coreSubjectAreaStateFacade.allCoreSubjectArea$;

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
							])
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: string) =>
							{
								this.errorMessage = data['noData.noCourseMaterialData'];

							});

						this.getCoreSubjectArea()
					}
				}
			);
	}

	/**
	 * @description Requests search
	 * @param search 
	 */
	async getCoreSubjectArea()
	{
		await this.rootStateFacade.startModalLoading();
		this.coreSubjectAreaStateFacade.requestCoreSubjectArea();
	}


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Requests search
	 * @param search 
	 */
	async pullCoreSubjectAreaFromStoreBySearchKey(searchKey: string)
	{

		if (searchKey !== '')
		{
			this.coreSubjectAreas$ = this.coreSubjectAreaStateFacade.searchedCoreSubjectAreasBySearchKey$(searchKey);

			// if no data available ... enable add button to add search key
			this.coreSubjectAreas$
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(
					coreSubjectAreas =>
					{
						if (coreSubjectAreas.length === 0)
						{
							this._enableUnsearchableAddButton = true;
						}
					}
				);

		}
		else
		{

			this.coreSubjectAreas$ = this.coreSubjectAreaStateFacade.allCoreSubjectArea$;
			this._enableUnsearchableAddButton = false;
		}
	}


	/**
	 * @description Selects skill
	 * @param selectCoreSubjectArea 
	 */
	public async selectCoreSubjectArea(selectCoreSubjectArea: CoreSubjectAreaModel)
	{
		this.emitSearchResult.emit(selectCoreSubjectArea);
	}

	/**
	 * @description Builds new skill from search
	 * @param searchKey 
	 */
	public async buildNewSubjectAreaFromSearch(searchKey: string)
	{
		const selectCoreSubjectArea: CoreSubjectAreaModel = {
			subjectAreaId: '',
			subjectAreaName: searchKey
		};
		this.emitSearchResult.emit(selectCoreSubjectArea);
	}
}
