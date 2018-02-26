import {
  Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation, Output,
  EventEmitter
} from '@angular/core';
import { ICnstPortlet } from '../cnst-portlet';
import { CommonUtility } from '../../framework/utility/common-utility';
declare let $: any;
@Component({
  selector: 'cnst-portlet-tabs,[cnst-portlet-tabs]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-portlet-tabs.component.html',
  styleUrls: ['./cnst-portlet-tabs.component.css']
})

export class CnstPortletTabsComponent implements OnInit, ICnstPortlet, AfterViewInit {

  @Input() config: any;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('tabtitle') tabtitle: ElementRef;
  tabs = [];
  viewCfg: any;
  constructor() { }

  ngOnInit() {
    console.log(this.config);
  }
  ngAfterViewInit() {

  }
  // 选中当前tab页
  checkTab(event?, tab?: any){
    this.tabs.forEach(tabItem => {
      tabItem.active = '';
    });
    const tabIndex = this.tabs.findIndex(item => {
      return item === tab;
    });
    this.tabs[tabIndex].active = 'active in';
  }
  closeTab(event?, tab?: any) {
    const tabIndex = this.tabs.findIndex(item => {
      return item === tab;
    });
    this.tabs.splice(tabIndex, 1);

    if (tab.active === 'active in') {
      if (this.tabs.length - 1 >= 0) {
        if (tabIndex > this.tabs.length - 1) {
          this.tabs[tabIndex - 1].active = 'active in';
        } else {
          this.tabs[tabIndex].active = 'active in';
        }
      }
    }
  }

  addTab(event?) {
    $(this.dialog.nativeElement).modal('show');
    $(this.tabtitle.nativeElement).val('');
  }

  //保存新增的tab标签页
  onClick() {
    $(this.dialog.nativeElement).modal('hide');
    this.tabs.forEach(tabItem => {
      tabItem.active = '';
    });
    const tabObj = {
      id: CommonUtility.uuID(5),
      icon: 'fa fa-user',
      color: 'text-success',
      title: $(this.tabtitle.nativeElement).val(),
      active: 'active in'
    }
    this.tabs.push(
      tabObj
    );
    this.callback.emit(tabObj);
  }

}
