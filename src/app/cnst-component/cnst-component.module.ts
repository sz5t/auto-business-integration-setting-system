import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnstPortletComponent } from './cnst-portlet/cnst-portlet.component';
import { CnstPortletContextmenuComponent } from './cnst-portlet-contextmenu/cnst-portlet-contextmenu.component';
import { CnstPortletGridviewComponent } from './cnst-portlet-gridview/cnst-portlet-gridview.component';
import { CnstPortletTabsComponent } from './cnst-portlet-tabs/cnst-portlet-tabs.component';
import { CnstPortletTreeComponent } from './cnst-portlet-tree/cnst-portlet-tree.component';
import { CnstPortletTabconcentComponent } from './cnst-portlet-tabconcent/cnst-portlet-tabconcent.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    CnstPortletComponent,
    CnstPortletGridviewComponent
  ],
  entryComponents:[
    CnstPortletComponent,
    CnstPortletGridviewComponent,
    CnstPortletTabsComponent,
    CnstPortletTreeComponent,
    CnstPortletTabconcentComponent],
  declarations: [
    CnstPortletComponent,
    CnstPortletContextmenuComponent,
    CnstPortletGridviewComponent,
    CnstPortletTabsComponent,
    CnstPortletTreeComponent,
    CnstPortletTabconcentComponent]
})
export class CnstComponentModule { }
