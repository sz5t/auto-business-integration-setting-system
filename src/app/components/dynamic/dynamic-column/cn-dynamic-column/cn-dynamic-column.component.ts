import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ICnDynamicColumn, ICnDynamicColumnField, IValueOffset} from '../cn-dynamic-column.model';
import {MasterTemplateComponent} from '../../../../application/master-template/master-template.component';
import {IDynamicBlock} from '../../dynamic-block/dynamic-block.model';
const colClsType: { [type: string]: IValueOffset } = {
  md: {value: 'col-md-', offset: 'col-md-offset-'},
  sm: {value: 'col-sm-', offset: 'col-sm-offset-'},
  lg: {value: 'col-lg-', offset: 'col-lg-offset-'},
  xs: {value: 'col-xs-', offset: 'col-xs-offset-'}
};
@Component({
  selector: 'cn-dynamic-column',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-dynamic-column.component.html',
  styleUrls: ['./cn-dynamic-column.component.css']
})
export class CnDynamicColumnComponent implements OnInit, ICnDynamicColumn {
  @Input() templateConfig;
  dynamicColumnField;
  colCls = '';

  constructor() {
  }

  ngOnInit() {
    this.dynamicColumnField = this.templateConfig.size;
    this.buildColumnsLayout();
  }

  buildColumnsLayout() {
    const keyNames = Object.getOwnPropertyNames(this.dynamicColumnField);
    keyNames.forEach(name => {
      const size = this.dynamicColumnField[name];
      if (size.value && size.value.length > 0) {
        this.colCls += colClsType[name].value;
        this.colCls += this.dynamicColumnField[name].value;
        this.colCls += ' ';
      }
      if (size.offset && size.offset.length > 0) {
        this.colCls += colClsType[name].offset;
        this.colCls += this.dynamicColumnField[name].offset;
        this.colCls += ' ';
      }
    });
  }
}
