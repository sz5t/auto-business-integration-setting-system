import {
  ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, OnInit, Type,
  ViewContainerRef
} from '@angular/core';
import {IDynamicBlock, IDynamicBlockModel} from './dynamic-block.model';
import {CnDynamicBlockPortletComponent} from './dynamic-block-portlet/dynamic-block-portlet.component';
import {CnDynamicBlockPortletTabsComponent} from './dynamic-block-portlet-tabs/dynamic-block-portlet-tabs.component';
import {CnDynamicBlockAccordionComponent} from './dynamic-block-accordion/dynamic-block-accordion.component';
import {CnDynamicBlockWizardComponent} from './dynamic-block-wizard/dynamic-block-wizard.component';
const components: { [type: string]: Type<IDynamicBlock> } = {
  portlet: CnDynamicBlockPortletComponent,
  portletTabs: CnDynamicBlockPortletTabsComponent,
  portletAccordion: CnDynamicBlockAccordionComponent,
  portletWizard: CnDynamicBlockWizardComponent
};
declare let $: any;
@Directive({
  selector: '[cnDynamicBlock]'
})
export class DynamicBlockDirective implements OnInit, IDynamicBlock {
  dynamicBlockField: IDynamicBlockModel;
  @Input() templateConfig: any;

  component: ComponentRef<IDynamicBlock>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.initBlockField();
    this.buildComponent();
  }

  initBlockField() {
    this.dynamicBlockField = {
      title: this.templateConfig.title ? this.templateConfig.title : '',
      titleColor: this.templateConfig.titleColor ? this.templateConfig.titleColor : '',
      titleIcon: this.templateConfig.titleIcon ? this.templateConfig.titleIcon : '',
      isCollapse: this.templateConfig.isCollapse ? this.templateConfig.isCollapse : '',
      isFullScreen: this.templateConfig.isFullScreen ? this.templateConfig.isFullScreen : '',
      actions: this.templateConfig.actions ? this.templateConfig.actions : [],
      note: this.templateConfig.note
    };
  }

  buildComponent() {
    const componentFactory = this.resolver.resolveComponentFactory<IDynamicBlock>(components[this.templateConfig.blockType]);
    this.component = this.container.createComponent(componentFactory);
    this.component.instance.templateConfig = this.templateConfig;
  }
}
