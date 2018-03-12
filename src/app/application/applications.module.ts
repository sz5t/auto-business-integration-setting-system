import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridViewTemplateComponent} from './grid-view-template/grid-view-template.component';
import {MasterSlaverTemplateComponent} from './master-slaver-template/master-slaver-template.component';
import {MasterGridTemplateComponent} from './master-grid-template/master-grid-template.component';
import {SlaverGridTemplateComponent} from './slaver-grid-template/slaver-grid-template.component';
import {MasterTemplateComponent} from './master-template/master-template.component';
import {TreeGridTemplateComponent} from './tree-grid-template/tree-grid-template.component';
import {ApplicationsComponent} from './applications.component';
import {RouterModule, Routes} from '@angular/router';
import {CnForceRsModule} from '../components/cn-force-rs.module';
import {DataTablesModule} from 'angular-datatables';
import {CnBreadcrumbComponent} from '../components/layout/cn-breadcrumb/cn-breadcrumb.component';
import {DashBroadTemplateComponent} from './dash-broad-template/dash-broad-template.component';
import {TabsDemoComponent} from './tabs-demo/tabs-demo.component';
import {TreeDemoComponent} from './tree-demo/tree-demo.component';
import {FormDemoComponent} from './form-demo/form-demo.component';
import {GridDemoComponent} from './grid-demo/grid-demo.component';
import {TimelineDemoComponent} from './timeline-demo/timeline-demo.component';
import {ApplicationTemplateComponent} from './application-template/application-template.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutSettingComponent} from './layout-setting/layout-setting.component';
import {ComponentSettingComponent} from './components-setting/component-setting.component';
import {ComponentEditingComponent} from './component-editing/component-editing.component';
import {ContextMenuComponent} from './context-menu/context-menu.component';
import { OperationSettingComponent } from './operation-setting/operation-setting.component';
import {CnLoginSystemComponent} from '../login/cn-login-system/cn-login-system.component';
import {CnLoginComponent} from '../login/cn-login/cn-login.component';
import {NotPageComponent} from '../not-page/not-page.component';


export const CHILDREN_ROUTES: Routes = [
  {path: '', redirectTo: 'System', pathMatch: 'full'},
  {path: 'Login', component: CnLoginSystemComponent},
  {path: 'System', component: CnLoginSystemComponent},
  {path: 'app/:id', component: ApplicationsComponent },
  {path: '**', component: NotPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    CnForceRsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(CHILDREN_ROUTES)
  ],
  declarations: [
    GridViewTemplateComponent,
    CnLoginComponent,
    CnLoginSystemComponent,
    MasterSlaverTemplateComponent,
    MasterGridTemplateComponent,
    SlaverGridTemplateComponent,
    MasterTemplateComponent,
    TreeGridTemplateComponent,
    ApplicationsComponent,
    DashBroadTemplateComponent,
    TabsDemoComponent,
    TreeDemoComponent,
    FormDemoComponent,
    GridDemoComponent,
    TimelineDemoComponent,
    ApplicationTemplateComponent,
    LayoutSettingComponent,
    ComponentSettingComponent,
    ComponentEditingComponent,
    ContextMenuComponent,
    OperationSettingComponent,
  ],
  entryComponents: [
    LayoutSettingComponent,
    ComponentSettingComponent,
    ComponentEditingComponent,
    OperationSettingComponent,
    ContextMenuComponent
  ]
})
export class ApplicationsModule {
}
