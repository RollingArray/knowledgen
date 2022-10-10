/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Html command model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-10-09 08:15:03 
 * Last modified  : 2022-10-09 08:32:12
 */

export interface HtmlCommandModel {
    command? : string;
    icon: string;
    ifTriggerCommand: boolean;
    ifExplicitCommand: boolean;
    explicitCommandName?: string;
}
