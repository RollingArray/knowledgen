/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course Material Actions
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 18:16:13 
 * Last modified  : 2022-01-19 23:21:26
 */

import { createAction, props } from '@ngrx/store';
import { ParentMenuModel } from 'src/app/shared/model/parent-menu.model';
import { CourseMaterialModel } from 'src/app/shared/model/course-material.model';
import { OperationsEnum } from '../../shared/enum/operations.enum';
import { CourseMaterialMenuOperationsEnum } from './course-material-menu-operations.enum';
import { ChildMenuModel } from 'src/app/shared/model/child-menu.model';
import { SubChildMenuModel } from 'src/app/shared/model/sub-child-menu.model';


export const API_REQUEST_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_MENU,
	props<{ payload: CourseMaterialModel }>()
);


export const LOADING_GENERATED_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADING_GENERATED_MENU,
	props<{
		payloadCourseMaterial: CourseMaterialModel,
		payloadParentMenu: ParentMenuModel[],
		payloadChildMenu: ChildMenuModel[],
		payloadSubChildMenu: SubChildMenuModel[]
	}>()
);

// loaded api data
export const LOADED_REQUEST_PARENT_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADED_REQUEST_PARENT_MENU,
	props<{ payload: ParentMenuModel[] }>()
);

export const LOADED_REQUEST_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADED_REQUEST_CHILD_MENU,
	props < { payload: ChildMenuModel[] }>()
);

export const LOADED_REQUEST_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.LOADED_REQUEST_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel[] }>()
);

// api request add
export const API_REQUEST_ADD_NEW_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_ADD_NEW_MENU,
	props < { payload: ParentMenuModel }>()
);

export const API_REQUEST_ADD_NEW_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_ADD_NEW_CHILD_MENU,
	props < { payload: ChildMenuModel }>()
);

export const API_REQUEST_ADD_NEW_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.API_REQUEST_ADD_NEW_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel }>()
);

// store newly add
export const STORE_NEWLY_ADDED_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_NEWLY_ADDED_MENU,
	props < { payload: ParentMenuModel }>()
);

export const STORE_NEWLY_ADDED_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_NEWLY_ADDED_CHILD_MENU,
	props < { payload: ChildMenuModel }>()
);

export const STORE_NEWLY_ADDED_SUB_CHILD_MENU = createAction(
	CourseMaterialMenuOperationsEnum.STORE_NEWLY_ADDED_SUB_CHILD_MENU,
	props < { payload: SubChildMenuModel }>()
);

// crud fail
export const COURSE_MATERIAL_MENU_CRUD_FAIL = createAction(
	CourseMaterialMenuOperationsEnum.COURSE_MATERIAL_MENU_CRUD_FAIL
);

export const COURSE_MATERIAL_CHILD_MENU_CRUD_FAIL = createAction(
	CourseMaterialMenuOperationsEnum.COURSE_MATERIAL_CHILD_MENU_CRUD_FAIL
);

export const COURSE_MATERIAL_SUB_CHILD_MENU_CRUD_FAIL = createAction(
	CourseMaterialMenuOperationsEnum.COURSE_MATERIAL_SUB_CHILD_MENU_CRUD_FAIL
);

/**
 * @description Action - No Operation
 */
 export const NOOP = createAction(
	CourseMaterialMenuOperationsEnum.NOOP,
);

/**
 * @description Export all Course Material
 */
export const COURSE_MATERIAL_MENU_ACTIONS = {
	API_REQUEST_MENU,
	LOADING_GENERATED_MENU,
	LOADED_REQUEST_PARENT_MENU,
	LOADED_REQUEST_CHILD_MENU,
	LOADED_REQUEST_SUB_CHILD_MENU,
	API_REQUEST_ADD_NEW_MENU,
	API_REQUEST_ADD_NEW_CHILD_MENU,
	API_REQUEST_ADD_NEW_SUB_CHILD_MENU,
	STORE_NEWLY_ADDED_MENU,
	STORE_NEWLY_ADDED_CHILD_MENU,
	STORE_NEWLY_ADDED_SUB_CHILD_MENU,
	COURSE_MATERIAL_MENU_CRUD_FAIL,
	COURSE_MATERIAL_CHILD_MENU_CRUD_FAIL,
	COURSE_MATERIAL_SUB_CHILD_MENU_CRUD_FAIL,
	NOOP
};