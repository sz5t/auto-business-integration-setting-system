import {
  AfterContentInit,
  AfterViewInit,
  Component, ElementRef, Input, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {IDynamicBlock, IDynamicBlockModel} from '../dynamic-block.model';
import {CommonUtility} from '../../../../framework/utility/common-utility';
import {DynamicBlockBase} from '../dynamic-block.base';
import {CnContextmenuComponent} from "../cn-contextmenu/cn-contextmenu.component";
declare let $: any;
@Component({
  selector: 'cn-dynamic-block-portlet',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-block-portlet.component.html',
  styleUrls: ['./dynamic-block-portlet.component.css']
})
export class CnDynamicBlockPortletComponent extends DynamicBlockBase implements OnInit, IDynamicBlock, AfterViewInit, AfterContentInit {
  dynamicBlockField: IDynamicBlockModel;
  @Input() templateConfig;
  @ViewChild('portlet') portlet: ElementRef;
  @ViewChild(CnContextmenuComponent) contextMenu: CnContextmenuComponent;
  _menulist =  [
    {id: 'AddTree', icon: 'icon-user', title: '新增树'},
    {id: 'AddTable', icon: 'icon-user', title: '新表格'},
    {id: 'AddTabs', icon: 'icon-user', title: '新Tab'},
    {id: 'Clear', icon: 'icon-user', title: '清空'}
  ];
  _GUID = CommonUtility.uuID(6);

  constructor() {
    super();
  }

  ngOnInit() {
    // init portlet content properties
    this.initBlockField();
  }

  ngAfterViewInit() {
    this.unblockUI('#block_' + this._GUID);
    this.contextMenu.createMenu(this.portlet.nativeElement);

  }

  ngAfterContentInit() {
    this.blockUI({
      target: '#block_' + this._GUID,
      animate: true
    });
  }

  initBlockField() {
    this.dynamicBlockField = {
      title: this.templateConfig.title ? this.templateConfig.title : '',
      titleColor: this.templateConfig.titleColor ? this.templateConfig.titleColor : '',
      titleIcon: this.templateConfig.titleIcon ? this.templateConfig.titleIcon : '',
      isCollapse: this.templateConfig.isCollapse ? this.templateConfig.isCollapse : '',
      isFullScreen: this.templateConfig.isFullScreen ? this.templateConfig.isFullScreen : '',
      actions: this.templateConfig.actions ? this.templateConfig.actions : [],
      note: this.templateConfig.note
    };
  }

}

