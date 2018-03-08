import {
  AfterViewInit,
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../form/form-models/IFieldConfig';
import { CommonUtility } from '../../framework/utility/common-utility';
import { retry } from 'rxjs/operator/retry';
declare let bootbox: any;
declare let $: any;
@Component({
  exportAs: 'cnstDynamicForm',
  selector: 'cnst-dynamic-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-dynamic-form.component.html',
  styleUrls: ['./cnst-dynamic-form.component.css']
})
export class CnstDynamicFormComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('table') table: ElementRef;
  @Input() configs;
  @Input() configsTitle;
  @Input() ConfigsContent;
  @Input() config: IFieldConfig[] = [];
  @Input() submitValid;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  _viewId;
  _formType;
  get controls() {
    const allControls = [];
      this.configs.forEach(config => {
        config.forEach(control => {
          allControls.push(control);
        });
      });
    return allControls.filter(({type}) => {
      return type !== 'button' && type !== 'label';
    });
  }

  get changes() {
    return this.form.valueChanges;
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.createGroup();
  }
  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);

      const configControls = this.controls.map(item => item.name);

      controls
        .filter(control => !configControls.includes(control))
        .forEach(control => this.form.removeControl(control));

      configControls
        .filter(control => !controls.includes(control))
        .forEach(name => {
          const item = this.controls.find(control => control.name === name);
          this.form.addControl(name, this.createControl(item));
        });
    }
  }
  ngAfterViewInit() {


  }

  createGroup() {
    const group = this.formBuilder.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: IFieldConfig) {
    const { disabled, validation, value } = config;
    return this.formBuilder.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
    this.config = this.config.map(item => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValid(name: string, valid: boolean) {
    if (this.form.controls[name]) {
    }
  }
  resetFormValue() {
    this.form.reset();
  }

  setValue(name: string, value: any) {
    const control = this.form.controls[name];
    if (control) {
      control.setValue(value, { emitEvent: true });
    }
  }

  setFormValue(data) {
    if (data){
      for (const d in data){
        if (data.hasOwnProperty(d)){
          this.setValue(d, data[d]);
        }
      }
    }
  }

  getControlValue(name: string) {
    return this.form.controls[name].value;
  }

  delrow(row?: any) {
    bootbox.confirm({
     // title: "确认",
      message: '确定要删除?',
      buttons: {
        confirm: {
          label: '确定'
        },
        cancel: {
          label: '取消'

        }
      },
      callback: (result) => {
        if (result) {
          const tableIndex = this.configs.findIndex(item => {
            return item === row;
          });
          this.configs.splice(tableIndex, 1);

        } else {
          return;
        }

      }
    });
    // bootbox.confirm("确定要删除?", function (o) {
    //   alert(o);
    // });
  }

  getValue(){
    return this.value;
  }


  addRowChanges(columnConfigsData?) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this.ConfigsContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (const key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);

      });
      this.configs = row;
    }
    else {
      this.configs = [];
    }
  }
  addRow() {
    const fieldIdentity = CommonUtility.uuID(5);
    const conent = $.extend(true, [], this.ConfigsContent);
    conent.forEach(Field => {
      Field.name = fieldIdentity + '_' + Field.name;
    });
    this.configs.push(conent);
   // this.configs = $.extend(true, [], this.configs);
    this.ngChangesRow();
  }
  changeRowFormValue(columnConfigsData) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this.ConfigsContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (const key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);

      });
      this.setFormValue(fieldData);
    }
  }
  ngChangesRow() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map(item => item.name);

      controls
        .filter(control => !configControls.includes(control))
        .forEach(control => this.form.removeControl(control));

      configControls
        .filter(control => !controls.includes(control))
        .forEach(name => {
          const item = this.controls.find(control => control.name === name);
          this.form.addControl(name, this.createControl(item));
        });
    }
  }

/**表单赋值 */
  setViewFormValue(viewId?, formValue?){
    this._viewId = viewId;
     if (Array.isArray(formValue)) { // 列表赋值
       this.setRowChanges(formValue);
       this._formType = 'formGroup';
     }else { // 表单赋值
      this.setFormValue(formValue);
      this._formType = 'form';
     }
  }


  selectRow(name) {
    console.log(this.getControlValue(name));
  }

/**赋值生成行 */
  setRowChanges(columnConfigsData?) {
    const row = [];
    if (columnConfigsData.length > 0) {

      const fieldData = {};
      columnConfigsData.forEach(element => {
        const fieldIdentity = CommonUtility.uuID(5);
        const conent = $.extend(true, [], this.ConfigsContent);
        conent.forEach(Field => {
          Field.name = fieldIdentity + '_' + Field.name;
        });
        for (const key in element) {
          const colsname = fieldIdentity + '_' + key;
          fieldData[colsname] = element[key];
        }
        row.push(conent);

      });
      this.configs = row;
      this.ngChangesRow();
      this.setFormValue(fieldData);
    }
    else {
      this.configs = [];
    }
  }


  getValueByViewId(){
    debugger;
    if (this._formType === 'form'){
      return {viewId: this._viewId, data: this.value};
    }
    else if (this._formType === 'formGroup')
    {
      return {viewId: this._viewId, data: this.formatSubmitValue()};
    }
    else{
      return null;
    }

  }

  formatSubmitValue(){
    const formJson = [];
    const formValue = this.value;
    const submitValue = [];
    for (const key in formValue) { //遍历表单提交的数据
      const formRow = {//可以将此结构定义在其他地方，动态加载，就和加载树节点一样
        rowId: '',
        cols: {}
      };
      let isRow = false;
      // 随机标识id_字段名
      const index = key.indexOf('_');
      const formRowId = key.substring(0, index); //行标识
      const formItem = key.substring(index + 1, key.length); //字段标识
      formJson.forEach(row => {
        if (row.rowId == formRowId) {//判断是否存在行
          isRow = true;
          //存在行，添加属性
          row.cols[formItem] = formValue[key];
        }
      });
      if (!isRow) {//不存在行，添加属性
        formRow.rowId = formRowId;
        formRow.cols[formItem] = formValue[key];
        formJson.push(formRow);
      }

    }

    formJson.forEach(row => {
      submitValue.push(row.cols);
    });

    return submitValue;

  }


}
