import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormDialogComponent} from './form-dialog/form-dialog.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {CnDynamicFormModule} from '../form/cn-dynamic-form.module';
import {CnToastModule} from '../toast/cn-toast.module';

@NgModule({
  imports: [
    CommonModule,
    CnDynamicFormModule,
    CnToastModule
  ],
  declarations: [
    FormDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    FormDialogComponent,
    ConfirmDialogComponent
  ]
})
export class CnDialogModule { }
