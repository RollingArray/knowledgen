/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-03 15:46:02 
 * Last modified  : 2022-08-03 16:23:36
 */

export enum ArticleSessionOperationsEnum {
  API_REQUEST_ARTICLE_SESSIONS = '[Article Session] Api Request To Get All Article Sessions',
  LOADED_REQUEST_ARTICLE_SESSIONS = '[Article Session] Loaded All Article Sessions',
  API_REQUEST_ADD_NEW_ARTICLE_SESSION = '[Article Session] Send Api Request To Add New Article Session',
  STORE_NEWLY_ADDED_ARTICLE_SESSION = '[Article Session] Store Newly Added Article Session',
  ARTICLE_SESSION_ADDED_SUCCESS = '[Article Session] Article Session Added Successfully',
  ARTICLE_SESSION_CRUD_SUCCESS = '[Article Session] Article Session CRUD Successfully',
  ARTICLE_SESSION_CRUD_FAIL = '[Article Session] Article Session CRUD Fail',
  NOOP = '[Article Session] No Operation',
}