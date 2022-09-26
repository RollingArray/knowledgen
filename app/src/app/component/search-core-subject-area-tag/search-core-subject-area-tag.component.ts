/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Search core subject area tag component
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
import { CoreSubjectAreaTagModel } from "src/app/shared/model/core-subject-area-tag.model";
import { CoreSubjectAreaTagStateFacade } from "src/app/state/core-subject-area-tag/core-subject-area-tag.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { BaseViewComponent } from "../base/base-view.component";

@Component({
	selector: 'search-core-subject-area-tag',
	templateUrl: './search-core-subject-area-tag.component.html',
	styleUrls: ['./search-core-subject-area-tag.component.scss'],
})
export class SearchCoreSubjectAreaTagComponent extends BaseViewComponent implements OnInit
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
	coreSubjectAreaTags$: Observable<CoreSubjectAreaTagModel[]>;

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
	 @Output() emitSearchResult = new EventEmitter<CoreSubjectAreaTagModel>();

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
	 * @param coreSubjectAreaTagStateFacade 
	 * @param rootStateFacade 
	 */
	constructor(
		injector: Injector,
		private translateService: TranslateService,
		private coreSubjectAreaTagStateFacade: CoreSubjectAreaTagStateFacade,
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
		this.hasData$ = this.coreSubjectAreaTagStateFacade.coreSubjectAreaTagHasData$;
		this.coreSubjectAreaTags$ = this.coreSubjectAreaTagStateFacade.allCoreSubjectAreaTag$;

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
								this./* `errorMessage` is a variable that is used to display error message. */
								errorMessage = data['noData.noCourseMaterialData'];

							});

						this.getCoreSubjectAreaTag()
					}
				}
			);
	}

	/**
	 * @description Requests search
	 * @param search 
	 */
	async getCoreSubjectAreaTag()
	{
		await this.rootStateFacade.startModalLoading();
		this.coreSubjectAreaTagStateFacade.requestCoreSubjectAreaTag();
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
	async pullCoreSubjectAreaTagFromStoreBySearchKey(searchKey: string)
	{

		if (searchKey !== '')
		{
			this.coreSubjectAreaTags$ = this.coreSubjectAreaTagStateFacade.searchedCoreSubjectAreaTagsBySearchKey$(searchKey);

			// if no data available ... enable add button to add search key
			this.coreSubjectAreaTags$
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(
					coreSubjectAreaTags =>
					{
						if (coreSubjectAreaTags.length === 0)
						{
							this._enableUnsearchableAddButton = true;
						}
					}
				);

		}
		else
		{

			this.coreSubjectAreaTags$ = this.coreSubjectAreaTagStateFacade.allCoreSubjectAreaTag$;
			this._enableUnsearchableAddButton = false;
		}
	}


	/**
	 * @description Selects skill
	 * @param selectCoreSubjectAreaTag 
	 */
	public async selectCoreSubjectAreaTag(selectCoreSubjectAreaTag: CoreSubjectAreaTagModel)
	{
		this.emitSearchResult.emit(selectCoreSubjectAreaTag);
	}

	/**
	 * @description Builds new skill from search
	 * @param searchKey 
	 */
	public async buildNewSubjectAreaTagFromSearch(searchKey: string)
	{
		const selectCoreSubjectAreaTag: CoreSubjectAreaTagModel = {
			subjectAreaTagId: '',
			subjectAreaTagName: searchKey
		};
		this.emitSearchResult.emit(selectCoreSubjectAreaTag);
	}
}
