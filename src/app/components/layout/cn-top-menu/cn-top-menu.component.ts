import {Component, OnInit, ViewEncapsulation, HostBinding, ElementRef, Renderer2} from '@angular/core';
@Component({
  selector: 'cn-top-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-top-menu.component.html',
  styleUrls: ['./cn-top-menu.component.css']
})
export class CnTopMenuComponent implements OnInit {
  @HostBinding('class.component') _component = true;
  @HostBinding('class.top-menu') hasTopMenu = true;
  _el: HTMLElement;

  constructor(private _elementRef: ElementRef) {
    this._el = _elementRef.nativeElement;
  }
  ngOnInit() {

  }

}
