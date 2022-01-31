import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "time12Hr"
})
export class TimePipe implements PipeTransform {
  transform(timeString: string): any
  {
    const hourEnd = timeString.indexOf(":");
    const H = +timeString.substr(0, hourEnd);
    const h = H % 12 || 12;
    const ampm = H < 12 ? " AM" : " PM";
    return  h + timeString.substr(hourEnd, 3) + ampm;
  }
}

@NgModule({
  declarations: [TimePipe],
  exports: [TimePipe]
})
export class TimePipeModule {}
