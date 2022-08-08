/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-08-08 10:46:52
 */

export enum LearningPathOperationsEnum {
  API_REQUEST_LEARNING_PATH = '[Learning Path] Api Request Learning Path',
  LOADED_REQUEST_LEARNING_PATH = '[Learning Path] Loaded Learning Path',
  ACT_UPON_LEARNING_PATH = '[Learning Path] Act Upon Learning Path',
  API_REQUEST_ADD_NEW_LEARNING_PATH = '[Learning Path] Send Api Request To Add New Learning Path',
  API_REQUEST_DELETE_LEARNING_PATH = '[Learning Path] Send Api Request To Delete Learning Path',
  STORE_NEWLY_ADDED_LEARNING_PATH = '[Learning Path] Store Newly Added Learning Path',
  REMOVE_LEARNING_PATH_FROM_STORE = '[Learning Path] Remove Learning Path From Store',
  
  LEARNING_PATH_CRUD_SUCCESS = '[Learning Path] Learning Path CRUD Successfully',
  LEARNING_PATH_CRUD_FAIL = '[Learning Path] Learning Path CRUD Fail',
  
  LEARNING_PATH_ADDED_SUCCESS = '[Learning Path] Learning Path Added Successfully',
  LEARNING_PATH_DELETED_SUCCESS = '[Learning Path] Learning Path Deleted Successfully',
  NOOP = '[Learning Path] No Operation',
}