/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-07-05 16:33:13
 */

export enum CourseMaterialMenuOperationsEnum
{
	API_REQUEST_MENU = '[Course Material Menu] Api Request Course Material Menu',
	LOADING_GENERATED_MENU = '[Course Material Menu] Loaded Generated Menu',
	
	LOADED_REQUEST_PARENT_MENU = '[Course Material Menu] Loaded Course Material Parent Menu',
	LOADED_REQUEST_CHILD_MENU = '[Course Material Menu] Loaded Course Material Child Menu',
	LOADED_REQUEST_SUB_CHILD_MENU = '[Course Material Menu] Loaded Course Material Sub Child Menu',

	ACT_UPON_PARENT_MENU = '[Course Material Menu] Act Upon New Parent Menu',
	ACT_UPON_CHILD_MENU = '[Course Material Menu] Act Upon New Child Menu',
	ACT_UPON_SUB_CHILD_MENU = '[Course Material Menu] Act Upon New Sub Child Menu',

	PARENT_MENU_ADDED_SUCCESS = '[Course Material Menu] Parent Menu Added Successfully',
	CHILD_MENU_ADDED_SUCCESS = '[Course Material Menu] Child Menu Added Successfully',
	SUB_CHILD_MENU_ADDED_SUCCESS = '[Course Material Menu] Sub Child Menu Added Successfully',

	PARENT_MENU_UPDATED_SUCCESS = '[Course Material Menu] Parent Menu Updated Successfully',
	CHILD_MENU_UPDATED_SUCCESS = '[Course Material Menu] Child Menu Updated Successfully',
	SUB_CHILD_MENU_UPDATED_SUCCESS = '[Course Material Menu] Sub Child Menu Updated Successfully',

	PARENT_MENU_DELETED_SUCCESS = '[Course Material Menu] Parent Menu Deleted Successfully',
	CHILD_MENU_DELETED_SUCCESS = '[Course Material Menu] Child Menu Deleted Successfully',
	SUB_CHILD_MENU_DELETED_SUCCESS = '[Course Material Menu] Sub Child Menu Deleted Successfully',

	API_REQUEST_ADD_NEW_PARENT_MENU = '[Course Material Menu] Api Request Add New Parent Menu',
	API_REQUEST_ADD_NEW_CHILD_MENU = '[Course Material Menu] Api Request Add New Child Menu',
	API_REQUEST_ADD_NEW_SUB_CHILD_MENU = '[Course Material Menu] Api Request Add New Sub Child Menu',

	API_REQUEST_EDIT_PARENT_MENU = '[Course Material Menu] Api Request Edit Parent Menu',
	API_REQUEST_EDIT_CHILD_MENU = '[Course Material Menu] Api Request Edit Child Menu',
	API_REQUEST_EDIT_SUB_CHILD_MENU = '[Course Material Menu] Api Request Edit Sub Child Menu',

	API_REQUEST_DELETE_PARENT_MENU = '[Course Material Menu] Api Request Delete Parent Menu',
	API_REQUEST_DELETE_CHILD_MENU = '[Course Material Menu] Api Request Delete Child Menu',
	API_REQUEST_DELETE_SUB_CHILD_MENU = '[Course Material Menu] Api Request Delete Sub Child Menu',

	STORE_NEWLY_ADDED_PARENT_MENU = '[Course Material Menu] Store Newly Added Parent Menu',
	STORE_UPDATED_PARENT_MENU = '[Course Material Menu] Store Updated Parent Menu',
	REMOVE_PARENT_MENU_FROM_STORE = '[Course Material Menu] Delete Parent Menu From Store',

	STORE_NEWLY_ADDED_CHILD_MENU = '[Course Material Menu] Store Newly Added Child Menu',
	STORE_UPDATED_CHILD_MENU = '[Course Material Menu] Store Updated Child Menu',
	REMOVE_CHILD_MENU_FROM_STORE = '[Course Material Menu] Delete Child Menu From Store',

	STORE_NEWLY_ADDED_SUB_CHILD_MENU = '[Course Material Menu] Store Newly Added Sub Child Menu',
	STORE_UPDATED_SUB_CHILD_MENU = '[Course Material Menu] Store Updated Sub Child Menu',
	REMOVE_SUB_CHILD_MENU_FROM_STORE = '[Course Material Menu] Delete Sub Child Menu From Store',
	
	CRUD_FAIL_PARENT_MENU = '[Course Material Menu] Parent Menu CRUD Fail',
	CRUD_FAIL_CHILD_MENU = '[Course Material Menu] Child Menu CRUD Fail',
	CRUD_FAIL_SUB_CHILD_MENU = '[Course Material Menu] Sub Child Menu CRUD Fail',

	CRUD_SUCCESS_PARENT_MENU = '[Course Material Menu] Parent Menu CRUD Fail',
	CRUD_SUCCESS_CHILD_MENU = '[Course Material Menu] Child Menu CRUD Fail',
	CRUD_SUCCESS_SUB_CHILD_MENU = '[Course Material Menu] Sub Child Menu CRUD Fail',

	STORE_SELECTED_MENU = '[Course Material Menu] Store Selected Menu Article',
	REMOVE_SELECTED_MENU = '[Course Material Menu] Delete Selected Menu Article From Store',
	NOOP = '[Course Material Menu] No Operation',
}