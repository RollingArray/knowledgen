/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Menu page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 20:47:46 
 * Last modified  : 2022-08-11 13:54:25
 */

import { UserProfileModule } from './../../component/user-profile/user-profile.component.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { LearnMoreModule } from 'src/app/component/learn-more/learn-more.module';
import { I18nModule } from 'src/app/shared/module/i18n.module';
import { SelectLanguageModule } from 'src/app/component/select-language/select-language.component.module';
import { RootStateModule } from 'src/app/state/root/root.state.module';

const routes: Routes = [
	{
		path: "",
		component: MenuPage,
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
			},
			{
				path: 'course/material',
				loadChildren: () => import('../course-material/course-material.module').then(m => m.CourseMaterialPageModule)
			},
			{
				path: 'availability/planner',
				loadChildren: () => import('../availability-planner/availability-planner.module').then(m => m.AvailabilityPlannerPageModule)
			},
			{
				path: 'learning/path',
				loadChildren: () => import('../learning-path/learning-path.module').then(m => m.LearningPathPageModule)
			},
		]
	},
	
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		UserProfileModule,
		NoDataModule,
		LearnMoreModule,
		I18nModule,
		SelectLanguageModule,
		RootStateModule,
		RouterModule.forChild(routes)
	],
	declarations: [MenuPage]
})
export class MenuPageModule { }
