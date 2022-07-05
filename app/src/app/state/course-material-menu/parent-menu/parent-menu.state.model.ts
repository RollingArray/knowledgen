/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Parent menu state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:26:27 
 * Last modified  : 2022-07-05 16:26:48
 */

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ParentMenuModel } from "src/app/shared/model/parent-menu.model";

/**
 * Selects parent article id
 * @param parentMenuModel 
 * @returns parent article id 
 */
export function selectParentArticleId(parentMenuModel: ParentMenuModel): string
{
	return parentMenuModel ? parentMenuModel.parentArticleId : '';
}

/**
 * Parent menu state model
 */
export interface ParentMenuStateModel extends EntityState<ParentMenuModel> { }

export const parentMenuAdapter: EntityAdapter<ParentMenuModel> = createEntityAdapter<ParentMenuModel>({
	selectId: selectParentArticleId
});

export const INITIAL_PARENT_MENU_STATE: ParentMenuStateModel = parentMenuAdapter.getInitialState();