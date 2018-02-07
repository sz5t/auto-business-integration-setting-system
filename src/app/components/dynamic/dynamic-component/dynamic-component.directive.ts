import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {CnTreeComponent} from '../../tree/cn-tree/cn-tree.component';
import {ICnComponent} from '../../component-models/component.interface';
import {ComponentConfigFactory} from '../../../framework/factory/component-config.factory';
import {ClientStorageService} from '../../../services/client-storage.service';
import {CnDynamicGridviewComponent} from './cn-dynamic-gridview/cn-dynamic-gridview.component';
import {CnDynamicFormsComponent} from './cn-dynamic-form/cn-dynamic-forms.component';
import {CnDynamicGridviewMultiComponent} from './cn-dynamic-gridview/cn-dynamic-gridview-multi.component';
import {CnDynamicChartCountersComponent} from '../dynamic-charts/dynamic-chart-counters/dynamic-chart-counters.component';
import {CnDynamicChartBarComponent} from '../dynamic-charts/dynamic-chart-bar/dynamic-chart-bar.component';
import {CnDynamicTimelineHorizontalComponent} from './dynamic-timeline-horizontal/dynamic-timeline-horizontal.component';
import {CnDynamicDetailComponent} from "./cn-dynamic-detail/cn-dynamic-detail.component";
import {CnDynamicTextInfoComponent} from "./cn-dynamic-text-info/cn-dynamic-text-info.component";
const components: { [type: string]: any } = {
  grid_view: CnDynamicGridviewComponent,
  grid_multi_view: CnDynamicGridviewMultiComponent,
  tree_view: CnTreeComponent,
  form_view: CnDynamicFormsComponent,
  chart_counter: CnDynamicChartCountersComponent,
  chart_bar: CnDynamicChartBarComponent,
  timeline_horizontal: CnDynamicTimelineHorizontalComponent,
  detail_view: CnDynamicDetailComponent,
  text_info: CnDynamicTextInfoComponent,
};
@Directive({
  selector: '[cnDynamicComponent]'
})
export class DynamicComponentDirective implements OnInit, ICnComponent {
  @Input() componentConfig;
  @Input() componentCaption;
  component: ComponentRef<ICnComponent>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef,
              private clientStorage: ClientStorageService) {
  }

  ngOnInit() {
    this.buildChildComponent();
  }

  buildChildComponent() {
    if (this.componentConfig.viewCfg && this.componentConfig.viewCfg.component) {
      const componentFactory = this.resolver.resolveComponentFactory<ICnComponent>(components[this.componentConfig.viewCfg.component]);
      this.component = this.container.createComponent(componentFactory);
      this.component.instance.componentConfig = ComponentConfigFactory
        .createComponentConfig(
          this.componentConfig.viewCfg, this.getCredential(), this.getCustomerId()
        );
      if (this.componentConfig.viewCfg.component === 'grid_view'
        || this.componentConfig.viewCfg.component === 'grid_multi_view'
        || this.componentConfig.viewCfg.component === 'text_info') {
        this.component.instance.componentConfig.componentCaption = this.componentCaption;
      }
    }
  }

  getCredential(): string {
    const onlineUser = this.clientStorage.getCookies('onlineUser');
    return onlineUser ? onlineUser.Token : '';
  }

  getCustomerId() {
    const customerId = this.clientStorage.getCookies('customerId');
    return customerId;
  }
}
