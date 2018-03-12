import {
  AfterViewInit, ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ReflectiveInjector,
  ViewContainerRef
} from '@angular/core';
import {TabItem} from './cn-page-tab.model';

@Directive({
  selector: '[cnPageTabContainer],cnPageTabContainer'
})
export class CnPageTabContainerDirective implements OnInit, AfterViewInit, OnChanges{
  currentComponent = null;
  @Input() tabItem: TabItem;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef
  ) {}


  ngOnInit(): void {

  }

  ngOnChanges() {
    if(this.tabItem) {
      if (!this.tabItem.data){
        this.tabItem.data = {};
      }
      const inputProvider = Object.keys(this.tabItem.data).map(
        inputName => {
          return {
            provide: inputName, useValue: this.tabItem.data[inputName]
          };
        }
      );
      const resolverInputs = ReflectiveInjector.resolve(inputProvider);

      const dynamicComponentContainer = this.containerRef;

      const injector = ReflectiveInjector.fromResolvedProviders(resolverInputs, dynamicComponentContainer.parentInjector);
      const factory = this.componentFactoryResolver.resolveComponentFactory<ComponentRef<any>>(this.tabItem.component);
      const component = factory.create(injector);
      dynamicComponentContainer.insert(component.hostView);
      if (this.currentComponent) {
        this.currentComponent.destroy();
      }
      this.tabItem.componentObj = component;
      this.currentComponent = component;

    }
  }

  ngAfterViewInit() {

  }

  loadTabContent() {

  }
}
