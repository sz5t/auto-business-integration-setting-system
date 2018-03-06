import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CnDynamicRowDirective} from './dynamic-row/cn-dynamic-row.directive';
import {CnDynamicColumnComponent} from './dynamic-column/cn-dynamic-column/cn-dynamic-column.component';
import {CnDynamicLayoutComponent} from './dynamic-layout/dynamic-layout.component';
import {CnDynamicBlockPortletComponent} from './dynamic-block/dynamic-block-portlet/dynamic-block-portlet.component';
import {CnDynamicBlockPortletTabsComponent} from './dynamic-block/dynamic-block-portlet-tabs/dynamic-block-portlet-tabs.component';
import {CnDynamicBlockAccordionComponent} from './dynamic-block/dynamic-block-accordion/dynamic-block-accordion.component';
import {DynamicBlockDirective} from './dynamic-block/dynamic-block.directive';
import {DynamicComponentDirective} from './dynamic-component/dynamic-component.directive';
import {CnDynamicFormDialogComponent} from './dynamic-dialog/dynamic-form-dialog/dynamic-form-dialog.component';
import {CnDynamicConfirmDialogComponent} from './dynamic-dialog/dynamic-confirm-dialog/dynamic-confirm-dialog.component';
import {DynamicDialogDirective} from './dynamic-dialog/dynamic-dialog.directive';
import {CnDynamicFormModule} from '../form/cn-dynamic-form.module';
import {CnToastModule} from '../toast/cn-toast.module';
import {CnDynamicGridviewComponent} from './dynamic-component/cn-dynamic-gridview/cn-dynamic-gridview.component';
import {DataTablesModule} from 'angular-datatables';
import {CnDynamicFormsComponent} from './dynamic-component/cn-dynamic-form/cn-dynamic-forms.component';
import {CnDynamicFieldsDirective} from './dynamic-component/cn-dynamic-form/cn-dynamic-fields.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CnDynamicGridviewMultiComponent} from './dynamic-component/cn-dynamic-gridview/cn-dynamic-gridview-multi.component';
import {DynamicChartDirective} from './dynamic-charts/dynamic-chart.directive';
import {CnDynamicChartCounterComponent} from './dynamic-charts/dynamic-chart-counters/dynamic-chart-counter/dynamic-chart-counter.component';
import {CnDynamicChartCountersComponent} from './dynamic-charts/dynamic-chart-counters/dynamic-chart-counters.component';
import {DynamicChartCountersDirective} from './dynamic-charts/dynamic-chart-counters/dynamic-chart-counters.directive';
import {CnDynamicChartBarComponent} from './dynamic-charts/dynamic-chart-bar/dynamic-chart-bar.component';
import {CnDynamicTimelineHorizontalComponent} from './dynamic-component/dynamic-timeline-horizontal/dynamic-timeline-horizontal.component';
import {CnDynamicBlockWizardComponent} from './dynamic-block/dynamic-block-wizard/dynamic-block-wizard.component';
import {DynamicBlockWizardDirective} from './dynamic-block/dynamic-block-wizard/dynamic-block-wizard.directive';
import {CnDynamicSearchFormComponent} from './dynamic-component/cn-dynamic-search-form/cn-dynamic-search-form.component';
import {CnDynamicDetailDialogComponent} from './dynamic-dialog/dynamic-detail-dialog/dynamic-detail-dialog.component';
import {CnDynamicDetailComponent} from './dynamic-component/cn-dynamic-detail/cn-dynamic-detail.component';
import { CnDynamicTextInfoComponent } from './dynamic-component/cn-dynamic-text-info/cn-dynamic-text-info.component';
import {SafeHtmlPipe} from '../../pipe/safe-html.pipe';
import {CnContextmenuComponent} from './dynamic-block/cn-contextmenu/cn-contextmenu.component';
import {CnstComponentModule} from '../../cnst-component/cnst-component.module';
import {CnstDatasourceComponent} from './cnst-datasource/cnst-datasource.component';
import {CnstCodemirrorComponent} from './cnst-codemirror/cnst-codemirror.component';
import {CnstFormModule} from '../cnst-form/cnst-form.module';
import {CnstAttributeComponent} from './cnst-attribute/cnst-attribute.component';
import {CnstPropertyNavComponent} from "./cnst-property-nav/cnst-property-nav.component";
import { CnstTabPropertyEditorComponent } from './src/app/components/dynamic/cnst-tab-property-editor/cnst-tab-property-editor.component';
@NgModule({
  imports: [
    CommonModule,
    CnDynamicFormModule,
    CnToastModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    CnstComponentModule,
    CnstFormModule
  ],
  declarations: [
    CnDynamicRowDirective,
    CnDynamicColumnComponent,
    CnDynamicLayoutComponent,
    CnDynamicBlockPortletComponent,
    CnDynamicBlockPortletTabsComponent,
    CnDynamicBlockAccordionComponent,
    DynamicBlockDirective,
    DynamicComponentDirective,
    CnDynamicFormDialogComponent,
    CnDynamicConfirmDialogComponent,
    DynamicDialogDirective,
    CnDynamicGridviewComponent,
    CnDynamicGridviewMultiComponent,
    CnDynamicFormsComponent,
    CnDynamicFieldsDirective,
    CnDynamicChartCounterComponent,
    DynamicChartDirective,
    DynamicChartCountersDirective,
    CnDynamicChartCountersComponent,
    CnDynamicChartBarComponent,
    CnDynamicTimelineHorizontalComponent,
    CnDynamicBlockWizardComponent,
    DynamicBlockWizardDirective,
    CnDynamicSearchFormComponent,
    CnDynamicDetailDialogComponent,
    CnDynamicDetailComponent,
    CnDynamicTextInfoComponent,
    SafeHtmlPipe,
    CnContextmenuComponent,
    CnstDatasourceComponent,
    CnstCodemirrorComponent,
    CnstAttributeComponent,
    CnstPropertyNavComponent,
    CnstTabPropertyEditorComponent
  ],
  exports: [
    CnDynamicLayoutComponent,
    CnDynamicBlockPortletComponent,
    CnDynamicBlockPortletTabsComponent,
    CnDynamicBlockAccordionComponent,
    CnDynamicFormDialogComponent,
    CnDynamicConfirmDialogComponent,
    CnDynamicGridviewComponent,
    CnDynamicGridviewMultiComponent,
    CnDynamicFormsComponent,
    CnDynamicChartCounterComponent,
    CnDynamicChartCountersComponent,
    CnDynamicChartBarComponent,
    CnDynamicBlockWizardComponent,
    CnDynamicTimelineHorizontalComponent,
    CnDynamicSearchFormComponent,
    CnDynamicDetailDialogComponent,
    CnDynamicDetailComponent,
    CnDynamicTextInfoComponent,
    CnDynamicFieldsDirective,
    CnContextmenuComponent,
    CnstDatasourceComponent,
    CnstCodemirrorComponent,
    CnstAttributeComponent,
    CnstPropertyNavComponent
  ],
  entryComponents: [
    CnDynamicColumnComponent,
    CnDynamicBlockPortletComponent,
    CnDynamicBlockPortletTabsComponent,
    CnDynamicBlockAccordionComponent,
    CnDynamicFormDialogComponent,
    CnDynamicConfirmDialogComponent,
    CnDynamicGridviewComponent,
    CnDynamicGridviewMultiComponent,
    CnDynamicFormsComponent,
    CnDynamicChartCounterComponent,
    CnDynamicChartCountersComponent,
    CnDynamicChartBarComponent,
    CnDynamicBlockWizardComponent,
    CnDynamicTimelineHorizontalComponent,
    CnDynamicSearchFormComponent,
    CnDynamicDetailDialogComponent,
    CnDynamicDetailComponent,
    CnDynamicTextInfoComponent,
    CnstCodemirrorComponent,
    CnstAttributeComponent,
    CnstDatasourceComponent
  ]
})
export class CnDynamicModule {
}
