import {ComponentFactoryResolver, ComponentRef, Directive, Input, ViewContainerRef} from '@angular/core';
import {ICnComponent} from '../../component-models/component.interface';
import {ClientStorageService} from '../../../services/client-storage.service';
import {CnDynamicChartCountersComponent} from './dynamic-chart-counters/dynamic-chart-counters.component';
import {CnDynamicChartBarComponent} from './dynamic-chart-bar/dynamic-chart-bar.component';
const components: { [type: string]: any } = {
  chart_counter: CnDynamicChartCountersComponent,
  chart_bar: CnDynamicChartBarComponent
};
@Directive({
  selector: '[cnDynamicChart]'
})
export class DynamicChartDirective {

  @Input() componentConfig;
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
      this.component.instance.componentConfig = this.componentConfig.chartConfig;
    }
  }

  getCredential(): string {
    const onlineUser = this.clientStorage.getCookies('onlineUser');
    return onlineUser ? onlineUser.Token : '';
  }

}
