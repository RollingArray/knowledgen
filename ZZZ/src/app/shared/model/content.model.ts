/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-12-12 01:02:40
 * @modify date 2021-12-12 01:02:40
 * @desc Content model
 */

import { ElementTypeEnum } from "../enum/element-type.enum";
import { OperationsEnum } from "../enum/operations.enum";
import { ArticleModel } from "./article.model";
import { ContentElementModel } from "./content-element.model";
import { CourseMaterialModel } from "./course-material.model";

export interface ContentModel extends CourseMaterialModel, ArticleModel
{
    articleComponentOrder?: number;
    articleComponentId?: string;
    articleComponentType?: ElementTypeEnum;
    articleComponentContent?: string;
    operationType?: OperationsEnum;
}
