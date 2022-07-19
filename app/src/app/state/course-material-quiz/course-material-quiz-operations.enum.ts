/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material quiz operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-07-13 20:10:06
 */


export enum CourseMaterialQuizOperationsEnum {
  API_REQUEST_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Api Request Course Material Quiz',
  LOADED_REQUEST_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Loaded Course Material Quiz',
  ACT_UPON_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Act Upon Course Material Quiz',
  
  API_REQUEST_ADD_NEW_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Send Api Request To Add New Course Material Quiz',
  API_REQUEST_EDIT_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Send Api Request To Edit Course Material Quiz',
  API_REQUEST_DELETE_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Send Api Request To Delete Course Material Quiz',
  
  STORE_NEWLY_ADDED_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Store Newly Added Course Material Quiz',
  STORE_UPDATED_COURSE_MATERIAL_QUIZ = '[Course Material Quiz] Store Updated Course Material Quiz',
  REMOVE_COURSE_MATERIAL_QUIZ_FROM_STORE = '[Course Material Quiz] Remove Course Material Quiz From Store',
  
  COURSE_MATERIAL_QUIZ_CRUD_SUCCESS = '[Course Material Quiz] Course Material Quiz CRUD Successfully',
  COURSE_MATERIAL_QUIZ_CRUD_FAIL = '[Course Material Quiz] Course Material Quiz CRUD Fail',
  COURSE_MATERIAL_QUIZ_ADDED_SUCCESS = '[Course Material Quiz] Course Material Quiz Added Successfully',
  COURSE_MATERIAL_QUIZ_UPDATED_SUCCESS = '[Course Material Quiz] Course Material Quiz Updated Successfully',
  COURSE_MATERIAL_QUIZ_DELETED_SUCCESS = '[Course Material Quiz] Course Material Quiz Deleted Successfully',
  NOOP = '[Course Material Quiz] No Operation',
}