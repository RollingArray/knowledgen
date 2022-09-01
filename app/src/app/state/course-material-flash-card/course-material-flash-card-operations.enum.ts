/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 20:07:37 
 * Last modified  : 2022-08-18 17:23:23
 */


export enum CourseMaterialFlashCardOperationsEnum {
  API_REQUEST_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Api Request Course Material Flash Card',
  LOADED_REQUEST_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Loaded Course Material Flash Card',
  ACT_UPON_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Act Upon Course Material Flash Card',
  
  API_REQUEST_ADD_NEW_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Send Api Request To Add New Course Material Flash Card',
  API_REQUEST_EDIT_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Send Api Request To Edit Course Material Flash Card',
  API_REQUEST_DELETE_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Send Api Request To Delete Course Material Flash Card',
  
  STORE_NEWLY_ADDED_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Store Newly Added Course Material Flash Card',
  STORE_UPDATED_COURSE_MATERIAL_FLASH_CARD = '[Course Material Flash Card] Store Updated Course Material Flash Card',
  REMOVE_COURSE_MATERIAL_FLASH_CARD_FROM_STORE = '[Course Material Flash Card] Remove Course Material Flash Card From Store',
  
  COURSE_MATERIAL_FLASH_CARD_CRUD_SUCCESS = '[Course Material Flash Card] Course Material Flash Card CRUD Successfully',
  COURSE_MATERIAL_FLASH_CARD_CRUD_FAIL = '[Course Material Flash Card] Course Material Flash Card CRUD Fail',
  COURSE_MATERIAL_FLASH_CARD_ADDED_SUCCESS = '[Course Material Flash Card] Course Material Flash Card Added Successfully',
  COURSE_MATERIAL_FLASH_CARD_UPDATED_SUCCESS = '[Course Material Flash Card] Course Material Flash Card Updated Successfully',
  COURSE_MATERIAL_FLASH_CARD_DELETED_SUCCESS = '[Course Material Flash Card] Course Material Flash Card Deleted Successfully',
  NOOP = '[Course Material Flash Card] No Operation',
}