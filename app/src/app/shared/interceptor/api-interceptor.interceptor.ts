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
import { LocalStorageService } from '../service/local-storage.service';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ApiInterceptor implements HttpInterceptor
{
	// Interceptor constructor
	constructor(
		private localStorageService: LocalStorageService,
		private toastController: ToastController
	) { }

	// intecept
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>>
	{

		// add authorization header with jwt token if available
		const currentUserToken: string = this.localStorageService.getToken();
		const currentUserId: string = this.localStorageService.getActiveUserId();

		// if token available add it as auth header
		if (currentUserToken)
		{
			request = request.clone({
				setHeaders: {
					Auth: `${currentUserToken}`,
					UserId: currentUserId
				}
			});
		}
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
								duration: 2000,
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
