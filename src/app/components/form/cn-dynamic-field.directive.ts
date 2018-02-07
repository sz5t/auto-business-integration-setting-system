import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef} from '@angular/core';
import {IField} from './form-models/IField';
import {CnFormButtonComponent} from './cn-form-button/cn-form-button.component';
import {CnFormInputComponent} from './cn-form-input/cn-form-input.component';
import {CnFormSelectComponent} from './cn-form-select/cn-form-select.component';
import {CnFormSelect2Component} from './cn-form-select2/cn-form-select2.component';
import {CnFormRadioComponent} from './cn-form-radio/cn-form-radio.component';
import {CnFormCheckboxComponent} from './cn-form-checkbox/cn-form-checkbox.component';
import {IFieldConfig} from './form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {CnFormTextareaComponent} from './cn-form-textarea/cn-form-textarea.component';
import {CnDatePickerComponent} from './cn-date-picker/cn-date-picker.component';
import {CnDateRangePickerComponent} from './cn-date-range-picker/cn-date-range-picker.component';
import {CnDatetimePickerComponent} from './cn-datetime-picker/cn-datetime-picker.component';
import {CnFormDropdownComponent} from './cn-form-dropdown/cn-form-dropdown.component';
import {CnFormSpinComponent} from './cn-form-spin/cn-form-spin.component';
import {CnFormSearchButtonComponent} from './cn-form-search-button/cn-form-search-button.component';
import {CnFormSubmitComponent} from './cn-form-submit/cn-form-submit.component';

const component: { [type: string]: Type<IField> } = {
  button: CnFormButtonComponent,
  input: CnFormInputComponent,
  select: CnFormSelectComponent,
  select2: CnFormSelect2Component,
  radio: CnFormRadioComponent,
  checkbox: CnFormCheckboxComponent,
  textarea: CnFormTextareaComponent,
  datepicker: CnDatePickerComponent,
  daterangepicker: CnDateRangePickerComponent,
  datetimepicker: CnDatetimePickerComponent,
  asyndropdown: CnFormDropdownComponent,
  touchspin: CnFormSpinComponent,
  searchbutton: CnFormSearchButtonComponent,
  submit: CnFormSubmitComponent
};

@Directive({
  selector: '[cnDynamicField]'
})
export class CnDynamicFieldDirective implements IField, OnChanges, OnInit {
  @Input() config: IFieldConfig;
  @Input() group: FormGroup;
  @Input() submitValid: boolean;
  component: ComponentRef<IField>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
      this.component.instance.submitValid = this.submitValid;
    }
  }

  ngOnInit() {
    if (!component[this.config.type]) {
      const supportedTypes = Object.keys(component).join(', ');
      throw new Error(
        `Trying to use an unsupported types (${this.config.type}).Supported types: ${supportedTypes}`
      );
    }
    const comp = this.resolver.resolveComponentFactory<IField>(component[this.config.type]);
    this.component = this.container.createComponent(comp);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.submitValid = this.submitValid;
  }
}
