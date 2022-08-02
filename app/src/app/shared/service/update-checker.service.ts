import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UpdateCheckerService {
	constructor(
		private swUpdate: SwUpdate,
	) { }

	/**
	 * Checks if app update available
	 */
	 async checkIfAppUpdateAvailable()
	 {
 
		 if (this.swUpdate.isEnabled)
		 {
			 this.swUpdate
				 .available
				 .pipe(take(1))
				 .subscribe(() =>
				{
					let versionUpdateMessage = `New version of KnowledgeN is available. Load New Version ?`;
	
					if (confirm(versionUpdateMessage))
					{
						window.location.reload();
					}
				});
		 }
	 }
}
