import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnstPageResolverComponent } from './cnst-page-resolver/cnst-page-resolver.component';
import { CnstComponentResolverComponent } from './cnst-component-resolver/cnst-component-resolver.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    CnstPageResolverComponent,
    CnstComponentResolverComponent
  ],
  entryComponents:[CnstPageResolverComponent,
    CnstComponentResolverComponent
  ],
  declarations: [CnstPageResolverComponent, CnstComponentResolverComponent]
})
export class CnstResolverModule { }
