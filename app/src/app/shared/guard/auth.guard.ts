/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Auth guard
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 12:48:29 
 * Last modified  : 2022-09-20 12:51:40
 */


import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivate,
	Router
} from '@angular/router';
import { LocalStoreKey } from '../constant/local-store-key.constant';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	/**
	 * Creates an instance of auth guard.
	 * @param router 
	 * @param cookieService 
	 */
	constructor(
		private router: Router,
		private cookieService: CookieService,
	) {}

	/**
	 * Determines whether activate can
	 * @param route 
	 * @param state 
	 * @returns  
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
	{
		const token = this.cookieService.get(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`)
		if (token)
		{
			// logged in so return true
			
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/sign-in'], {
			// queryParams: { returnUrl: state.url }
		});
		return false;
	}
}
