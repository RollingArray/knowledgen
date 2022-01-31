
/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-16 08:19:11 
 * Last modified  : 2022-01-20 00:23:12
 */



 import { CommonModule } from "@angular/common";
 import { NgModule } from "@angular/core";
 import { Routes, RouterModule } from "@angular/router";
 import { IonicModule } from "@ionic/angular";
 import { CustomFieldsModule } from "src/app/component/custom-fields/custom-fields-fields.component.module";
 import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
 import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
 import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
 import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
 import { ParentMenuModule } from "src/app/component/parent-menu/parent-menu.component.module";
 import { I18nModule } from "src/app/shared/module/i18n.module";
 import { SharedModule } from "src/app/shared/module/shared.module";
 import { CourseMaterialMenuStateModule } from "src/app/state/course-material-menu/course-material-menu.state.module";
 import { RootStateModule } from "src/app/state/root/root.state.module";
import { CourseMaterialArticlePage } from "./course-material-article.page";
 
 const routes: Routes = [
   {
     path: "",
     component: CourseMaterialArticlePage,
   }
 ];
 
 @NgModule({
   imports: [
     CommonModule,
     IonicModule,
     SharedModule,
     NoDataModule,
     PageInfoTitleModule,
     PanelHeaderModule,
     PanelInfoModule,
     CustomFieldsModule,
     I18nModule,
     CourseMaterialMenuStateModule,
     RootStateModule,
     ParentMenuModule,
     RouterModule.forChild(routes)
   ],
   declarations: [CourseMaterialArticlePage],
   providers: [
 
   ]
 })
 export class CourseMaterialArticlePageModule { }
 