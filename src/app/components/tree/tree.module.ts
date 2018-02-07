import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CnTreeComponent} from "./cn-tree/cn-tree.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CnTreeComponent
  ],
  exports:[
    CnTreeComponent
  ],
  entryComponents: [CnTreeComponent]
})
export class CnTreeModule { }
