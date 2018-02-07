import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[cn-clear], cn-clear',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['./cn-clear-fix.component.css']
})
export class CnClearFixComponent {
  @HostBinding('class.clearfix') hasClearFix = true;
}
