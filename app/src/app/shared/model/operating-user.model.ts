/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Operating user model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-05 10:55:00 
 * Last modified  : 2022-07-05 10:55:00 
 */


import { OperationsEnum } from "../enum/operations.enum";


 export interface OperatingUserModel{
     userId ?: string;
     operationType ?: OperationsEnum;
 }