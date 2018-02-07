import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CnGridViewComponent} from './cn-gridview/cn-gridview.component';
import {DataTablesModule} from 'angular-datatables';
import {CnDialogModule} from '../dialog/cn-dialog.module';
import {CnDynamicModule} from '../dynamic/dynamic.module';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    CnDynamicModule
  ],
  declarations: [
    CnGridViewComponent
  ],
  exports: [
    CnGridViewComponent
  ],
  entryComponents: [CnGridViewComponent]
})
export class CnGridModule { }
