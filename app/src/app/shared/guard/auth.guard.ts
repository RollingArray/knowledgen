/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Auth guard
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 12:48:29 
 * Last modified  : 2022-09-20 14:33:56
 */


import { Injectable } from '@angular/core';
import
	{
		ActivatedRouteSnapshot,
		RouterStateSnapshot,
		CanActivate,
		Router
	} from '@angular/router';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate
{

	/**
	 * Creates an instance of auth guard.
	 * @param router 
	 * @param rootStateFacade 
	 */
	constructor(
		private router: Router,
		private rootStateFacade: RootStateFacade
	) { }

	/**
	 * Determines whether activate can
	 * @param next 
	 * @param state 
	 * @returns  
	 */
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
	{
		return this.rootStateFacade.loggedInUserToken$.pipe(
			map(token =>
			{
				if (token)
				{
					return true;
				} else
				{
					this.router.navigate(['/sign-in']);
				}
			}),
			catchError((err) =>
			{
				console.log(err);
				this.router.navigate(['/sign-in']);
				return of(false);
			})
		);
	}
}
