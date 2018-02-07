import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IDynamicBlock, IDynamicBlockModel} from '../dynamic-block.model';

@Component({
  selector: 'cn-dynamic-block-portlet-tabs',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-block-portlet-tabs.component.html',
  styleUrls: ['./dynamic-block-portlet-tabs.component.css']
})
export class CnDynamicBlockPortletTabsComponent implements OnInit, IDynamicBlock {
  dynamicBlockField: IDynamicBlockModel;
  @Input() templateConfig: any;
  tabbars: any[] = [];
  viewCfgs: any[] = [];
  constructor() {
  }

  ngOnInit() {
    this.initBlockField();
    this.initTabs();
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

  initTabs() {
    if (this.templateConfig
      && this.templateConfig.tabs
      && Array.isArray(this.templateConfig.tabs)) {
      this.templateConfig.tabs.forEach(config => {
        this.tabbars.push({
          id: config.id,
          icon: config.icon ? config.icon : '',
          title: config.title ? config.title : '',
          color: config.color ? config.color : '',
          active: config.active ? config.active : false
        });
        if (config.viewCfg) {
          const cfgObj = {id: config.id, active: config.active, viewCfg: config.viewCfg};
          this.viewCfgs.push(cfgObj);
        }
      });
    }
  }
}
