/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-07-26 10:10:25
 */

export enum CourseMaterialOperationsEnum {
  API_REQUEST_COURSE_MATERIAL = '[Course Material] Api Request Course Material',
  API_REQUEST_RECOMMENDED_COURSE_MATERIAL = '[Course Material] Api Request Recommended Course Material',
  LOADED_REQUEST_COURSE_MATERIAL = '[Course Material] Loaded Course Material',
  ACT_UPON_COURSE_MATERIAL = '[Course Material] Act Upon Course Material',
  API_REQUEST_ADD_NEW_COURSE_MATERIAL = '[Course Material] Send Api Request To Add New Course Material',
  API_REQUEST_EDIT_COURSE_MATERIAL = '[Course Material] Send Api Request To Edit Course Material',
  API_REQUEST_DELETE_COURSE_MATERIAL = '[Course Material] Send Api Request To Delete Course Material',
  STORE_NEWLY_ADDED_COURSE_MATERIAL = '[Course Material] Store Newly Added Course Material',
  STORE_UPDATED_COURSE_MATERIAL = '[Course Material] Store Updated Course Material',
  REMOVE_COURSE_MATERIAL_FROM_STORE = '[Course Material] Remove Course Material From Store',
  
  COURSE_MATERIAL_CRUD_SUCCESS = '[Course Material] Course Material CRUD Successfully',
  COURSE_MATERIAL_CRUD_FAIL = '[Course Material] Course Material CRUD Fail',
  
  COURSE_MATERIAL_ADDED_SUCCESS = '[Course Material] Course Material Added Successfully',
  COURSE_MATERIAL_UPDATED_SUCCESS = '[Course Material] Course Material Updated Successfully',
  COURSE_MATERIAL_DELETED_SUCCESS = '[Course Material] Course Material Deleted Successfully',

  STORE_UPDATED_COURSE_MATERIAL_LEARNING_PATH_KEY = '[Course Material] Store Updated Course MaterialLearning Path Key',

  NOOP = '[Course Material] No Operation',
}