/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material file model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-06 20:11:49 
 * Last modified  : 2022-07-12 11:14:04
 */

import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "./base.model";

export interface CourseMaterialFileModel extends BaseModel
{
    articleId?: string;
    courseMaterialId?: string;
    file?: File;
    filePath?: string;
    fileName?: string;
    extension?: string;
    operationType?: OperationsEnum;
}
