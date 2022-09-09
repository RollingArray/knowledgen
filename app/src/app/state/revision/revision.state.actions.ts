/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Revision state actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:53:19 
 * Last modified  : 2022-07-05 11:56:01
 */



import { createAction, props } from '@ngrx/store';
import { ArticleRevisionModel } from 'src/app/shared/model/article-revision.model';
import { ArticleModel } from 'src/app/shared/model/article.model';

import { RevisionOperationsEnum } from './revision-operations.enum';


/**
 * @description Revision actions - Api Request Revisions
 */
 export const API_REQUEST_REVISION = createAction(
	RevisionOperationsEnum.API_REQUEST_ADD_REVISION,
	props<{ payload: ArticleModel }>()
 );

/**
 * @description Revision actions - Api Request Add Revisions
 */
export const API_REQUEST_ADD_REVISION = createAction(
	RevisionOperationsEnum.API_REQUEST_REVISION,
	props<{ payload: ArticleModel }>()
);

/**
 * @description Revision actions - Loaded Revisions
 */
export const LOADED_REQUEST_REVISION = createAction(
	RevisionOperationsEnum.LOADED_REQUEST_REVISION,
	props<{ payload: ArticleRevisionModel }>()
);

/**
 * @description Revision actions - No Operation
 */
export const NOOP = createAction(
	RevisionOperationsEnum.NOOP,
);

/**
 * @description Export all
 */
export const REVISION_ACTIONS = {
	API_REQUEST_ADD_REVISION,
	API_REQUEST_REVISION,
	LOADED_REQUEST_REVISION,
	NOOP,
};