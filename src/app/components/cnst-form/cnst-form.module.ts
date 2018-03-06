import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CnstFormInputComponent} from './cnst-form-input/cnst-form-input.component';
import {CnstFormSelectComponent} from './cnst-form-select/cnst-form-select.component';
import {CnstFormRadioComponent} from './cnst-form-radio/cnst-form-radio.component';
import {CnstDynamicFieldDirective} from './cnst-dynamic-field.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CnstDynamicFormComponent} from './cnst-dynamic-form.component';
import { CnstFormCodeEditorComponent } from './cnst-form-code-editor/cnst-form-code-editor.component';
import { CnstFormCodeMirrorComponent } from './cnst-form-code-editor/cnst-form-code-mirror/cnst-form-code-mirror.component';

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
    CnstDynamicFieldDirective,
    CnstFormCodeEditorComponent,
    CnstFormCodeMirrorComponent
  ],
  exports: [
    CnstFormInputComponent,
    CnstFormSelectComponent,
    CnstFormRadioComponent,
    CnstDynamicFormComponent,
    CnstDynamicFieldDirective,
    CnstFormCodeEditorComponent
  ],
  entryComponents: [
    CnstFormInputComponent,
    CnstFormSelectComponent,
    CnstFormRadioComponent,
    CnstDynamicFormComponent,
    CnstFormCodeEditorComponent
  ]
})
export class CnstFormModule { }
