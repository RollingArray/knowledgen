/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-18 23:56:51
 */



import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ChildMenuModel } from "src/app/shared/model/child-menu.model";


export function selectChildArticleId(childMenuModel: ChildMenuModel): string
{
	return childMenuModel ? childMenuModel.childArticleId : '';
}

export interface ChildMenuStateModel extends EntityState<ChildMenuModel> { }

export const childMenuAdapter: EntityAdapter<ChildMenuModel> = createEntityAdapter<ChildMenuModel>({
	selectId: selectChildArticleId
});

export const INITIAL_CHILD_MENU_STATE: ChildMenuStateModel = childMenuAdapter.getInitialState();