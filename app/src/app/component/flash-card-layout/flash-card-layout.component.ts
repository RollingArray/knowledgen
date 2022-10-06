/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Flash card layout component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-10-06 17:18:55 
 * Last modified  : 2022-10-06 17:21:04
 */

import { Component, OnInit, Input, Output, Injector, EventEmitter } from "@angular/core";
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";
import { StringKey } from "src/app/shared/constant/string.constant";
import { FlashCardViewEnum } from "src/app/shared/enum/flash-card-view.enum";
import { MediaTypeEnum } from "src/app/shared/enum/media-type.enum";
import { CourseMaterialFlashCardModel } from "src/app/shared/model/course-material-flash-card.model";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'flash-card-layout',
	templateUrl: './flash-card-layout.component.html',
	styleUrls: ['./flash-card-layout.component.scss']
})
export class FlashCardLayoutComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of flash card layout component
	 */
	readonly stringKey = StringKey;

	/**
	 * Media type enum of flash card layout component
	 */
	readonly mediaTypeEnum = MediaTypeEnum;

	/**
	 * Flash card view enum of flash card layout component
	 */
	readonly flashCardViewEnum = FlashCardViewEnum;

	/**
	 * Api urls of flash card layout component
	 */
	readonly apiUrls = ApiUrls;

	/**
	 * Audio type of flash card layout component
	 */
	readonly audioType = "audio/mpeg";

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of flash card layout component
	 */
	@Input() selectedCard: CourseMaterialFlashCardModel;

	/**
	 * Input  of flash card layout component
	 */
	@Input() careView: FlashCardViewEnum;

	/**
	 * Output  of flash card layout component
	 */
	@Output() event = new EventEmitter();

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of flash card layout component
	 */
	private _audioLoading = false;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get audioLoading()
	{
		return this._audioLoading;
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of flash card layout component.
	 * @param injector 
	 */
	constructor(
		injector: Injector,
	)
	{
		super(injector);

	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	public onCardFlipAction()
	{
		this.event.emit();
	}

	/**
	 * Plays flash card layout component
	 * @param audioFile 
	 */
	public play(audioFile: string)
	{
		var audio = new Audio(`${this.apiUrls.FILE}${audioFile}`);
		audio.play();
	}
}


