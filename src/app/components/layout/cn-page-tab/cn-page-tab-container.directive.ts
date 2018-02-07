import {
  AfterViewInit, ComponentFactoryResolver, Directive, Input, OnInit, ReflectiveInjector,
  ViewContainerRef
} from '@angular/core';
import {TabItem} from './cn-page-tab.model';

@Directive({
  selector: '[cnPageTabContainer],cnPageTabContainer'
})
export class CnPageTabContainerDirective implements OnInit, AfterViewInit{
  currentComponent = null;
  @Input() tabItem: TabItem;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef
  ) {}


  ngOnInit(): void {

  }

  ngAfterViewInit() {
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
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.tabItem.component);
    const component = factory.create(injector);
    if (this.tabItem.name === 'componentEditing'){
      component.instance._treeData = [
        {
          id: 'viewCfg_1_classType', text: '组件名称 <span class="badge badge-default">: GridView</span>', icon: 'fa fa-cogs font-orange', li_attr: '', a_attr: '', parent: 'node_2', readonly: false, value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false,
          }, type: 'node'
        },
        {
          id: 'viewCfg_1_id', text: '配置标识 <span class="badge badge-default">: a</span>', icon: 'fa fa-paperclip font-orange', li_attr: '', a_attr: '', parent: 'node_2', readonly: true, value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_pagingBarName',
          text: '分页设置 <span class="badge badge-default">: pagingBar_1</span>',
          icon: 'fa fa-flag',
          li_attr: '',
          a_attr: '',
          parent: 'node_2',
          readonly: true,
          value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_toolbarsConfig1', text: '是否分页', icon: '', li_attr: '', a_attr: '', parent: 'node_2', readonly: true, value: null,
          state: {
            opened: true,
            disabled: false,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_toolbarsConfig', text: '数据源', icon: '', li_attr: '', a_attr: '', parent: 'node_2', readonly: true, value: null,
          state: {
            opened: true,
            disabled: false,
            selected: false
          }, 'type': 'node'
        }
      ];
    }
    if (this.tabItem.name === 'contextMenu'){
      component.instance._treeData = [
        {
          id: 'viewCfg_1_classType', text: '组件名称 <span class="badge badge-default">: GridView</span>', icon: 'fa fa-cogs font-orange', li_attr: '', a_attr: '', parent: 'node_2', readonly: false, value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false,
          }, type: 'node'
        },
        {
          id: 'viewCfg_1_id', text: '数据列设置 <span class="badge badge-default">: a</span>', icon: 'fa fa-paperclip font-orange', li_attr: '', a_attr: '', parent: 'node_2', readonly: true, value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_pagingBarName',
          text: '字段1 <span class="badge badge-default">: pagingBar_1</span>',
          icon: 'fa fa-flag',
          li_attr: '',
          a_attr: '',
          parent: 'viewCfg_1_id',
          readonly: true,
          value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_toolbarsConfig1', text: '字段2', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_id', readonly: true, value: null,
          state: {
            opened: true,
            disabled: false,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_toolbarsConfig', text: '字段3', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_id', readonly: true, value: null,
          state: {
            opened: true,
            disabled: false,
            selected: false
          }, 'type': 'node'
        }
      ];
    }
    if (this.tabItem.name === 'dashbroad'){
      component.instance._treeData = [
        {
          id: 'viewCfg_1_classType', text: '操作设置 <span class="badge badge-default">: GridView</span>', icon: 'fa fa-cogs font-orange', li_attr: '', a_attr: '', parent: 'node_2', readonly: false, value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false,
          }, type: 'node'
        },
        {
          id: 'viewCfg_1_id', text: '增加 <span class="badge badge-default">: a</span>', icon: 'fa fa-paperclip font-orange', li_attr: '', a_attr: '', parent: 'viewCfg_1_classType', readonly: true, value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_pagingBarName',
          text: '删除 <span class="badge badge-default">: pagingBar_1</span>',
          icon: 'fa fa-flag',
          li_attr: '',
          a_attr: '',
          parent: 'viewCfg_1_classType',
          readonly: true,
          value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_toolbarsConfig1', text: '修改', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_classType', readonly: true, value: null,
          state: {
            opened: true,
            disabled: false,
            selected: false
          }, 'type': 'node'
        },
        {
          id: 'viewCfg_1_toolbarsConfig', text: '查询', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_classType', readonly: true, value: null,
          state: {
            opened: true,
            disabled: false,
            selected: false
          }, 'type': 'node'
        }
      ];
    }
    dynamicComponentContainer.insert(component.hostView);

    if(this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

  loadTabContent() {

  }
}
