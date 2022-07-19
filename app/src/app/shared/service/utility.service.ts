/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Utility service
 *
 * Created at     : 2022-07-14 12:41:43 
 * Last modified  : 2022-07-14 12:41:43 
 */

import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class UtilityService {
	/**
	 * Creates an instance of utility service.
	 */
	constructor(){}

	/**
	 * Gets temp id
	 * @returns temp id 
	 */
	 public getTempId(): string
	 {
		 return Math.floor(Math.random() * 100).toString();
	 }
}
