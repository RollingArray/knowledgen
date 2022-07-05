/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sub child menu state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:49:38 
 * Last modified  : 2022-07-05 16:50:01
 */

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";

/**
 * Selects sub child article id
 * @param subChildMenuModel 
 * @returns sub child article id 
 */
export function selectSubChildArticleId(subChildMenuModel: SubChildMenuModel): string
{
	return subChildMenuModel ? subChildMenuModel.subChildArticleId : '';
}

/**
 * Sub child menu state model
 */
export interface SubChildMenuStateModel extends EntityState<SubChildMenuModel> { }


export const subChildMenuAdapter: EntityAdapter<SubChildMenuModel> = createEntityAdapter<SubChildMenuModel>({
	selectId: selectSubChildArticleId
});

export const INITIAL_SUB_CHILD_MENU_STATE: SubChildMenuStateModel = subChildMenuAdapter.getInitialState();