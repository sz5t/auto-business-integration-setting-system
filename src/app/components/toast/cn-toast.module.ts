import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CnToastComponent} from "./cn-toast/cn-toast.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CnToastComponent],
  exports:[CnToastComponent]
})
export class CnToastModule { }
