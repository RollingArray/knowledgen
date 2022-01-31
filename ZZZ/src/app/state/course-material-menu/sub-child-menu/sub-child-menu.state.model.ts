/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-19 00:46:46
 */



import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SubChildMenuModel } from "src/app/shared/model/sub-child-menu.model";


export function selectSubChildArticleId(subChildMenuModel: SubChildMenuModel): string
{
	return subChildMenuModel ? subChildMenuModel.subChildArticleId : '';
}

export interface SubChildMenuStateModel extends EntityState<SubChildMenuModel> { }

export const subChildMenuAdapter: EntityAdapter<SubChildMenuModel> = createEntityAdapter<SubChildMenuModel>({
	selectId: selectSubChildArticleId
});

export const INITIAL_SUB_CHILD_MENU_STATE: SubChildMenuStateModel = subChildMenuAdapter.getInitialState();