import { Component, OnInit, Input, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: '[cn-header],cn-header',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="page-header-inner ">
      <div class="page-logo">
        <a href="index.html">
          <img src="../assets/layouts/layout/img/logo.png" alt="logo" class="logo-default" /> </a>
        <div class="menu-toggler sidebar-toggler">
          <span></span>
        </div>
      </div>

      <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
        <span></span>
      </a>
      <ng-content></ng-content>
    </div>`,
  styleUrls: ['./cn-header.component.css']
})
export class CnHeaderComponent implements OnInit {
  @HostBinding('class.page-header') hasHeader = true;
  @HostBinding('class.navbar') hasNavbar = true;
  @HostBinding('class.navbar-fixed-top') hasDefautBar = true;
  @Input() title: string;
  @Input() imgPath: string;
  constructor() { }

  ngOnInit() {
  }

}
