/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Api interceptor
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 12:48:29 
 * Last modified  : 2022-09-20 15:08:33
 */

import { Injectable } from '@angular/core';
import
{
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { RootStateFacade } from 'src/app/state/root/root.state.facade';

@Injectable()
export class ApiInterceptor implements HttpInterceptor
{
	// Interceptor constructor
	constructor(
		private toastController: ToastController,
		private rootStateFacade: RootStateFacade
	)
	{ 
		//
	}

	// intecept
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>>
	{

		// add authorization header with jwt token if available
		this.rootStateFacade.loggedInUserToken$.pipe(take(1)).subscribe(token =>
		{
			if (token)
			{
				this.rootStateFacade.loggedInUserId$.pipe(take(1)).subscribe(userId =>
				{
					request = request.clone({
						setHeaders: {
							Auth: `${token}`,
							UserId: userId
						}
					});
				});
				
			}
		})
		// if token available add it as auth header
		
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) =>
			{
				if (error.error instanceof ErrorEvent)
				{
					// client-side error or network error

				} else
				{
					if (error.status === 400)
					{
						this.rootStateFacade.stopModalLoading();
						const errorMessages: string[] = error.error.message;
						errorMessages.map(async responseMessage =>
						{
							if (this.toastController)
							{
								this.toastController.dismiss();
							}

							const toast = await this.toastController.create({
								message: responseMessage,
								cssClass: 'custom-toast',
								color: 'danger',
								duration: 3000,
								buttons: [
									{
										side: 'start',
										icon: 'information-circle',
										handler: () =>
										{
											//
										}
									}
								]
							});
							toast.present();


						})
					}
				}
				return throwError(error);
			})
		);
	}


}
