import { PageInfoTitleModule } from './../page-info-title/page-info-title.component.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { UserProfileComponent } from './user-profile.component';
import { I18nModule } from 'src/app/shared/module/i18n.module';
@NgModule({
  imports: [CommonModule, SharedModule, IonicModule, PageInfoTitleModule, I18nModule],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
  entryComponents: [UserProfileComponent]
})
export class UserProfileModule {}
