/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material flash card model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 13:54:40 
 * Last modified  : 2022-08-26 09:48:58
 */

import { MediaTypeEnum } from "../enum/media-type.enum";
import { OperationsEnum } from "../enum/operations.enum";
import { BaseModel } from "./base.model";

export interface CourseMaterialFlashCardModel extends BaseModel
{
    courseMaterialId?: string;
    articleId?: string;
    cardId?: string;
    frontMediaType?: MediaTypeEnum;
    frontMedia?: string;
    frontContent?: string;
    backMediaType?: MediaTypeEnum;
    backMedia?: string;
    backContent?: string;
    backContentMore?: string;
    operationType?: OperationsEnum;

}


