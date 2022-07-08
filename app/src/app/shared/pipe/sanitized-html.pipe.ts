/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sanitized html pipe
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-07-08 12:46:10 
 * Last modified  : 2022-07-08 12:46:10 
 */


import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({
  name: 'sanitizedHtml'
})
export class SanitizedHtmlPipe implements PipeTransform
{
  constructor(private sanitized: DomSanitizer) { }
  transform(value: any): any
  {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@NgModule({
  declarations: [SanitizedHtmlPipe],
  exports: [SanitizedHtmlPipe]
})
export class SanitizedHtmlPipeModule { }
