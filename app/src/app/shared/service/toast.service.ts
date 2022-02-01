import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
	providedIn: "root"
})
export class ToastService
{
	constructor(public toastController: ToastController) { }

	//present toast message
	async presentToast(responseMessage)
	{
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
	}
}
