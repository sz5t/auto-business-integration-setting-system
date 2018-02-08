import {
  Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy, Type
} from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CnstPortletGridviewComponent } from '../cnst-portlet-gridview/cnst-portlet-gridview.component';
import { CnstPortletTreeComponent } from '../cnst-portlet-tree/cnst-portlet-tree.component';
import { CnstPortletContextmenuComponent } from '../cnst-portlet-contextmenu/cnst-portlet-contextmenu.component';
import { CnstPortletTabsComponent } from '../cnst-portlet-tabs/cnst-portlet-tabs.component';

import { ICnstPortlet } from '../cnst-portlet';
const components: { [type: string]: Type<ICnstPortlet> } = {
  gridview: CnstPortletGridviewComponent,
  treeview: CnstPortletTreeComponent,
  tabsview: CnstPortletTabsComponent
};
@Component({
  selector: 'cnst-portlet,[cnst-portlet]',
  templateUrl: './cnst-portlet.component.html',
  styleUrls: ['./cnst-portlet.component.css']
})
export class CnstPortletComponent implements OnInit, AfterViewInit, ICnstPortlet {
  config;
  componentRef: ComponentRef<ICnstPortlet>;
  @ViewChild("dynamicComponent", { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild(CnstPortletContextmenuComponent) menu: CnstPortletContextmenuComponent;
  @ViewChild('portlet') portlet: ElementRef;
  //右键弹出菜单
  menuList = [
    { id: 'treeview', icon: 'icon-user', title: '新增树' },
    { id: 'gridview', icon: 'icon-user', title: '新表格' },
    { id: 'tabsview', icon: 'icon-user', title: '新Tab' },
    { id: 'Clear', icon: 'icon-user', title: '清空' }
  ];
  portletJson = {
    "id": "001",
    //"title": "用户列表",
    "titleColor": "font-green",
    "titleIcon": "fa fa-cogs",
    "isFullScreen": true,
    "isCollapse": true,
    "blockType": "portlet",
    "size": {
      "xs": {
        "value": "12",
        "offset": ""
      },
      "sm": {
        "value": "12",
        "offset": ""
      },
      "md": {
        "value": "12",
        "offset": ""
      },
      "lg": {
        "value": "12",
        "offset": ""
      }
    }
  };
  //布局json信息

  constructor(private resolver: ComponentFactoryResolver) { 

   // if (this.config==undefined ||this.config=='undefined' ||this.config==null )
   if (this.config)
    this.portletJson=this.config;
   

  }

  createComponent(data?) {
    if (data.name) {
      if (data.name === 'Clear') {
        if (this.componentRef) {
          this.componentRef.destroy()
        }
      }
      else {
        this.container.clear();
        const factory: ComponentFactory<ICnstPortlet> =
          this.resolver.resolveComponentFactory(components[data.name]);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.config = data.value;
      }
    }

    // this.componentRef.instance.type = type;
    //  this.componentRef.instance.output.subscribe((msg: string) => console.log(msg));
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy()
    }

  }
  ngOnInit() {
    // console.log('init',this.portlet);
  }
  ngAfterViewInit() {
    this.menu.createMenu(this.portlet.nativeElement);

  }
}
