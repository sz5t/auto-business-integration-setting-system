import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef} from '@angular/core';
import {IFieldConfig} from '../form/form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {CnstFormInputComponent} from './cnst-form-input/cnst-form-input.component';
import {CnstFormSelectComponent} from './cnst-form-select/cnst-form-select.component';
import {CnstFormRadioComponent} from './cnst-form-radio/cnst-form-radio.component';
import {IField} from '../form/form-models/IField';

const component: { [type: string]: Type<IField> } = {
  //button: CnFormButtonComponent,
  input: CnstFormInputComponent,
  select: CnstFormSelectComponent,
  radio: CnstFormRadioComponent,
  /*select2: CnFormSelect2Component,
  checkbox: CnFormCheckboxComponent,
  textarea: CnFormTextareaComponent,
  datepicker: CnDatePickerComponent,
  daterangepicker: CnDateRangePickerComponent,
  datetimepicker: CnDatetimePickerComponent,
  asyndropdown: CnFormDropdownComponent,
  touchspin: CnFormSpinComponent,
  searchbutton: CnFormSearchButtonComponent,
  submit: CnFormSubmitComponent*/
};

@Directive({
  selector: '[cnstDynamicField]'
})
export class CnstDynamicFieldDirective implements IField, OnChanges, OnInit {
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
    if(this.config.type === 'select'){
      this.component.instance
    }
  }
}
