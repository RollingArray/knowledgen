/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Route model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-21 20:11:47 
 * Last modified  : 2022-09-21 20:12:10
 */


import { UserTypeEnum } from "../enum/user-type.enum";

export interface RouteModel
{
	title: string;
	children: RouteChildrenModel[];
}

export interface RouteChildrenModel
{
	title: string;
	root?: boolean;
	url?: string[];
	action?: string;
	icon: string;
	allowAccess?: UserTypeEnum[];
	allowMenuAccess?: boolean;
	isSelected?: boolean;
}