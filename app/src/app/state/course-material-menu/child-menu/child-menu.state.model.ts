/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Child menu state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 14:52:38 
 * Last modified  : 2022-07-05 14:55:40
 */

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";

/**
 * Selects child article id
 * @param childMenuModel 
 * @returns child article id 
 */
export function selectChildArticleId(childMenuModel: ChildMenuModel): string
{
	return childMenuModel ? childMenuModel.childArticleId : '';
}

/**
 * Child menu state model
 */
export interface ChildMenuStateModel extends EntityState<ChildMenuModel> { }


export const childMenuAdapter: EntityAdapter<ChildMenuModel> = createEntityAdapter<ChildMenuModel>({
	selectId: selectChildArticleId
});


export const INITIAL_CHILD_MENU_STATE: ChildMenuStateModel = childMenuAdapter.getInitialState();