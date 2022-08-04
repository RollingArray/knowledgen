/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session state actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 16:01:49 
 * Last modified  : 2022-08-03 17:29:45
 */

import { createAction, props } from '@ngrx/store';
import { ArticleSessionModel } from 'src/app/shared/model/article-session.model';
import { ArticleSessionOperationsEnum } from './article-session-operations.enum';

/**
 * @description Course material article session actions - Send Api Request To Gte All Article Sessions
 */
 export const API_REQUEST_ARTICLE_SESSIONS = createAction(
	ArticleSessionOperationsEnum.API_REQUEST_ARTICLE_SESSIONS,
	props<{ payload: ArticleSessionModel }>()
 );

 /**
 * @description Course Material Action - Loaded Course Material
 */
export const LOADED_REQUEST_ARTICLE_SESSIONS = createAction(
	ArticleSessionOperationsEnum.LOADED_REQUEST_ARTICLE_SESSIONS,
	props<{ payload: ArticleSessionModel }>()
);

/**
 * @description Course material article session actions - Send Api Request To Add New Course material article session
 */
export const API_REQUEST_ADD_NEW_ARTICLE_SESSION = createAction(
	ArticleSessionOperationsEnum.API_REQUEST_ADD_NEW_ARTICLE_SESSION,
	props<{ payload: ArticleSessionModel }>()
);

/**
 * @description Course material article session actions - Store Newly Added Course Material assignment result
 */
 export const STORE_NEWLY_ADDED_ARTICLE_SESSION = createAction(
	ArticleSessionOperationsEnum.STORE_NEWLY_ADDED_ARTICLE_SESSION,
	props<{ payload: ArticleSessionModel }>()
 );

/**
 * @description Course material article session actions - Course material article session CRUD Successfully
 */
export const ARTICLE_SESSION_CRUD_SUCCESS = createAction(
	ArticleSessionOperationsEnum.ARTICLE_SESSION_CRUD_SUCCESS
);

/**
 * @description Course material article session actions - Course material article session CRUD Fail
 */
export const ARTICLE_SESSION_CRUD_FAIL = createAction(
	ArticleSessionOperationsEnum.ARTICLE_SESSION_CRUD_FAIL
);

/**
 * @description Course material assignment Action - Course Material Assignment Result Added Successfully
 */
 export const ARTICLE_SESSION_ADDED_SUCCESS = createAction(
	ArticleSessionOperationsEnum.ARTICLE_SESSION_ADDED_SUCCESS
);

/**
 * @description Course material article session actions - No Operation
 */
export const NOOP = createAction(
	ArticleSessionOperationsEnum.NOOP,
);

/**
 * @description Export all actions
 */
export const ARTICLE_SESSION_ACTIONS = {
	API_REQUEST_ARTICLE_SESSIONS,
	LOADED_REQUEST_ARTICLE_SESSIONS,
	API_REQUEST_ADD_NEW_ARTICLE_SESSION,
	STORE_NEWLY_ADDED_ARTICLE_SESSION,
	ARTICLE_SESSION_CRUD_SUCCESS,
	ARTICLE_SESSION_ADDED_SUCCESS,
	ARTICLE_SESSION_CRUD_FAIL,
	NOOP,
};