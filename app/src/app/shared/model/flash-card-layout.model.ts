/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Flash card layout model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-13 13:54:40 
 * Last modified  : 2022-08-18 10:22:41
 */

import { MediaTypeEnum } from "../enum/media-type.enum";

export interface FlashCardLayoutModel
{
    mediaType: MediaTypeEnum,
    mediaUrl?: string,
    content: string
}


