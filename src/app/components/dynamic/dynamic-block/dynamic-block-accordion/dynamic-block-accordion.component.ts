import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IDynamicBlock, IDynamicBlockModel} from '../dynamic-block.model';

@Component({
  selector: 'cn-dynamic-block-accordion',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-block-accordion.component.html',
  styleUrls: ['./dynamic-block-accordion.component.css']
})
export class CnDynamicBlockAccordionComponent implements OnInit, IDynamicBlock {
  dynamicBlockField: IDynamicBlockModel;
  templateConfig: any;

  constructor() {
  }

  ngOnInit() {
    this.initBlockField();
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

  /*initTabs() {
   if (this.templateConfig
   && this.templateConfig.accordion
   && Array.isArray(this.templateConfig.accordion)) {
   this.templateConfig.accordion.forEach(config => {
   this.tabbars.push({
   id: config.id,
   icon: config.icon ? config.icon : '',
   title: config.title ? config.title : '',
   color: config.color ? config.color : '',
   active: config.active ? config.active : false
   });
   if(config.viewCfg) {
   const cfgObj = {id: config.id, active: config.active, viewCfg: config.viewCfg};
   this.viewCfgs.push(cfgObj);
   }
   });
   }
   }*/
}
