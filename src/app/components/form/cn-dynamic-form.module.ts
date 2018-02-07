import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CnFormInputComponent} from './cn-form-input/cn-form-input.component';
import {CnFormButtonComponent} from './cn-form-button/cn-form-button.component';
import {CnFormSelectComponent} from './cn-form-select/cn-form-select.component';
import {CnFormSelect2Component} from './cn-form-select2/cn-form-select2.component';
import {CnFormCheckboxComponent} from './cn-form-checkbox/cn-form-checkbox.component';
import {CnFormRadioComponent} from './cn-form-radio/cn-form-radio.component';
import {CnDynamicFormComponent} from './cn-dynamic-form.component';
import {CnDynamicFieldDirective} from './cn-dynamic-field.directive';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CnFormTextareaComponent} from './cn-form-textarea/cn-form-textarea.component';
import {CnDatePickerComponent} from './cn-date-picker/cn-date-picker.component';
import {CnDatetimePickerComponent} from './cn-datetime-picker/cn-datetime-picker.component';
import {CnDateRangePickerComponent} from './cn-date-range-picker/cn-date-range-picker.component';
import {CnFormDropdownComponent} from './cn-form-dropdown/cn-form-dropdown.component';
import {CnFormSpinDirective} from './cn-form-spin/cn-form-spin.directive';
import {CnFormSpinComponent} from './cn-form-spin/cn-form-spin.component';
import {CnFormSearchButtonComponent} from './cn-form-search-button/cn-form-search-button.component';
import {CnFormRowComponent} from './cn-form-row/cn-form-row.component';
import { CnFormSubmitComponent } from './cn-form-submit/cn-form-submit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CnDynamicFormComponent
  ],
  declarations: [
    CnFormInputComponent,
    CnFormButtonComponent,
    CnFormSelectComponent,
    CnFormSelect2Component,
    CnFormCheckboxComponent,
    CnFormRadioComponent,
    CnDynamicFormComponent,
    CnDynamicFieldDirective,
    CnFormTextareaComponent,
    CnDatePickerComponent,
    CnDatetimePickerComponent,
    CnDateRangePickerComponent,
    CnFormDropdownComponent,
    CnFormSpinDirective,
    CnFormSpinComponent,
    CnFormSearchButtonComponent,
    CnFormRowComponent,
    CnFormSubmitComponent
  ],
  entryComponents: [
    CnFormInputComponent,
    CnFormButtonComponent,
    CnFormSelect2Component,
    CnFormSelectComponent,
    CnFormCheckboxComponent,
    CnFormRadioComponent,
    CnFormTextareaComponent,
    CnDatePickerComponent,
    CnDateRangePickerComponent,
    CnDatetimePickerComponent,
    CnFormDropdownComponent,
    CnFormSpinComponent,
    CnFormSearchButtonComponent,
    CnFormRowComponent,
    CnFormSubmitComponent
  ]
})
export class CnDynamicFormModule { }
