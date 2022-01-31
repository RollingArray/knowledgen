/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@rockwellcollins.com
 * @create date 2021-12-11 12:02:58
 * @modify date 2021-12-11 12:02:58
 * @desc Knowledge base article component module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { KnowledgeBaseArticleComponent } from './knowledge-base-article.component';
import { KnowledgeBaseArticleContentElementModule } from '../knowledge-base-article-content-element/knowledge-base-article-content-element.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		FormsModule,
		TranslateModule,
		KnowledgeBaseArticleContentElementModule
		//MessageModule
	],

	declarations: [KnowledgeBaseArticleComponent],
	exports: [KnowledgeBaseArticleComponent],
	entryComponents: [KnowledgeBaseArticleComponent],
})
export class KnowledgeBaseArticleModule { }
