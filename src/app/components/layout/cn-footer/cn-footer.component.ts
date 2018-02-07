import { Component, Input, ViewEncapsulation, HostBinding} from '@angular/core';

@Component({
  selector: '[cn-footer],cn-footer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-footer.component.html',
  styleUrls: ['./cn-footer.component.css']
})
export class CnFooterComponent {
  @HostBinding('class.page-footer') hasPageFooter = true;
  @Input() copyright: string;
  @Input() siteName: string;
  @Input() fullSite: string;
}
