/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Menu select state model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 16:23:29 
 * Last modified  : 2022-07-05 16:23:47
 */

/**
 * Summary
 */
export interface MenuSelectStateModel {
	articleId: string,
}

/**
 * @description Menu Select initial state
 */
export const INITIAL_MENU_SELECT_STATE: MenuSelectStateModel = {
	articleId: ''
};