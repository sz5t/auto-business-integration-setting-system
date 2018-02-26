import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CnstFormInputComponent} from './cnst-form-input/cnst-form-input.component';
import {CnstFormSelectComponent} from './cnst-form-select/cnst-form-select.component';
import {CnstFormRadioComponent} from './cnst-form-radio/cnst-form-radio.component';
import {CnstDynamicFieldDirective} from './cnst-dynamic-field.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CnstDynamicFormComponent} from "./cnst-dynamic-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CnstFormInputComponent,
    CnstFormSelectComponent,
    CnstFormRadioComponent,
    CnstDynamicFormComponent,
    CnstDynamicFieldDirective
  ],
  exports: [
    CnstFormInputComponent,
    CnstFormSelectComponent,
    CnstFormRadioComponent,
    CnstDynamicFormComponent,
    CnstDynamicFieldDirective
  ],
  entryComponents: [
    CnstFormInputComponent,
    CnstFormSelectComponent,
    CnstFormRadioComponent,
    CnstDynamicFormComponent
  ]
})
export class CnstFormModule { }
