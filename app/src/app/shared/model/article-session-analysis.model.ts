/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Article session analysis model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-04 16:02:50 
 * Last modified  : 2022-08-04 16:02:50 
 */



import { CharacteristicsEnum } from "../enum/characteristics.enum";

export interface ArticleSessionAnalysisModel
{
    characteristics?: CharacteristicsEnum;
    value?: string;
}
