import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CnstFormInputComponent} from './cnst-form-input/cnst-form-input.component';
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
    CnstDynamicFormComponent,
    CnstDynamicFieldDirective
  ],
  exports: [
    CnstFormInputComponent,
    CnstDynamicFormComponent,
    CnstDynamicFieldDirective
  ],
  entryComponents: [
    CnstFormInputComponent,
    CnstDynamicFormComponent
  ]
})
export class CnstFormModule { }
