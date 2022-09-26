/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area tag state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:06:25 
 * Last modified  : 2022-09-26 14:27:03
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CoreSubjectAreaTagModel } from "src/app/shared/model/core-subject-area-tag.model";
import { CORE_SUBJECT_AREA_TAG_ACTIONS } from "./core-subject-area-tag.state.actions";
import { CoreSubjectAreaTagStateModel } from "./view/core-subject-area-tag.state.model";
import { CORE_SUBJECT_AREA_TAG_QUERY_SELECTOR } from "./view/core-subject-area-tag.state.selectors";



/**
 * @description Injectable
 */
@Injectable()

export class CoreSubjectAreaTagStateFacade
{

	/**
	 * Creates an instance of core subject area state facade.
	 * @param coreSubjectAreaTagStore 
	 * @param coreSubjectAreaTagCrudStore 
	 */
	constructor(
		private coreSubjectAreaTagStore: Store<CoreSubjectAreaTagStateModel>,
	) { }

	/**
	 * All core subject area$ of core subject area state facade
	 */
	public allCoreSubjectAreaTag$ = this.coreSubjectAreaTagStore.select(CORE_SUBJECT_AREA_TAG_QUERY_SELECTOR.selectAllCoreSubjectAreaTag);

	/**
	 * Core subject area tag has data$ of core subject area state facade
	 */
	public coreSubjectAreaTagHasData$ = this.coreSubjectAreaTagStore.select(CORE_SUBJECT_AREA_TAG_QUERY_SELECTOR.selectCoreSubjectAreaTagHasData);

	/**
	 * Core subject area tag by core subject area id$ of core subject area state facade
	 */
	public coreSubjectAreaTagByCoreSubjectAreaTagId$ = (subjectAreaId: string) => this.coreSubjectAreaTagStore.select(CORE_SUBJECT_AREA_TAG_QUERY_SELECTOR.selectCoreSubjectAreaTagsByCoreSubjectAreaTagId(subjectAreaId));

	/**
	 * Core subject area tag by core subject area id$ of core subject area state facade
	 */
	public searchedCoreSubjectAreaTagsBySearchKey$ = (searchKey: string) => this.coreSubjectAreaTagStore.select(CORE_SUBJECT_AREA_TAG_QUERY_SELECTOR.selectCoreSubjectAreaTagsBySearchKey(searchKey));

	/**
	 * If core subject area exist by core subject area id$ of core subject area state facade
	 */
	public ifCoreSubjectAreaTagExistByCoreSubjectAreaTagId$ = (subjectAreaId: string) => this.coreSubjectAreaTagStore.select(CORE_SUBJECT_AREA_TAG_QUERY_SELECTOR.selectIfCoreSubjectAreaTagExistByCoreSubjectAreaTagId(subjectAreaId));


	/**
	 * Requests core subject area
	 */
	public requestCoreSubjectAreaTag()
	{
		this.coreSubjectAreaTagStore.dispatch(CORE_SUBJECT_AREA_TAG_ACTIONS.API_REQUEST_CORE_SUBJECT_AREA_TAG());
	}

	/**
	 * Adds new core subject area
	 * @param coreSubjectAreaTag 
	 */
	public addNewCoreSubjectAreaTag(coreSubjectAreaTag: CoreSubjectAreaTagModel)
	{
		this.coreSubjectAreaTagStore.dispatch(CORE_SUBJECT_AREA_TAG_ACTIONS.STORE_NEWLY_ADDED_CORE_SUBJECT_AREA_TAG({ payload: coreSubjectAreaTag }));
	}
}
