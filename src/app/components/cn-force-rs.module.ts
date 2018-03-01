import { NgModule } from '@angular/core';
import {CnLayoutModule} from './layout/cn-layout.module';
import {CnDynamicFormModule} from './form/cn-dynamic-form.module';
import {CnDialogModule} from './dialog/cn-dialog.module';
import {CnToastModule} from './toast/cn-toast.module';
import {CnTreeModule} from './tree/tree.module';
import {CnGridModule} from './grid/cn-grid.module';
import {CnDynamicModule} from './dynamic/dynamic.module';
import {CommonModule} from '@angular/common';
import {CnstFormModule} from "./cnst-form/cnst-form.module";
/*import {CnContextmenuComponent} from './cn-contextmenu/cn-contextmenu.component';
import {CnPortletComponent} from './cn-portlet/cn-portlet.component';*/
@NgModule({
  imports: [
    CommonModule,
    CnLayoutModule,
    CnDynamicFormModule,
    CnDialogModule,
    CnToastModule,
    CnTreeModule,
    CnGridModule,
    CnDynamicModule,
    CnstFormModule
  ],
  exports: [
    CnLayoutModule,
    CnDynamicFormModule,
    CnDialogModule,
    CnToastModule,
    CnTreeModule,
    CnGridModule,
    CnDynamicModule,
    CnstFormModule
  ],
  declarations: [

  ]
})
export class CnForceRsModule {}
