/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Core subject area state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-14 19:06:25 
 * Last modified  : 2022-09-26 14:27:03
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CoreSubjectAreaModel } from "src/app/shared/model/core-subject-area.model";
import { CORE_SUBJECT_AREA_ACTIONS } from "./core-subject-area.state.actions";
import { CoreSubjectAreaStateModel } from "./view/core-subject-area.state.model";
import { CORE_SUBJECT_AREA_QUERY_SELECTOR } from "./view/core-subject-area.state.selectors";



/**
 * @description Injectable
 */
@Injectable()

export class CoreSubjectAreaStateFacade
{

	/**
	 * Creates an instance of core subject area state facade.
	 * @param coreSubjectAreaStore 
	 * @param coreSubjectAreaCrudStore 
	 */
	constructor(
		private coreSubjectAreaStore: Store<CoreSubjectAreaStateModel>,
	) { }

	/**
	 * All core subject area$ of core subject area state facade
	 */
	public allCoreSubjectArea$ = this.coreSubjectAreaStore.select(CORE_SUBJECT_AREA_QUERY_SELECTOR.selectAllCoreSubjectArea);

	/**
	 * Core subject area has data$ of core subject area state facade
	 */
	public coreSubjectAreaHasData$ = this.coreSubjectAreaStore.select(CORE_SUBJECT_AREA_QUERY_SELECTOR.selectCoreSubjectAreaHasData);

	/**
	 * Core subject area by core subject area id$ of core subject area state facade
	 */
	public coreSubjectAreaByCoreSubjectAreaId$ = (subjectAreaId: string) => this.coreSubjectAreaStore.select(CORE_SUBJECT_AREA_QUERY_SELECTOR.selectCoreSubjectAreasByCoreSubjectAreaId(subjectAreaId));

	/**
	 * Core subject area by core subject area id$ of core subject area state facade
	 */
	public searchedCoreSubjectAreasBySearchKey$ = (searchKey: string) => this.coreSubjectAreaStore.select(CORE_SUBJECT_AREA_QUERY_SELECTOR.selectCoreSubjectAreasBySearchKey(searchKey));

	/**
	 * If core subject area exist by core subject area id$ of core subject area state facade
	 */
	public ifCoreSubjectAreaExistByCoreSubjectAreaId$ = (subjectAreaId: string) => this.coreSubjectAreaStore.select(CORE_SUBJECT_AREA_QUERY_SELECTOR.selectIfCoreSubjectAreaExistByCoreSubjectAreaId(subjectAreaId));


	/**
	 * Requests core subject area
	 */
	public requestCoreSubjectArea()
	{
		this.coreSubjectAreaStore.dispatch(CORE_SUBJECT_AREA_ACTIONS.API_REQUEST_CORE_SUBJECT_AREA());
	}

	/**
	 * Adds new core subject area
	 * @param coreSubjectArea 
	 */
	public addNewCoreSubjectArea(coreSubjectArea: CoreSubjectAreaModel)
	{
		this.coreSubjectAreaStore.dispatch(CORE_SUBJECT_AREA_ACTIONS.STORE_NEWLY_ADDED_CORE_SUBJECT_AREA({ payload: coreSubjectArea }));
	}
}
