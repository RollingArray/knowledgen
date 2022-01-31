/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Local storage service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 10:16:05 
 * Last modified  : 2022-01-26 20:12:30
 */


import { UserModel } from './../model/user.model';
import { Injectable } from '@angular/core';
import { LocalStoreKey } from '../constant/local-store-key.constant';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { EncryptionService } from './encryption.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})


export class LocalStorageService
{
	/**
	 * Current active user$ of local storage service
	 */
	public currentActiveUser$ = new BehaviorSubject<UserModel>({});

	/**
	 * Current active user name$ of local storage service
	 */
	public currentActiveUserName$ = new BehaviorSubject<string>("");

	/**
	 * Current active user email$ of local storage service
	 */
	public currentActiveUserEmail$ = new BehaviorSubject<string>("");

	/**
	 * Current active user id$ of local storage service
	 */
	public currentActiveUserId$ = new BehaviorSubject<string>("");

	/**
	 * Current active user first name$ of local storage service
	 */
	public currentActiveUserFirstName$ = new BehaviorSubject<string>("");

	/**
	 * Current active user last name$ of local storage service
	 */
	public currentActiveUserLastName$ = new BehaviorSubject<string>("");

	/**
	 * Current active user token$ of local storage service
	 */
	public currentActiveUserToken$ = new BehaviorSubject<string>("");

	/**
	 * Intro status$ of local storage service
	 */
	public introStatus$ = new BehaviorSubject<string>("");

	path = { path: environment.domain };
	
	/**
	 * Creates an instance of local storage service.
	 * @param encryptionService 
	 */
	constructor(
		private encryptionService: EncryptionService,
		private cookieService:CookieService
	) {

	}

	/**
	 * Gets token
	 * @returns  
	 */
	getToken() {
		return this.cookieService.get(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`);
	}

	/**
	 * Gets active user id
	 * @returns active user id 
	 */
	getActiveUserId()
	{
		return this.cookieService.get(`${LocalStoreKey.LOGGED_IN_USER_ID}`);
	}

	/**
	 * Gets active user first name
	 * @returns active user first name 
	 */
	getActiveUserFirstName(): Observable<string> {
		this.currentActiveUserFirstName$ = new BehaviorSubject<string>(
			this.cookieService.get(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`)
		);
		return this.currentActiveUserFirstName$.asObservable();
	}

	/**
	 * Gets active user last name
	 * @returns active user last name 
	 */
	getActiveUserLastName(): Observable<string> {
		this.currentActiveUserLastName$ = new BehaviorSubject<string>(
			this.cookieService.get(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`)
		);
		return this.currentActiveUserLastName$.asObservable();
	}

	/**
	 * Gets active user email
	 * @returns active user email 
	 */
	getActiveUserEmail(): Observable<string> {
		this.currentActiveUserEmail$ = new BehaviorSubject<string>(
			this.cookieService.get(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`)
		);
		return this.currentActiveUserEmail$.asObservable();
	}

	/**
	 * Gets active user name
	 * @returns active user name 
	 */
	getActiveUserName(): Observable<string>
	{
		const firstName = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME);
		const lastName = this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_LAST_NAME);
		const firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
		const lastNameCapitalized = lastName.charAt(0).toUpperCase() + lastName.slice(1);

		var fullName = firstNameCapitalized + " " + lastNameCapitalized;

		this.currentActiveUserName$ = new BehaviorSubject<string>(fullName);
		return this.currentActiveUserName$.asObservable();
	}

	/**
	 * Gets active user
	 * @returns active user 
	 */
	getActiveUser(): Observable<UserModel> {
		this.currentActiveUser$ = new BehaviorSubject<UserModel>({
			userId: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_ID),
			userFirstName: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME),
			userLastName: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_LAST_NAME),
			userEmail: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_EMAIL),
			userSkills: this.cookieService.get(LocalStoreKey.LOGGED_IN_USER_SKILLS)
		});

		return this.currentActiveUser$.asObservable();
	}

	/**
	 * Sets active user
	 * @param userModel 
	 * @returns active user 
	 */
	setActiveUser(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);
		
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_TYPE, userModel.userType, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_ID, userModel.userId, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME, userModel.userFirstName, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_LAST_NAME, userModel.userLastName, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_EMAIL, userModel.userEmail, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_SKILLS, userModel.userSkills, this.path);
		
		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Updates active user details
	 * @param userModel 
	 * @returns active user details 
	 */
	updateActiveUserDetails(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME, userModel.userFirstName, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_LAST_NAME, userModel.userLastName, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_EMAIL, userModel.userEmail, this.path);
		this.cookieService.set(LocalStoreKey.LOGGED_IN_USER_SKILLS, userModel.userSkills, this.path);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Updates active user token
	 * @param userModel 
	 * @returns active user token 
	 */
	updateActiveUserToken(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		this.cookieService.set(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`, userModel.token, this.path);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Sets sign up user details
	 * @param userModel 
	 * @returns sign up user details 
	 */
	setSignUpUserDetails(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		this.cookieService.set(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`, userModel.userFirstName, this.path);
		this.cookieService.set(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`, userModel.userLastName, this.path);
		this.cookieService.set(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`, userModel.userEmail, this.path);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Removes active user
	 * @returns active user 
	 */
	removeActiveUser(): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		//this.cookieService.deleteAll(environment.domain);
		this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_ID, environment.domain);
		this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME, environment.domain);
		this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_LAST_NAME, environment.domain);
		this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_EMAIL, environment.domain);
		this.cookieService.delete(LocalStoreKey.LOGGED_IN_USER_SKILLS, environment.domain);
		this.cookieService.delete(LocalStoreKey.LOGGED_IN_SESSION_ID, environment.domain);  

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Ends intro
	 * @returns intro 
	 */
	endIntro(): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		this.cookieService.set(`${LocalStoreKey.SKIP_INTRO}`, 'done');

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Gets intro status
	 * @returns intro status 
	 */
	getIntroStatus(): Observable<string> {
		this.introStatus$ = new BehaviorSubject<string>(
			this.cookieService.get(`${LocalStoreKey.SKIP_INTRO}`)
		);
		return this.introStatus$.asObservable();
	}
}
