/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Api urls
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:34:14 
 * Last modified  : 2022-01-19 21:03:59
 */

import { environment } from "../../../environments/environment";

export class ApiUrls {
	public static readonly API_ENDPOINT: string = environment.apiEndpoint;
	public static readonly API_VERSION: string = "v1";
	public static readonly API_BASE_PATH: string = ApiUrls.API_ENDPOINT + ApiUrls.API_VERSION;

	// urls
	public static readonly SIGN_IN: string = ApiUrls.API_BASE_PATH + "/user/sign/in";
	public static readonly SIGN_UP: string = ApiUrls.API_BASE_PATH + "/user/sign/up";
	public static readonly USER_ACTIVATE: string = ApiUrls.API_BASE_PATH + "/user/activate";
	public static readonly USER_ACTIVATE_CODE_RESEND: string = ApiUrls.API_BASE_PATH + "/user/activate/code/resend";
	
	public static readonly USER_DETAILS: string = ApiUrls.API_BASE_PATH + "/user/details";
	public static readonly USER_PROFILE_UPDATE: string = ApiUrls.API_BASE_PATH + "/user/profile/update";

	public static readonly COURSE_MATERIAL: string = ApiUrls.API_BASE_PATH + "/course/material/all";
	public static readonly COURSE_MATERIAL_ADD: string = ApiUrls.API_BASE_PATH + "/course/material/add";
	public static readonly COURSE_MATERIAL_EDIT: string = ApiUrls.API_BASE_PATH + "/course/material/edit";
	public static readonly COURSE_MATERIAL_DELETE: string = ApiUrls.API_BASE_PATH + "/course/material/delete";

	public static readonly COURSE_MATERIAL_MENU: string = ApiUrls.API_BASE_PATH + "/course/material/menu/all";

	public static readonly COURSE_MATERIAL_MENU_ADD: string = ApiUrls.API_BASE_PATH + "/course/material/menu/add";
	public static readonly COURSE_MATERIAL_CHILD_MENU_ADD: string = ApiUrls.API_BASE_PATH + "/course/material/menu/child/add";
	public static readonly COURSE_MATERIAL_SUB_CHILD_MENU_ADD: string = ApiUrls.API_BASE_PATH + "/course/material/menu/child/sub/add";

}
