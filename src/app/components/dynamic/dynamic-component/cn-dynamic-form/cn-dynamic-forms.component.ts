import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IFieldConfig} from '../../../form/form-models/IFieldConfig';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ICnComponent} from '../../../component-models/component.interface';
declare let $: any;
@Component({
  exportAs: 'cnDynamicForms',
  selector: 'cn-dynamic-forms',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-dynamic-forms.component.html',
  styleUrls: ['./cn-dynamic-forms.component.css']
})
export class CnDynamicFormsComponent implements OnInit, ICnComponent, OnChanges {

  @Input() componentConfig: IFieldConfig[] = [];
  @Input() submitValid;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  get controls() {
    return this.componentConfig.filter(({type}) => {
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
          const config = this.componentConfig.find(control => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: IFieldConfig) {
    const {disabled, validation, value} = config;
    return this.formBuilder.control({disabled, value}, validation);
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
    this.componentConfig = this.componentConfig.map(item => {
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
      control.setValue(value, {emitEvent: true});
    }
  }

  getControlValue(name: string) {
    return this.form.controls[name].value;
  }

}
