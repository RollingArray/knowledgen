/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary Avatar component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-20 11:18:54 
 * Last modified  : 2022-09-20 11:21:50
 */

import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import
	{
		Component,
		OnInit,
		Input,
		Output,
		EventEmitter,
		Injector,
	} from '@angular/core';

@Component({
	selector: 'avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent extends BaseViewComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @readonly properties                             |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @private Instance variable                       |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @public Instance variable                        |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Getter & Setters                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get userNameInitials()
	{
		return (
			this.firstName[0].toUpperCase() +
			'' +
			this.lastName[0].toUpperCase()
		);
	}

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @ViewChild Instance variable                     |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @input & @output Instance variable				|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of avatar component
	 */
	@Input() firstName = '';

	/**
	 * Input  of avatar component
	 */
	@Input() lastName = '';

	/**
	 * Input  of avatar component
	 */
	@Input() profileImage = '';

	/**
	 * Input  of avatar component
	 */
	@Input() profileSize = 'normal';

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * Life cycle hook                                  |
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of avatar component.
	 * @param injector 
	 */
	constructor(injector: Injector)
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
	 * @description                                     |
	 * @Private methods                                 |
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description                                     |
	 * @Public methods                                  |
	 * -------------------------------------------------|
	 */
}
