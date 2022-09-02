/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Api urls
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:34:14 
 * Last modified  : 2022-09-02 20:44:15
 */

import { environment } from "../../../environments/environment";

export class ApiUrls
{
	public static readonly ROOT_APP_URL_AFTER_AUTH: string = '/go/dashboard';
	public static readonly API_ENDPOINT: string = environment.apiEndpoint;
	public static readonly API_VERSION: string = "v1";
	public static readonly API_BASE_PATH: string = ApiUrls.API_ENDPOINT + ApiUrls.API_VERSION;
	public static readonly RA: string = 'https://rollingarray.co.in/';
	public static readonly FILE: string = ApiUrls.API_ENDPOINT + "file/";
	// urls
	public static readonly SIGN_IN: string = ApiUrls.API_BASE_PATH + "/user/sign/in";
	public static readonly SIGN_UP: string = ApiUrls.API_BASE_PATH + "/user/sign/up";
	public static readonly USER_ACTIVATE: string = ApiUrls.API_BASE_PATH + "/user/activate";
	public static readonly USER_ACTIVATE_CODE_RESEND: string = ApiUrls.API_BASE_PATH + "/user/activate/code/resend";

	public static readonly USER_DETAILS: string = ApiUrls.API_BASE_PATH + "/user/details";
	public static readonly USER_PROFILE_UPDATE: string = ApiUrls.API_BASE_PATH + "/user/edit";

	public static readonly DASHBOARD_BASE: string = ApiUrls.API_BASE_PATH + "/dashboard";
	public static readonly DASHBOARD_STUDENT: string = ApiUrls.DASHBOARD_BASE + "/student";
	public static readonly DASHBOARD_TEACHER: string = ApiUrls.DASHBOARD_BASE + "/teacher";

	public static readonly COURSE_MATERIAL_BASE: string = ApiUrls.API_BASE_PATH + "/course/material";
	public static readonly COURSE_MATERIAL: string = ApiUrls.COURSE_MATERIAL_BASE + "/all";
	public static readonly RECOMMENDED_COURSE_MATERIAL: string = ApiUrls.COURSE_MATERIAL_BASE + "/recommended/all";
	public static readonly COURSE_MATERIAL_ADD: string = ApiUrls.COURSE_MATERIAL_BASE + "/add";
	public static readonly COURSE_MATERIAL_EDIT: string = ApiUrls.COURSE_MATERIAL_BASE + "/edit";
	public static readonly COURSE_MATERIAL_DELETE: string = ApiUrls.COURSE_MATERIAL_BASE + "/delete";

	public static readonly COURSE_MATERIAL_MENU_BASE: string = ApiUrls.COURSE_MATERIAL_BASE + "/menu";
	public static readonly COURSE_MATERIAL_MENU: string = ApiUrls.COURSE_MATERIAL_MENU_BASE + "/all";

	public static readonly COURSE_MATERIAL_PARENT_MENU_ADD: string = ApiUrls.COURSE_MATERIAL_MENU_BASE + "/add";
	public static readonly COURSE_MATERIAL_PARENT_MENU_EDIT: string = ApiUrls.COURSE_MATERIAL_MENU_BASE + "/edit";
	public static readonly COURSE_MATERIAL_PARENT_MENU_DELETE: string = ApiUrls.COURSE_MATERIAL_MENU_BASE + "/delete";

	public static readonly COURSE_MATERIAL_CHILD_MENU_BASE: string = ApiUrls.COURSE_MATERIAL_MENU_BASE + "/child";
	public static readonly COURSE_MATERIAL_CHILD_MENU_ADD: string = ApiUrls.COURSE_MATERIAL_CHILD_MENU_BASE + "/add";
	public static readonly COURSE_MATERIAL_CHILD_MENU_EDIT: string = ApiUrls.COURSE_MATERIAL_CHILD_MENU_BASE + "/edit";
	public static readonly COURSE_MATERIAL_CHILD_MENU_DELETE: string = ApiUrls.COURSE_MATERIAL_CHILD_MENU_BASE + "/delete";

	public static readonly COURSE_MATERIAL_SUB_CHILD_MENU_BASE: string = ApiUrls.COURSE_MATERIAL_CHILD_MENU_BASE + "/sub";
	public static readonly COURSE_MATERIAL_SUB_CHILD_MENU_ADD: string = ApiUrls.COURSE_MATERIAL_SUB_CHILD_MENU_BASE + "/add";
	public static readonly COURSE_MATERIAL_SUB_CHILD_MENU_EDIT: string = ApiUrls.COURSE_MATERIAL_SUB_CHILD_MENU_BASE + "/edit";
	public static readonly COURSE_MATERIAL_SUB_CHILD_MENU_DELETE: string = ApiUrls.COURSE_MATERIAL_SUB_CHILD_MENU_BASE + "/delete";

	public static readonly TEACHER_AVAILABILITY_PLANNER_BASE: string = ApiUrls.API_BASE_PATH + "/teacher/availability/planner";
	public static readonly TEACHER_AVAILABILITY_PLANNER: string = ApiUrls.TEACHER_AVAILABILITY_PLANNER_BASE + "/all";
	public static readonly TEACHER_AVAILABILITY_PLANNER_ADD: string = ApiUrls.TEACHER_AVAILABILITY_PLANNER + "/add";
	public static readonly TEACHER_AVAILABILITY_PLANNER_EDIT: string = ApiUrls.TEACHER_AVAILABILITY_PLANNER + "/edit";
	public static readonly TEACHER_AVAILABILITY_PLANNER_DELETE: string = ApiUrls.TEACHER_AVAILABILITY_PLANNER + "/delete";

	public static readonly STUDENT_AVAILABILITY_PLANNER_BASE: string = ApiUrls.API_BASE_PATH + "/student/availability/planner";
	public static readonly STUDENT_AVAILABILITY_PLANNER: string = ApiUrls.STUDENT_AVAILABILITY_PLANNER_BASE + "/all";
	public static readonly STUDENT_AVAILABILITY_PLANNER_ADD: string = ApiUrls.STUDENT_AVAILABILITY_PLANNER_BASE + "/add";
	public static readonly STUDENT_AVAILABILITY_PLANNER_EDIT: string = ApiUrls.STUDENT_AVAILABILITY_PLANNER_BASE + "/edit";
	public static readonly STUDENT_AVAILABILITY_PLANNER_DELETE: string = ApiUrls.STUDENT_AVAILABILITY_PLANNER_BASE + "/delete";

	public static readonly COURSE_MATERIAL_ARTICLE_BASE: string = ApiUrls.API_BASE_PATH + "/course/material/article";
	public static readonly COURSE_MATERIAL_ARTICLE_EDIT: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/edit";

	public static readonly COURSE_MATERIAL_TEXT_DOC: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/textdocument";
	public static readonly KNOWLEDGE_BASE_ARTICLE_UPLOAD_FILE: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/upload/file";
	public static readonly KNOWLEDGE_BASE_ARTICLE_TEXT_DOCUMENT: string = ApiUrls.COURSE_MATERIAL_TEXT_DOC + "/all";
	public static readonly KNOWLEDGE_BASE_ARTICLE_TEXT_DOCUMENT_ADD: string = ApiUrls.COURSE_MATERIAL_TEXT_DOC + "/add";
	public static readonly KNOWLEDGE_BASE_ARTICLE_TEXT_DOCUMENT_EDIT: string = ApiUrls.COURSE_MATERIAL_TEXT_DOC + "/edit";

	public static readonly COURSE_MATERIAL_QUIZ_BASE: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/quiz";
	public static readonly COURSE_MATERIAL_QUIZ: string = ApiUrls.COURSE_MATERIAL_QUIZ_BASE + "/all";
	public static readonly COURSE_MATERIAL_QUIZ_ADD: string = ApiUrls.COURSE_MATERIAL_QUIZ_BASE + "/add";
	public static readonly COURSE_MATERIAL_QUIZ_EDIT: string = ApiUrls.COURSE_MATERIAL_QUIZ_BASE + "/edit";
	public static readonly COURSE_MATERIAL_QUIZ_DELETE: string = ApiUrls.COURSE_MATERIAL_QUIZ_BASE + "/delete";

	public static readonly COURSE_MATERIAL_ASSIGNMENT_BASE: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/assignment";
	public static readonly COURSE_MATERIAL_ASSIGNMENT_RESULT: string = ApiUrls.COURSE_MATERIAL_ASSIGNMENT_BASE + "/result";

	public static readonly COURSE_MATERIAL_SESSION_TIME_BASE: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/session/time";
	public static readonly COURSE_MATERIAL_SESSION_TIME_ALL: string = ApiUrls.COURSE_MATERIAL_SESSION_TIME_BASE + "/all";
	public static readonly COURSE_MATERIAL_SESSION_TIME_ADD: string = ApiUrls.COURSE_MATERIAL_SESSION_TIME_BASE + "/add";

	public static readonly LEARNING_PATH_BASE: string = ApiUrls.COURSE_MATERIAL_BASE + "/learning/path";
	public static readonly LEARNING_PATH: string = ApiUrls.LEARNING_PATH_BASE + "/all";
	public static readonly LEARNING_PATH_ADD: string = ApiUrls.LEARNING_PATH_BASE + "/add";
	public static readonly LEARNING_PATH_DELETE: string = ApiUrls.LEARNING_PATH_BASE + "/delete";

	public static readonly COURSE_MATERIAL_FLASH_CARD_BASE: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/flash/card";
	public static readonly COURSE_MATERIAL_FLASH_CARD: string = ApiUrls.COURSE_MATERIAL_FLASH_CARD_BASE + "/all";
	public static readonly COURSE_MATERIAL_FLASH_CARD_ADD: string = ApiUrls.COURSE_MATERIAL_FLASH_CARD_BASE + "/add";
	public static readonly COURSE_MATERIAL_FLASH_CARD_EDIT: string = ApiUrls.COURSE_MATERIAL_FLASH_CARD_BASE + "/edit";
	public static readonly COURSE_MATERIAL_FLASH_CARD_DELETE: string = ApiUrls.COURSE_MATERIAL_FLASH_CARD_BASE + "/delete";

	public static readonly COURSE_MATERIAL_REVISION_BASE: string = ApiUrls.COURSE_MATERIAL_ARTICLE_BASE + "/revision";
	public static readonly COURSE_MATERIAL_REVISION_ADD: string = ApiUrls.COURSE_MATERIAL_REVISION_BASE + "/add";
	public static readonly COURSE_MATERIAL_REVISION: string = ApiUrls.COURSE_MATERIAL_REVISION_BASE + "/all";
}