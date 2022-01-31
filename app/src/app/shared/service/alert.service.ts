import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AlertService {
	constructor(public alertController: AlertController) {}

	// present loading controller
	async presentBasicAlert(message: string) {
		return await this.alertController
			.create({
				header: 'KnowledgeN',
				message,
				buttons: ['Okay']
			})
			.then(response => {
				response
					.present()
					.then(() => {
						//
					});
			});
	}

	public async presentAlert(title: string, message: string, action: string) {
		const basicAlert = await this.alertController.create({
			header: title,
			mode: 'ios',
			message,
			buttons: [
				{
					text: 'action',
					handler: async _ => {
						//
					},
					cssClass: 'ok-button',
				},
			],
		});
		await basicAlert.present();
	}
}
