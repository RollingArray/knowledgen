/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-12-12 01:02:22
 * @modify date 2021-12-12 01:02:22
 * @desc Content element model
 */

import { ElementTypeEnum } from "../enum/element-type.enum";

export interface ContentElementModel
{
    value?: string;
    type?: ElementTypeEnum;
    link?: string;
}
