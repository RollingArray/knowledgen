/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Base Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:19:35 
 * Last modified  : 2022-01-16 07:42:36
 */

import { OperationsEnum } from '../enum/operations.enum';
import { ErrorModel } from './error.model';
import { OperatingUserModel } from './operating-user.model';

export interface BaseModel extends OperatingUserModel
{
	error?: boolean;
	success?: boolean;
	message?: string[];
	token?: string;
	tokenUpdated?: boolean;
	data?: any;
	crudReturn?: any;
	operation?: OperationsEnum;
	resource?: any;
	createdAt?: string;
	updatedAt?: string;
}
