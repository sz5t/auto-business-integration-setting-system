import {Component, OnInit, ViewEncapsulation, HostBinding, ElementRef, Renderer2, Input} from '@angular/core';
import {ClientStorageService} from '../../../services/client-storage.service';
import {AppUser} from '../../../login/cn-login/online-user.model';
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
  @Input() appUser: any;
  constructor(private _elementRef: ElementRef) {

    this._el = _elementRef.nativeElement;

  }
  ngOnInit() {

  }

}
