/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Revision state facade
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 12:59:43 
 * Last modified  : 2022-07-05 13:01:17
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ArticleModel } from "src/app/shared/model/article.model";
import { CourseMaterialMenuModel } from "src/app/shared/model/course-material-menu.model";
import { REVISION_ACTIONS } from "./revision.state.actions";
import { RevisionStateModel } from "./view/revision.state.model";
import { REVISION_QUERY_SELECTOR } from "./view/revision.state.selectors";

/**
 * @description Injectable
 */
@Injectable()

export class RevisionStateFacade {

	/**
	 * Creates an instance of availability planner state facade.
	 * @param revisionStore 
	 * @param revisionCrudStore 
	 */
	constructor(
		private revisionStore: Store<RevisionStateModel>
	) { }

	/**
	 * All revision by date$ of revision state facade
	 */
	public allRevisionByDate$ = (articleRevisionDate: string) =>  this.revisionStore.select(REVISION_QUERY_SELECTOR.selectAllRevisionByDate(articleRevisionDate));

	/**
	 * Revision has data$ of revision state facade
	 */
	public revisionHasData$ = (articleRevisionDate: string) =>  this.revisionStore.select(REVISION_QUERY_SELECTOR.selectRevisionHasData(articleRevisionDate));

	/**
	 * Requests revision
	 */
	public requestRevision(articleModel: ArticleModel) {
		this.revisionStore.dispatch(REVISION_ACTIONS.API_REQUEST_REVISION({payload: articleModel}));
	}	
	
	/**
	 * Requests add revision
	 * @param articleModel 
	 */
	public requestAddRevision(articleModel: ArticleModel) {
		this.revisionStore.dispatch(REVISION_ACTIONS.API_REQUEST_ADD_REVISION({payload: articleModel}));
	}	
}
