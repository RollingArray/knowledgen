/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * @summary User peer component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-09-19 19:14:13 
 * Last modified  : 2022-09-20 16:19:06
 */

import { Component, OnInit, Injector, ElementRef, ViewChild } from "@angular/core";
import { AnimationController } from "@ionic/angular";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { DashboardStudentModel } from "src/app/shared/model/dashboard-student.model";
import { UserPeerModel } from "src/app/shared/model/user-peer.model";
import { UserModel } from "src/app/shared/model/user.model";
import { DashboardStateFacade } from "src/app/state/dashboard/dashboard.state.facade";
import { RootStateFacade } from "src/app/state/root/root.state.facade";
import { UserPeerStateFacade } from "src/app/state/user-peer/user-peer.state.facade";
import { BaseFormComponent } from "../base/base-form.component";

@Component({
	selector: 'user-peer',
	templateUrl: './user-peer.component.html',
	styleUrls: ['./user-peer.component.scss'],
})
export class UserPeerComponent extends BaseFormComponent implements OnInit
{
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @readonly properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of user peer component
	 */
	readonly stringKey = StringKey;

	/**
	 * User peers of user peer component
	 */
	private _userPeers: UserPeerModel[];

	/**
	 * Private animation duration of user peer component
	 */
	private _animationDuration = 100;

	/**
	 * Transition height of user peer component
	 */
	private _transitionHeight = -291;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @public Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of user peer component
	 */
	public userPeers$: Observable<UserPeerModel[]>;

	/**
	 * User peer has data$ of user peer component
	 */
	public userPeerHasData$: Observable<boolean>;

	/**
	 * Modal loading indicator status$ of user peer component
	 */
	public modalLoadingIndicatorStatus$: Observable<boolean>

	/**
	 * Dashboard student$ of user peer component
	 */
	public dashboardStudent$: Observable<DashboardStudentModel>;

	/**
	 * Logged in user$ of user peer component
	 */
	public loggedInUser$: Observable<UserModel>;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Getter & Setters									|
	 * -------------------------------------------------|
	 */

	/**
	 * Gets description
	 */
	get userPeers()
	{
		return this._userPeers;
	}

	/**
	 * Gets point level image
	 */
	public pointLevelImage(studyPoints: number)
	{
		return this.dashboardStateFacade.getPointLevelImageForStudyPoint(studyPoints);
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @ViewChild Instance variable						|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of user peer component
	 */
	@ViewChild("dropSelector", { read: ElementRef, static: true }) dropSelector: ElementRef;

	/**
	 * View child of user peer component
	 */
	@ViewChild("dropSelectorBackdrop", { read: ElementRef, static: true }) dropSelectorBackdrop: ElementRef;

	/**
	 * View child of user peer component
	 */
	@ViewChild("crudPeerDropSelector", { read: ElementRef, static: true }) crudPeerDropSelector: ElementRef;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * Life cycle hook									|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of user peer component.
	 * @param injector 
	 * @param rootStateFacade 
	 * @param userPeerStateFacade 
	 * @param animationController 
	 * @param dashboardStateFacade 
	 */
	constructor(
		injector: Injector,
		private rootStateFacade: RootStateFacade,
		private userPeerStateFacade: UserPeerStateFacade,
		private animationController: AnimationController,
		private dashboardStateFacade: DashboardStateFacade
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.dropSelectorBackdrop.nativeElement.hidden = true;
		this.loadData();
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Loads data
	 */
	private loadData()
	{
		this.loggedInUser$ = this.rootStateFacade.loggedInUser$;
		this.dashboardStudent$ = this.dashboardStateFacade.dashboardStudent$;
		this.userPeerHasData$ = this.userPeerStateFacade.userPeerHasData$;
		this.modalLoadingIndicatorStatus$ = this.rootStateFacade.modalLoadingIndicatorStatus$;

		// get act upon curd model from store
		this.userPeerStateFacade.userPeerCurdOperationStatus$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data =>
				{
					if (data === OperationsEnum.OPERATION_COMPLETE)
					{
						this.createNewPeer();
						this.rootStateFacade.startModalLoading();
						this.userPeerStateFacade.requestUserPeer();
					}
				}
			);

		// if no data available ... make a api request, else work with store data
		this.userPeerHasData$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((hasData) =>
			{
				if (!hasData)
				{
					this.rootStateFacade.startModalLoading();
					this.userPeerStateFacade.requestUserPeer();
				}
			});

		// sort total study points by descending order
		this.userPeerStateFacade.allUserPeer$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data =>
				{
					this.sortTotalStudyPointsByDescendingOrder(data);
				}
			);
	}

	/**
	 * Creates new peer
	 */
	async createNewPeer()
	{
		// build a empty object
		const model: UserPeerModel = {
			userEmail: '',
			operationType: OperationsEnum.CREATE
		};

		this.userPeerStateFacade.actUponUserPeer(model, OperationsEnum.CREATE);

	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Private methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions user peer component
	 * @param data 
	 */
	private sortTotalStudyPointsByDescendingOrder(userPeers: UserPeerModel[])
	{
		// add user(you) to the list 
		let you: UserPeerModel;

		this.dashboardStudent$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				data =>
				{
					you = {
						totalStudyPoints: data.studyPoints
					}
				}
			);
		this._userPeers = [...userPeers, you].sort(function (a, b)
		{
			return b.totalStudyPoints - a.totalStudyPoints;
		});
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods									|
	 * -------------------------------------------------|
	 */

	/**
	 * Closes modal
	 */
	public closeModal()
	{
		// dismiss modal view
		this.modalController.dismiss();
	}

	/**
	 * Deletes peer
	 * @param userPeer 
	 */
	deletePeer(userPeer: UserPeerModel)
	{
		// build a empty object
		const model: UserPeerModel = {
			peerId: userPeer.peerId,
			userPeerId: userPeer.userPeerId,
			operationType: OperationsEnum.DELETE
		};

		this.userPeerStateFacade.actUponUserPeer(model, OperationsEnum.DELETE);
	}

	/**
	 * Opens crud peer drop selector
	 */
	async openCrudPeerDropSelector()
	{
		//hide drop selectors
		this.dropSelectorBackdrop.nativeElement.hidden = false;
		this.crudPeerDropSelector.nativeElement.hidden = false;

		// animate to open it
		const animation = this.animationController
			.create()
			.addElement(this.dropSelector.nativeElement)
			.duration(this._animationDuration)
			.fromTo("transform", "translateY(0px)", `translateY(${this._transitionHeight}px)`);
		animation.play()
			.then(_ =>
				
				// set up default empty peer to create new
				this.createNewPeer()
			);
	}

	/**
	 * Closes crud peer drop selector
	 */
	async closeCrudPeerDropSelector()
	{
		this.dropSelectorBackdrop.nativeElement.hidden = true;
		const animation = this.animationController
			.create()
			.addElement(this.dropSelector.nativeElement)
			.duration(this._animationDuration)
			.fromTo("transform", `translateY(${this._transitionHeight}px)`, "translateY(0px)");
		animation.play();
	}
}
