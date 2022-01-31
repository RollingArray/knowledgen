import { PlatformHelper } from '../helper/platform.helper';
import { ScrollTrackerDirective } from './../directive/parallax/scroll-tracker.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from './i18n.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule
  ],
  declarations:[
    ScrollTrackerDirective,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollTrackerDirective,
  ],
  providers:[
    PlatformHelper
  ]
})
export class SharedModule {}
