/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-01-21 18:54:13
 */


export enum AvailabilityPlannerOperationsEnum {
  API_REQUEST_AVAILABILITY_PLANNER = '[Availability Planner] Api Request Availability Planner',
  LOADED_REQUEST_AVAILABILITY_PLANNER = '[Availability Planner] Loaded Availability Planner',
  
  ACT_UPON_AVAILABILITY_PLANNER = '[Availability Planner] Act Upon Availability Planner',
  
  API_REQUEST_ADD_NEW_AVAILABILITY_PLANNER = '[Availability Planner] Send Api Request To Add New Availability Planner',
  API_REQUEST_EDIT_AVAILABILITY_PLANNER = '[Availability Planner] Send Api Request To Edit Availability Planner',
  API_REQUEST_DELETE_AVAILABILITY_PLANNER = '[Availability Planner] Send Api Request To Delete Availability Planner',
  
  STORE_NEWLY_ADDED_AVAILABILITY_PLANNER = '[Availability Planner] Store Newly Added Availability Planner',
  STORE_UPDATED_AVAILABILITY_PLANNER = '[Availability Planner] Store Updated Availability Planner',
  REMOVE_AVAILABILITY_PLANNER_FROM_STORE = '[Availability Planner] Remove Availability Planner From Store',
  
  AVAILABILITY_PLANNER_CRUD_SUCCESS = '[Availability Planner] Availability Planner CRUD Successfully',
  AVAILABILITY_PLANNER_CRUD_FAIL = '[Availability Planner] Availability Planner CRUD Fail',
  AVAILABILITY_PLANNER_ADDED_SUCCESS = '[Availability Planner] Availability Planner Added Successfully',
  AVAILABILITY_PLANNER_UPDATED_SUCCESS = '[Availability Planner] Availability Planner Updated Successfully',
  AVAILABILITY_PLANNER_DELETED_SUCCESS = '[Availability Planner] Availability Planner Deleted Successfully',
  NOOP = '[Availability Planner] No Operation',
}