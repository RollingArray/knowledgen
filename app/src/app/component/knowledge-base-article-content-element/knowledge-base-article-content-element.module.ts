/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-12-12 00:57:02
 * @modify date 2021-12-12 00:57:02
 * @desc Knowledge base article content element component module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { KnowledgeBaseArticleContentElementComponent } from './knowledge-base-article-content-element.component';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule
	],

	declarations: [KnowledgeBaseArticleContentElementComponent],
	exports: [KnowledgeBaseArticleContentElementComponent],
	entryComponents: [KnowledgeBaseArticleContentElementComponent],
})
export class KnowledgeBaseArticleContentElementModule { }
