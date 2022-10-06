/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary content image component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-12 12:08:44 
 * Last modified  : 2022-10-06 18:48:36
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { BaseFormComponent } from "../base/base-form.component";
import { CourseMaterialFileModel } from "src/app/shared/model/course-material-fle.model";
import { CourseMaterialFileUploadService } from "src/app/shared/service/course-material-file-upload.service";
import { NavParams } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "content-image",
	templateUrl: "./content-image.component.html",
	styleUrls: ["./content-image.component.scss"],
})
export class ContentImageComponent extends BaseFormComponent implements OnInit, OnDestroy
{
	/**
	 * Modal data of choose category component
	 */
	private _modalData: ModalData;
	/**
	 * File uploader of incident image component
	 */
	private _file: File;

	/**
	 * Img url of incident image component
	 */
	private _imgURL: any;

	/**
	 * Course material file model of content image component
	 */
	private _courseMaterialFileModel: CourseMaterialFileModel;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */



	/**
	 * Gets img url
	 */
	public get imgURL(): any
	{
		return this._imgURL;
	}

	/**
	 * Sets img url
	 */
	public set imgURL(value: any)
	{
		this._imgURL = value;
	}



	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Readonly property								|
	 * -------------------------------------------------|
	 */


	/**
	 * Creates an instance of content image component.
	 * @param injector 
	 * @param alertService 
	 * @param loadingService 
	 * @param courseMaterialFileUploadService 
	 * @param navParams 
	 * @param translateService 
	 */
	constructor(
		private injector: Injector,
		private alertService: AlertService,
		private loadingService: LoadingService,
		private courseMaterialFileUploadService: CourseMaterialFileUploadService,
		public navParams: NavParams,
		private translateService: TranslateService
	)
	{
		super(injector);
		this._courseMaterialFileModel = this.navParams.get('courseMaterialFile');
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		//
	}

	/**
	 * Ions view did enter
	 */
	ionViewDidEnter()
	{
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Cancels modal
	 */
	public cancelModal()
	{

		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};
		// store active user
		this.dismissModal();
	}

	/**
	 * @description Inits loading
	 */
	private initLoading()
	{
		// present loader
		this.translateService
			.get('loading.uploading')
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: string) =>
			{
				this.loadingService.present(data);
			});
	}

	/**
	 * Uploads files
	 */
	public uploadFiles()
	{
		if (this._file.size == 0)
		{
			this.translateService
				.get('errorMessage.selectImage')
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(async (data: string) =>
				{
					this.alertService.presentBasicAlert(data);
				});
		}
		else
		{
			if (this._file.size / 1024 > 1024) // 1 mb
			{
				this.translateService
					.get('errorMessage.imageSize')
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(async (data: string) =>
					{
						this.alertService.presentBasicAlert(data);
					});
			}
			else
			{
				const courseMaterialFileModel: CourseMaterialFileModel = {
					...this._courseMaterialFileModel,
					file: this._file
				}
				this.initLoading();
				this.courseMaterialFileUploadService
					.uploadCourseMaterialFile(courseMaterialFileModel)
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(courseMaterialFileModel =>
					{
						this.loadingService.dismiss();
						this._modalData = {
							cancelled: false,
							operationSubmitted: false,
							returnData: courseMaterialFileModel.resource
						};

						// store active user
						this.dismissModal();
					});
			}


		}
	}

	/**
	 * Previews incident image component
	 * @param files 
	 * @returns  
	 */
	public preview(files)
	{
		if (files.length === 0)
			return;

		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null)
		{
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) =>
		{
			this._imgURL = reader.result;
		}

		this._file = files[0];
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Private methods								|
	 * -------------------------------------------------|
	 */

	/**
	 * Dismiss modal
	 */
	private dismissModal()
	{
		this.modalController.dismiss(this._modalData).then(() =>
		{
			//
		});
	}
}
