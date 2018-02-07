import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {CnDynamicChartCounterComponent} from './dynamic-chart-counter/dynamic-chart-counter.component';
import {ClientStorageService} from '../../../../services/client-storage.service';
import {ICnComponent} from '../../../component-models/component.interface';
@Directive({
  selector: '[cnDynamicChartCounters]'
})
export class DynamicChartCountersDirective implements OnInit {

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
    if (this.componentConfig) {
      const componentFactory = this.resolver.resolveComponentFactory<ICnComponent>(CnDynamicChartCounterComponent);
      this.component = this.container.createComponent(componentFactory);
      this.component.instance.componentConfig = this.componentConfig;
    }
  }

}
