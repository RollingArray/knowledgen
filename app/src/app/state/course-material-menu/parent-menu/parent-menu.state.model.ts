/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-14 19:30:21
 */



import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";


export function selectParentArticleId(parentMenuModel: ParentMenuModel): string
{
	return parentMenuModel ? parentMenuModel.parentArticleId : '';
}

export interface ParentMenuStateModel extends EntityState<ParentMenuModel> { }

export const parentMenuAdapter: EntityAdapter<ParentMenuModel> = createEntityAdapter<ParentMenuModel>({
	selectId: selectParentArticleId
});

export const INITIAL_PARENT_MENU_STATE: ParentMenuStateModel = parentMenuAdapter.getInitialState();