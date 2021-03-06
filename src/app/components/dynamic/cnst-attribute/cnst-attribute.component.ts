import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../form/form-models/IFieldConfig';
import { CnstDynamicFormComponent } from "../../cnst-form/cnst-dynamic-form.component";
import { CnstCodemirrorComponent } from "../cnst-codemirror/cnst-codemirror.component";
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'cnst-attribute,[cnst-attribute]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-attribute.component.html',
  styleUrls: ['./cnst-attribute.component.css']
})
export class CnstAttributeComponent implements OnInit {

  @Input() _attributeData;
  @Input() _attribute;
  _componentDic: any;

  @ViewChild(CnstDynamicFormComponent)
  form: CnstDynamicFormComponent;
  constructor() { }
  _formConfigs = [];
  _formConfigsTitle = {
    header: [
      { title: '属性名称', width: '80px' },
      { title: '属性值', width: 'auto' },
      { title: '说明', width: 'auto' }
    ],
    deletebutton: {
      show: false
    }
  };
  ngOnInit() {
  }
  ngAfterViewInit(): void {

  }
  ngOnChanges() {

    this._formConfigs = [];
    if (this._attribute) {
      for (var key in this._attribute.attribute) {
        const item = [];
        if (this._attribute.attribute[key].IsShow) {
          for (var keys in this._attribute.attribute[key]) {
            if (keys == 'text') {
              item.push({ 'type': 'label', 'label': this._attribute.attribute[key][keys] });
            }
            if (keys == 'form') {
              item.push(this._attribute.attribute[key][keys]);
            }
            if (keys == 'remark') {
              item.push({ 'type': 'label', 'label': this._attribute.attribute[key][keys] });
            }
          }
        }

        this._formConfigs.push(item);
      }
    }


  }
  //点击树将切换属性
  setComponentDic(data?, saveJson?) {
    this._formConfigs = [];
    for (var key in data.attribute) {
      const item = [];
      if (data.attribute[key].IsShow) {
        for (var keys in data.attribute[key]) {
          if (keys == 'text') {
            item.push({ 'type': 'label', 'label': data.attribute[key][keys] });
          }
          if (keys == 'form') {
            item.push(data.attribute[key][keys]);
          }
          if (keys == 'remark') {
            item.push({ 'type': 'label', 'label': data.attribute[key][keys] });
          }
        }
      }

      this._formConfigs.push(item);
    }
    console.log(data);
  };

}
