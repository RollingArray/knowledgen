/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material menu state action
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:11:59 
 * Last modified  : 2022-07-05 19:38:48
 */

import { createAction, props } from '@ngrx/store';
import { ParentMenuModel } from 'src/app/shared/model/parent-menu.model';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { CourseMaterialMenuOperationsEnum } from './course-material-menu-operations.enum';
import { ChildMenuModel } from 'src/app/shared/model/child-menu.model';
import { SubChildMenuModel } from 'src/app/shared/model/sub-child-menu.model';
import { MenuSelectModel } from 'src/app/shared/model/menu-select.model';

/**
 * @description Course Material Menu Action - Api Request Course Material Menu
 */
export const API_REQUEST_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_MENU,
	props<{ payload: CourseMaterialModel }>()
);

/**
 * @description Course Material Menu Action - Loaded Generated Menu
 */
export const LOADING_GENERATED_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADING_GENERATED_MENU,
	props<{
		payloadCourseMaterial: CourseMaterialModel,
		payloadParentMenu: ParentMenuModel[],
		payloadChildMenu: ChildMenuModel[],
		payloadSubChildMenu: SubChildMenuModel[]
	}>()
);

/**
 * @description Course Material Menu Action - Act Upon New Parent Menu
 */
export const ACT_UPON_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.ACT_UPON_PARENT_MENU,
	props < { payload: ParentMenuModel, operation: OperationsEnum }>()
);

/**
 * @description Course Material Menu Action - Act Upon New Child Menu
 */
export const ACT_UPON_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.ACT_UPON_CHILD_MENU,
	props < { payload: ChildMenuModel, operation: OperationsEnum }>()
);

/**
 * @description Course Material Menu Action - Act Upon New Sub Child Menu
 */
export const ACT_UPON_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.ACT_UPON_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel, operation: OperationsEnum }>()
);

/**
 * @description Course Material Menu Action - Parent Menu Added Successfully
 */
export const PARENT_MENU_ADDED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.PARENT_MENU_ADDED_SUCCESS
);

/**
 * @description Course Material Menu Action - Child Menu Added Successfully
 */
export const CHILD_MENU_ADDED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.CHILD_MENU_ADDED_SUCCESS
);

/**
 * @description Course Material Menu Action - Sub Child Menu Added Successfully
 */
export const SUB_CHILD_MENU_ADDED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.SUB_CHILD_MENU_ADDED_SUCCESS
);

/**
 * @description Course Material Menu Action - Parent Menu Updated Successfully
 */
export const PARENT_MENU_UPDATED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.PARENT_MENU_UPDATED_SUCCESS
);

/**
 * @description Course Material Menu Action - Child Menu Updated Successfully
 */
export const CHILD_MENU_UPDATED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.CHILD_MENU_UPDATED_SUCCESS
);

/**
 * @description Course Material Menu Action - Sub Child Menu Updated Successfully
 */
export const SUB_CHILD_MENU_UPDATED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.SUB_CHILD_MENU_UPDATED_SUCCESS
);

/**
 * @description Course Material Menu Action - Parent Menu Deleted Successfully
 */
export const PARENT_MENU_DELETED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.PARENT_MENU_DELETED_SUCCESS
);

/**
 * @description Course Material Menu Action - Child Menu Deleted Successfully
 */
export const CHILD_MENU_DELETED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.CHILD_MENU_DELETED_SUCCESS
);

/**
 * @description Course Material Menu Action - Sub Child Menu Deleted Successfully
 */
export const SUB_CHILD_MENU_DELETED_SUCCESS = createAction(
	CourseMaterialMenuOperationsEnum.SUB_CHILD_MENU_DELETED_SUCCESS
);

/**
 * @description Course Material Menu Action - Loaded Course Material Parent Menu
 */
export const LOADED_REQUEST_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADED_REQUEST_PARENT_MENU,
	props<{ payload: ParentMenuModel[] }>()
);

/**
 * @description Course Material Menu Action - Loaded Course Material Child Menu
 */
export const LOADED_REQUEST_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADED_REQUEST_CHILD_MENU,
	props < { payload: ChildMenuModel[] }>()
);

/**
 * @description Course Material Menu Action - Loaded Course Material Sub Child Menu
 */
export const LOADED_REQUEST_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADED_REQUEST_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel[] }>()
);

/**
 * @description Course Material Menu Action - Api Request Add New Parent Menu
 */
export const API_REQUEST_ADD_NEW_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_ADD_NEW_PARENT_MENU,
	props < { payload: ParentMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Add New Child Menu
 */
export const API_REQUEST_ADD_NEW_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_ADD_NEW_CHILD_MENU,
	props < { payload: ChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Add New Sub Child Menu
 */
export const API_REQUEST_ADD_NEW_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_ADD_NEW_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Edit Parent Menu"
 */
export const API_REQUEST_EDIT_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_EDIT_PARENT_MENU,
	props < { payload: ParentMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Edit Child Menu
 */
export const API_REQUEST_EDIT_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_EDIT_CHILD_MENU,
	props < { payload: ChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Edit Sub Child Menu
 */
export const API_REQUEST_EDIT_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_EDIT_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Delete Parent Menu
 */
export const API_REQUEST_DELETE_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_DELETE_PARENT_MENU,
	props < { payload: ParentMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Delete Child Menu
 */
export const API_REQUEST_DELETE_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_DELETE_CHILD_MENU,
	props < { payload: ChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Api Request Delete Sub Child Menu
 */
export const API_REQUEST_DELETE_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_DELETE_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Store Newly Added Parent Menu
 */
export const STORE_NEWLY_ADDED_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_NEWLY_ADDED_PARENT_MENU,
	props < { payload: ParentMenuModel }>()
);

/**
 * @description Course Material Menu Action - Store Updated Parent Menu
 */
export const STORE_UPDATED_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_UPDATED_PARENT_MENU,
	props < { payload: ParentMenuModel }>()
);

/**
 * @description Course Material Menu Action - Delete Parent Menu From Store
 */
export const REMOVE_PARENT_MENU_FROM_STORE = createAction(
	CourseMaterialMenuOperationsEnum.REMOVE_PARENT_MENU_FROM_STORE,
	props < { payload: ParentMenuModel }>()
);

/**
 * @description Course Material Menu Action - Store Newly Added Child Menu
 */
export const STORE_NEWLY_ADDED_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_NEWLY_ADDED_CHILD_MENU,
	props < { payload: ChildMenuModel }>()
);

/////
/**
 * @description Course Material Menu Action - Store Updated Child Menu
 */
export const STORE_UPDATED_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_UPDATED_CHILD_MENU,
	props < { payload: ChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Delete Child Menu From Store
 */
export const REMOVE_CHILD_MENU_FROM_STORE = createAction(
	CourseMaterialMenuOperationsEnum.REMOVE_CHILD_MENU_FROM_STORE,
	props < { payload: ChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Store Newly Added Sub Child Menu
 */
export const STORE_NEWLY_ADDED_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_NEWLY_ADDED_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Store Updated Sub Child Menu
 */
export const STORE_UPDATED_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_UPDATED_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Delete Sub Child Menu From Store
 */
export const REMOVE_SUB_CHILD_MENU_FROM_STORE = createAction(
	CourseMaterialMenuOperationsEnum.REMOVE_SUB_CHILD_MENU_FROM_STORE,
	props < { payload: SubChildMenuModel }>()
);

/**
 * @description Course Material Menu Action - Parent Menu CRUD Fail
 */
export const CRUD_FAIL_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.CRUD_FAIL_PARENT_MENU
);

/**
 * @description Course Material Menu Action - Child Menu CRUD Fail
 */
export const CRUD_FAIL_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.CRUD_FAIL_CHILD_MENU
);

/**
 * @description Course Material Menu Action - Sub Child Menu CRUD Fail
 */
export const CRUD_FAIL_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.CRUD_FAIL_SUB_CHILD_MENU
);

/**
 * @description Course Material Menu Action - Parent Menu CRUD Fail
 */
export const CRUD_SUCCESS_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.CRUD_SUCCESS_PARENT_MENU
);

/**
 * @description Course Material Menu Action - Child Menu CRUD Fail
 */
export const CRUD_SUCCESS_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.CRUD_SUCCESS_CHILD_MENU
);

/**
 * @description Course Material Menu Action - Sub Child Menu CRUD Fail
 */
export const CRUD_SUCCESS_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.CRUD_SUCCESS_SUB_CHILD_MENU
);

/**
 * @description Course Material Menu Action - Store Selected Menu Article
 */
export const STORE_SELECTED_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_SELECTED_MENU,
	props < { payload: MenuSelectModel }>()
);

/**
 * @description Course Material Menu Action - Delete Selected Menu Article From Store
 */
export const REMOVE_SELECTED_MENU = createAction(
	CourseMaterialMenuOperationsEnum.REMOVE_SELECTED_MENU
);



/**
 * @description Course Material Menu Action - No Operation
 */
 export const NOOP = createAction(
	CourseMaterialMenuOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material Menu Action
 */
export const COURSE_MATERIAL_MENU_ACTIONS = {
	API_REQUEST_MENU,
	LOADING_GENERATED_MENU,
	LOADED_REQUEST_PARENT_MENU,
	LOADED_REQUEST_CHILD_MENU,
	LOADED_REQUEST_SUB_CHILD_MENU,
	
	ACT_UPON_PARENT_MENU,
	ACT_UPON_CHILD_MENU,
	ACT_UPON_SUB_CHILD_MENU,

	PARENT_MENU_ADDED_SUCCESS,
	CHILD_MENU_ADDED_SUCCESS,
	SUB_CHILD_MENU_ADDED_SUCCESS,

	PARENT_MENU_UPDATED_SUCCESS,
	CHILD_MENU_UPDATED_SUCCESS,
	SUB_CHILD_MENU_UPDATED_SUCCESS,

	PARENT_MENU_DELETED_SUCCESS,
	CHILD_MENU_DELETED_SUCCESS,
	SUB_CHILD_MENU_DELETED_SUCCESS,
	
	API_REQUEST_ADD_NEW_PARENT_MENU,
	API_REQUEST_ADD_NEW_CHILD_MENU,
	API_REQUEST_ADD_NEW_SUB_CHILD_MENU,

	API_REQUEST_EDIT_PARENT_MENU,
	API_REQUEST_EDIT_CHILD_MENU,
	API_REQUEST_EDIT_SUB_CHILD_MENU,

	API_REQUEST_DELETE_PARENT_MENU,
	API_REQUEST_DELETE_CHILD_MENU,
	API_REQUEST_DELETE_SUB_CHILD_MENU,
	
	STORE_NEWLY_ADDED_PARENT_MENU,
	STORE_UPDATED_PARENT_MENU,
	REMOVE_PARENT_MENU_FROM_STORE,

	STORE_NEWLY_ADDED_CHILD_MENU,
	STORE_UPDATED_CHILD_MENU,
	REMOVE_CHILD_MENU_FROM_STORE,

	STORE_NEWLY_ADDED_SUB_CHILD_MENU,
	STORE_UPDATED_SUB_CHILD_MENU,
	REMOVE_SUB_CHILD_MENU_FROM_STORE,
	
	CRUD_FAIL_PARENT_MENU,
	CRUD_FAIL_CHILD_MENU,
	CRUD_FAIL_SUB_CHILD_MENU,

	CRUD_SUCCESS_PARENT_MENU,
	CRUD_SUCCESS_CHILD_MENU,
	CRUD_SUCCESS_SUB_CHILD_MENU,
	
	STORE_SELECTED_MENU,
	REMOVE_SELECTED_MENU,
	NOOP
};