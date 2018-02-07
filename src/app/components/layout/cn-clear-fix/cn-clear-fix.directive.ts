import {HostBinding, Directive} from '@angular/core';

@Directive({
  selector: '[cnClearFixed]',
})
export class CnClearFixDirective {
  @HostBinding('class.clearfix') hasClearFix = true;
}
