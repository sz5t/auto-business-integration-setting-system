import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../form/form-models/IFieldConfig';
declare let bootbox: any;
@Component({
  exportAs: 'cnstDynamicForm',
  selector: 'cnst-dynamic-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-dynamic-form.component.html',
  styleUrls: ['./cnst-dynamic-form.component.css']
})
export class CnstDynamicFormComponent implements OnInit, OnChanges {
  @Input() configs;
  @Input() configsTitle;
  @Input() config: IFieldConfig[] = [];
  @Input() submitValid;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  get controls() {
    const allControls = [];
    this.configs.forEach(config => {
      config.forEach(control => {
        allControls.push(control);
      });
    });
    return allControls.filter(({type}) => {
      return type !== 'button';
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

  getControlValue(name: string) {
    return this.form.controls[name].value;
  }

  delrow(row?: any) {
    bootbox.confirm({
     // title: "确认",
      message: "确定要删除?",
      buttons: {
        confirm: {
          label: "确定"
        },
        cancel: {
          label: "取消"

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
  };

  getValue(){
    return this.value;
  }


}
