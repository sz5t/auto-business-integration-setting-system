import {Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input} from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {CnContextmenuComponent} from '../cn-contextmenu/cn-contextmenu.component';
@Component({
  selector: 'cn-portlet,[cn-portlet]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-portlet.component.html',
  styleUrls: ['./cn-portlet.component.css']
})
export class CnPortletComponent implements OnInit, AfterViewInit {
  @ViewChild(CnContextmenuComponent) menu: CnContextmenuComponent;
  @ViewChild('portlet') portlet: ElementRef;
  portletRef;
  @Input() portletJson;

  constructor() {
    if(!this.portletJson){
      this.portletJson = [{
        portletkey: 'portletkey01',
        cliclass: 'col-md-6',
        portlet: {
          portletclass: 'portlet light bordered',
          portlettitle: {//标题
            iconclass: 'icon-speech', //小图标
            captiontitle: '标题一'//,//标题文字
            //captionhelper: "" //小标题
          },
          portletbody: {//布局里的组件内容
            appendcomponent: ''
          }

        },
        menuList: [
          {id: 'AddTree', icon: 'icon-user', title: '新增树'},
          {id: 'AddTable', icon: 'icon-user', title: '新表格'},
          {id: 'AddTabs', icon: 'icon-user', title: '新Tab'},
          {id: 'Clear', icon: 'icon-user', title: '清空'}
        ]
      }];
    }
  }

  ngOnInit() {
   // console.log('init',this.portlet);
  }

  ngAfterViewInit(){
    this.menu.createMenu(this.portlet.nativeElement);
  }

}
