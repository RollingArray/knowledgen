/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Content audio component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-25 16:15:05 
 * Last modified  : 2022-08-25 17:34:49
 */

import { Component, OnInit, OnDestroy, Injector, ViewChild, ElementRef } from "@angular/core";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { BaseFormComponent } from "../base/base-form.component";
import { CourseMaterialFileModel } from "src/app/shared/model/course-material-fle.model";
import { CourseMaterialFileUploadService } from "src/app/shared/service/course-material-file-upload.service";
import { NavParams } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ArrayKey } from "src/app/shared/constant/array.constant";

@Component({
	selector: "content-audio",
	templateUrl: "./content-audio.component.html",
	styleUrls: ["./content-audio.component.scss"],
})
export class ContentAudioComponent extends BaseFormComponent implements OnInit, OnDestroy
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of crud course material component
	 */
	 readonly arrayKey = ArrayKey;

	 /**
	  * String key of crud course material component
	  */
	readonly stringKey = StringKey;
	
	/**
	 * Audio type of content audio component
	 */
	readonly audioType = "audio/mpeg";

	/**
	 * Audio file extension of content audio component
	 */
	readonly audioFileExtension = "mp3";
	
 
	 /**
	  * -------------------------------------------------|
	  * @description										|
	  * @input & @output Instance variable				|
	  * -------------------------------------------------|
	  */
	
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
	 * Record stared of record page
	 */
	private _recordStared = false;

	/**
	 * Media recorder of record page
	 */
	private _mediaRecorder: any;

	/**
	 * Chunks  of record page
	 */
	private _chunks = [];

	/**
	 * Audio data of record page
	 */
	private _audioData: any;

	/**
	 * Minute  of record page
	 */
	private _minute = 0;

	/**
	 * Second  of record page
	 */
	private _second = 0;

	/**
	 * Millisecond  of record page
	 */
	private _millisecond = 0;

	/**
	 * Determines whether running is
	 */
	private _isRunning = false;

	/**
	 * Timer id of record page
	 */
	_timerId: null | ReturnType<typeof setTimeout> = null

	/**
	 * Course material file model of content image component
	 */
	private _courseMaterialFileModel: CourseMaterialFileModel;

	private _timerStarted = false;

	private _timerEnded = false;

	/**
	 * Time animation request id of audio player component
	 */
	 private _timeAnimationRequestId: number;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	  * Gets record stared
	  */
	get recordStared()
	{
		return this._recordStared;
	}

	/**
	 * Gets minute
	 */
	get minute()
	{
		return this._minute;
	}

	/**
	 * Gets second
	 */
	get second()
	{
		return this._second;
	}

	/**
	 * Gets millisecond
	 */
	get millisecond()
	{
		return this._millisecond;
	}

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
	 * Gets timer started
	 */
	public get timerStarted()
	{
		return this._timerStarted;
	}

	/**
	 * Gets timer ended
	 */
	public get timerEnded()
	{
		return this._timerEnded;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * ViewChild								|
	 * -------------------------------------------------|
	 */
	/** Template reference to the canvas element */
	@ViewChild('canvasEl') canvasEl: ElementRef;

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
		this._file = new File([this._audioData], `${new Date().getTime()}.${this.audioFileExtension}`, {
			type: this.audioType, lastModified: new Date().getTime()
		});


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
		this.stop();
		this.modalController.dismiss(this._modalData).then(() =>
		{
			//
		});
	}

	/**
	 * after view init
	 */
	ngAfterViewInit()
	{
		this.requestForAudioAccess();
	}

	/**
	 * Requests for audio access
	 */
	private requestForAudioAccess()
	{
		navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream =>
		{
			//
		}).catch(err =>
		{
			console.log("u got an error:" + err)
		});
	}

	/**
	 * Starts record page
	 */
	start()
	{
		this._timerStarted = true;
		this._timerEnded = false;
		var constraints = { audio: true };

		navigator.mediaDevices.getUserMedia(constraints).then((stream) =>
		{
			this._recordStared = true;

			// put canvas on screen
			this.buildTimeDomainGraph(stream);

			this._mediaRecorder = new MediaRecorder(stream);

			this._mediaRecorder.start();

			this._mediaRecorder.ondataavailable = (event) =>
			{
				this._chunks.push(event.data);
			}

			this._mediaRecorder.onstop = () =>
			{
				stream.getTracks().forEach(function (track) { track.stop() });

				const type = {
					'type': this.audioType
				};
				this._audioData = new Blob(this._chunks, type);
				this._chunks = [];
			}
		})
	}

	/**
	 * Builds time domain graph
	 * @param stream 
	 */
	private buildTimeDomainGraph(stream: MediaStream)
	{
		const WIDTH = (this.canvasEl.nativeElement as HTMLCanvasElement).width;
		const HEIGHT = (this.canvasEl.nativeElement as HTMLCanvasElement).height;
		let canvas = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext("2d");
		canvas.fillStyle = "#003566";

		var AudioContext = window.AudioContext // Default
			|| (window as any).webkitAudioContext;// Safari and old versions of Chrome

		// grab audio context
		const context = new AudioContext();

		// create gain
		const gainNode = context.createGain();

		// get media stream from audio source, ex microphone
		const src = context.createMediaStreamSource(stream);

		// connect  gain to source
		src.connect(gainNode);

		// connect gain to destination
		gainNode.connect(context.destination);
		gainNode.gain.setTargetAtTime(0, context.currentTime, 0);

		// create analyzer
		const analyser = context.createAnalyser();
		src.connect(analyser);
		gainNode.connect(analyser);

		// get frequency bin count
		const bufferLength = analyser.frequencyBinCount;

		// get data array
		const dataArray = new Uint8Array(bufferLength);


		// start animate loop to print on screen 
		const animationLoop = () =>
		{
			//Use requestAnimationFrame() to keep looping the drawing function once it has been started
			this._timeAnimationRequestId = requestAnimationFrame(animationLoop);

			//Use requestAnimationFrame() to keep looping the drawing function once it has been started
			//requestAnimationFrame(animationLoop);

			//	grab the time domain data and copy it into our array
			analyser.getByteTimeDomainData(dataArray);

			//fill the canvas with a solid color to start
			canvas.fillRect(0, 0, WIDTH, HEIGHT);

			//Set a line width and stroke color for the wave we will draw, then begin drawing a path
			canvas.lineWidth = 2;
			canvas.strokeStyle = 'rgb(255, 255, 255)';
			canvas.beginPath();

			//Determine the width of each segment of the line to be drawn by dividing the canvas width by the array length
			var sliceWidth = WIDTH * 1.0 / bufferLength;
			var x = 0;

			//run through a loop, defining the position of a small segment of the wave for each point in the buffer at a certain height
			for (var i = 0; i < bufferLength; i++)
			{

				var v = dataArray[i] / 130.0;
				var y = v * HEIGHT / 2;

				if (i === 0)
				{
					canvas.moveTo(x, y);
				}
				else
				{
					canvas.lineTo(x, y);
				}

				x += sliceWidth;
			}

			//finish the line in the middle of the right hand side of the canvas
			canvas.lineTo(WIDTH, HEIGHT / 2);
			canvas.stroke();
		};

		animationLoop();
	}

	/**
	 * Stops record page
	 */
	stop()
	{
		this._timerStarted = false;
		this._timerEnded = true;
		this._recordStared = false;
		this._mediaRecorder.stop();
		cancelAnimationFrame(this._timeAnimationRequestId);
	}
}
