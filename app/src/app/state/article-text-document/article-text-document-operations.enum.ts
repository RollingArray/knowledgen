/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article Text Document operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 11:52:34 
 * Last modified  : 2022-07-06 20:26:22
 */

export enum ArticleTextDocumentOperationsEnum {
  API_REQUEST_ARTICLE_TEXT_DOCUMENT = '[Article Text Document] Api Request Article Text Document',
  LOADED_REQUEST_ARTICLE_TEXT_DOCUMENT = '[Article Text Document] Loaded Article Text Document',
  
  ACT_UPON_ARTICLE_TEXT_DOCUMENT = '[Article Text Document] Act Upon Article Text Document',
  
  API_REQUEST_ADD_NEW_ARTICLE_TEXT_DOCUMENT = '[Article Text Document] Send Api Request To Add New Article Text Document',
  API_REQUEST_EDIT_ARTICLE_TEXT_DOCUMENT = '[Article Text Document] Send Api Request To Edit Article Text Document',
  
  STORE_NEWLY_ADDED_ARTICLE_TEXT_DOCUMENT = '[Article Text Document] Store Newly Added Article Text Document',
  STORE_UPDATED_ARTICLE_TEXT_DOCUMENT = '[Article Text Document] Store Updated Article Text Document',
  REMOVE_ARTICLE_TEXT_DOCUMENT_FROM_STORE = '[Article Text Document] Remove Article Text Document From Store',
  
  ARTICLE_TEXT_DOCUMENT_CRUD_SUCCESS = '[Article Text Document] Article Text Document CRUD Successfully',
  ARTICLE_TEXT_DOCUMENT_CRUD_FAIL = '[Article Text Document] Article Text Document CRUD Fail',
  ARTICLE_TEXT_DOCUMENT_ADDED_SUCCESS = '[Article Text Document] Article Text Document Added Successfully',
  ARTICLE_TEXT_DOCUMENT_UPDATED_SUCCESS = '[Article Text Document] Article Text Document Updated Successfully',
  ARTICLE_TEXT_DOCUMENT_DELETED_SUCCESS = '[Article Text Document] Article Text Document Deleted Successfully',
  NOOP = '[Article Text Document] No Operation',
}