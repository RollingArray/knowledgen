/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material operations enum
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-01-20 10:06:20
 */



export enum CourseMaterialMenuOperationsEnum
{
	API_REQUEST_MENU = '[Course Material Menu] Api Request Course Material Menu',
	LOADING_GENERATED_MENU = '[Course Material Menu] Loaded Generated Menu',
	LOADED_REQUEST_PARENT_MENU = '[Course Material Menu] Loaded Course Material Parent Menu',
	LOADED_REQUEST_CHILD_MENU = '[Course Material Menu] Loaded Course Material Child Menu',
	LOADED_REQUEST_SUB_CHILD_MENU = '[Course Material Menu] Loaded Course Material Sub Child Menu',

	PARENT_MENU_ADDED_SUCCESS = '[Course Material Menu] Parent Menu Added Successfully',
	CHILD_MENU_ADDED_SUCCESS = '[Course Material Menu] Child Menu Added Successfully',
	SUB_CHILD_MENU_ADDED_SUCCESS = '[Course Material Menu] Sub Child Menu Added Successfully',

	API_REQUEST_ADD_NEW_MENU = '[Course Material Menu] Api Request Add New Menu',
	API_REQUEST_ADD_NEW_CHILD_MENU = '[Course Material Menu] Api Request Add New Child Menu',
	API_REQUEST_ADD_NEW_SUB_CHILD_MENU = '[Course Material Menu] Api Request Add New Sub Child Menu',

	STORE_NEWLY_ADDED_MENU = '[Course Material Menu] Store Newly Added Menu',
	STORE_NEWLY_ADDED_CHILD_MENU = '[Course Material Menu] Store Newly Added Child Menu',
	STORE_NEWLY_ADDED_SUB_CHILD_MENU = '[Course Material Menu] Store Newly Added Sub Child Menu',
	
	COURSE_MATERIAL_MENU_CRUD_FAIL = '[Course Material Menu] Menu CRUD Fail',
	COURSE_MATERIAL_CHILD_MENU_CRUD_FAIL = '[Course Material Menu] Child Menu CRUD Fail',
	COURSE_MATERIAL_SUB_CHILD_MENU_CRUD_FAIL = '[Course Material Menu] Sub Child Menu CRUD Fail',

	//ACT_UPON_DATA = '[Course Material Menu] Act Upon Course Material Menu',
	// API_REQUEST_ADD_NEW_DATA = '[Course Material Menu] Send Api Request To Add New Course Material Menu',
	// API_REQUEST_EDIT_DATA = '[Course Material Menu] Send Api Request To Edit Course Material Menu',
	// API_REQUEST_DELETE_DATA = '[Course Material Menu] Send Api Request To Delete Course Material Menu',
	// STORE_NEWLY_ADDED_DATA = '[Course Material Menu] Store Newly Added Course Material Menu',
	// STORE_UPDATED_DATA = '[Course Material Menu] Store Updated Course Material Menu',
	// REMOVE_DATA_FROM_STORE = '[Course Material Menu] Remove Course Material Menu From Store',
	//DATA_CRUD_SUCCESS = '[Course Material Menu] Course Material Menu CRUD Successfully',
	//DATA_CRUD_FAIL = '[Course Material Menu] Skill CRUD Fail',
	//DATA_UPDATED_SUCCESS = '[Course Material Menu] Course Material Menu Updated Successfully',
	//DATA_DELETED_SUCCESS = '[Course Material Menu] Course Material Menu Deleted Successfully',
	NOOP = '[Course Material Menu] No Operation',
}