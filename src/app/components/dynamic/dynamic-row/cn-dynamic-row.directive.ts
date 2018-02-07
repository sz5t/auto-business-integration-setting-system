import {
  ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, HostBinding, Input, OnChanges, OnInit, Type,
  ViewContainerRef
} from '@angular/core';
import {ICnDynamicColumn} from '../dynamic-column/cn-dynamic-column.model';
import {CnDynamicColumnComponent} from '../dynamic-column/cn-dynamic-column/cn-dynamic-column.component';

const components: { [type: string]: Type<ICnDynamicColumn> } = {
  column: CnDynamicColumnComponent
};
@Directive({
  selector: '[cnDynamicRow]'
})
export class CnDynamicRowDirective implements OnInit {
  @HostBinding('class.row') hasRow = true;
  @Input() dynamicConfig;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  ngOnInit(): void {
    // check is or not column directive
    this.dynamicConfig.forEach(config => {
      const componentFactory = this.resolver.resolveComponentFactory<ICnDynamicColumn>(components['column']);
      const component: ComponentRef<ICnDynamicColumn> = this.container.createComponent(componentFactory);
      component.instance.templateConfig = config;
    });
  }
}
