import {Component, OnInit, Input, Renderer2, ElementRef, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[cn-top-dropdown],cn-top-dropdown',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-top-dropdown.component.html',
  styleUrls: ['./cn-top-dropdown.component.css']
})
export class CnTopDropdownComponent implements OnInit {
  _dropdownType: string;
  _el: HTMLElement;
  CnDropdownType = {
    notification: ['dropdown', 'dropdown-extended', 'dropdown-notification'],
    inbox: ['dropdown', 'dropdown-extended', 'dropdown-inbox'],
    tasks: ['dropdown', 'dropdown-extended', 'dropdown-tasks'],
    user: ['dropdown', 'dropdown-user'],
    quick:['dropdown', 'dropdown-quick-sidebar-toggler']
  };

  @Input() cnDropdownPhoto: string;
  @Input() cnDropdownUserName: string;
  @Input() cnNotificationNum: string;
  @Input() cnNotificationState: string;
  @Input() cnNotificationPath: string;
  @Input() cnDropdownName: string;
  @Input() cnDropdownImg: string;
  @Input()
  get cnDropdownType(){
    return this._dropdownType;
  }
  set cnDropdownType(value){
    this._dropdownType = value;
  }
  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = _elementRef.nativeElement;
  }

  ngOnInit() {
    this.addClass();
  }
  addClass() {
    this.CnDropdownType[this._dropdownType].forEach(
      x => this._renderer.addClass(this._el, x)
    )
  }
}
