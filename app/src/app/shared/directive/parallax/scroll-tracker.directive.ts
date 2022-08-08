/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Scroll tracker directive
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-08-06 07:10:54 
 * Last modified  : 2022-08-06 07:16:51
 */


import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy } from "@angular/core";
import { DomController } from "@ionic/angular";
import { Subscription } from 'rxjs';

@Directive({
	selector: "[appScrollTracker]",
})
export class ScrollTrackerDirective implements OnInit, OnDestroy
{

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @private Instance variable								|
	 * -------------------------------------------------|
	 */
	/**
	 * Description  of scroll tracker directive
	 */
	private _hidden = true;

	/**
	 * Trigger distance of scroll tracker directive
	 */
	private _triggerDistance = 40;

	/**
	 * Subscription  of scroll tracker directive
	 */
	private _subscription: Subscription = new Subscription();

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Input & @Output									|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of scroll tracker directive
	 */
	@Input("appScrollTracker") scrollArea;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of scroll tracker directive.
	 * @param element 
	 * @param renderer 
	 * @param domCtrl 
	 */
	constructor(
		private element: ElementRef,
		private renderer: Renderer2,
		private domCtrl: DomController
	) { }

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.initStyles();
		const _subscription = this.scrollArea
			.ionScroll
			.subscribe((scrollEvent) =>
			{
				const delta = scrollEvent.detail.scrollTop;
				if (scrollEvent.detail.currentY === 0 && this._hidden)
				{
					this.hide();
				} else if (!this._hidden && delta > this._triggerDistance)
				{
					this.show();
				} else if (this._hidden && delta < this._triggerDistance)
				{
					this.hide();
				}
			});

		this._subscription.add(_subscription);
	}

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		this._subscription.unsubscribe();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */
	/**
	 * Descriptions scroll tracker directive
	 */
	private initStyles()
	{
		this.domCtrl.write(() =>
		{
			this.renderer.setStyle(this.element.nativeElement, "transition", "2s linear");
			this.renderer.setStyle(this.element.nativeElement.querySelector('ion-title'), "opacity", "0");
			this.renderer.addClass(this.element.nativeElement, 'ion-no-border');
			this.renderer.setAttribute(this.element.nativeElement.querySelector('ion-toolbar'), 'color', 'primary');
		});
		this._hidden = false;
	}

	/**
	 * Shows scroll tracker directive
	 */
	private show()
	{
		this.domCtrl.write(() =>
		{
			this.renderer.setStyle(this.element.nativeElement, "transition", "2s linear");
			this.renderer.setStyle(this.element.nativeElement.querySelector('ion-title'), "opacity", "1");
			this.renderer.removeClass(this.element.nativeElement, 'ion-no-border');
			this.renderer.setAttribute(this.element.nativeElement.querySelector('ion-toolbar'), 'color', 'primary');
		});

		this._hidden = true;
	}

	/**
	 * Hides scroll tracker directive
	 */
	private hide()
	{
		this.domCtrl.write(() =>
		{
			this.renderer.setStyle(this.element.nativeElement, "transition", "2s linear");
			this.renderer.setStyle(this.element.nativeElement.querySelector('ion-title'), "opacity", "0");
			this.renderer.addClass(this.element.nativeElement, 'ion-no-border');
			this.renderer.setAttribute(this.element.nativeElement.querySelector('ion-toolbar'), 'color', 'primary');
		});

		this._hidden = false;
	}
}