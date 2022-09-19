/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer operation enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:45:09 
 * Last modified  : 2022-09-19 19:55:35
 */

export enum UserPeerOperationsEnum {
  API_REQUEST_USER_PEER = '[User Peer] Api Request User Peer',
  LOADED_REQUEST_USER_PEER = '[User Peer] Loaded User Peer',
  ACT_UPON_USER_PEER = '[User Peer] Act Upon User Peer',
  API_REQUEST_ADD_NEW_USER_PEER = '[User Peer] Send Api Request To Add New User Peer',
  API_REQUEST_DELETE_USER_PEER = '[User Peer] Send Api Request To Delete User Peer',
  STORE_NEWLY_ADDED_USER_PEER = '[User Peer] Store Newly Added User Peer',
  REMOVE_USER_PEER_FROM_STORE = '[User Peer] Remove User Peer From Store',
  
  USER_PEER_CRUD_SUCCESS = '[User Peer] User Peer CRUD Successfully',
  USER_PEER_CRUD_FAIL = '[User Peer] User Peer CRUD Fail',
  
  USER_PEER_ADDED_SUCCESS = '[User Peer] User Peer Added Successfully',
  USER_PEER_DELETED_SUCCESS = '[User Peer] User Peer Deleted Successfully',
  NOOP = '[User Peer] No Operation',
}