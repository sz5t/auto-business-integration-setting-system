import {
  Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy, Type, Input, OnChanges, TemplateRef, Output, EventEmitter , ChangeDetectorRef
} from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CnstPortletGridviewComponent } from '../cnst-portlet-gridview/cnst-portlet-gridview.component';
import { CnstPortletTreeComponent } from '../cnst-portlet-tree/cnst-portlet-tree.component';
import { CnstPortletContextmenuComponent } from '../cnst-portlet-contextmenu/cnst-portlet-contextmenu.component';
import { CnstPortletTabsComponent } from '../cnst-portlet-tabs/cnst-portlet-tabs.component';
import {App} from '../../components/layout/cn-layout/cn-layout.component';

import { ICnstPortlet } from '../cnst-portlet';
import {NodeTypes} from '../../data/TreeNodeTypes';
import {FixComponetLifehookService} from '../../services/fix-componet-lifehook.service';
const components: { [type: string]: Type<ICnstPortlet> } = {
  grid_view: CnstPortletGridviewComponent,
  tree_view: CnstPortletTreeComponent,
  tabs_view: CnstPortletTabsComponent
};
@Component({
  selector: 'cnst-portlet, [cnst-portlet]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-portlet.component.html',
  styleUrls: ['./cnst-portlet.component.css']
})
export class CnstPortletComponent implements OnInit, AfterViewInit, ICnstPortlet, OnDestroy{

  @Input() config: any = {};
  @Input() tabContent;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();
  componentRef: ComponentRef<ICnstPortlet>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild(CnstPortletContextmenuComponent) menu: CnstPortletContextmenuComponent;
  @ViewChild('portlet') portlet: ElementRef;

  // 右键弹出菜单
  menuList = [
    {
      id: 'tree_view', icon: 'icon-user', title: '添加树', data: {'viewCfg': {
      'viewId': '',
      'component': 'tree_view',
      'classType': 'tree',
      'toolbarsConfigData': [
        {
          parentId: '',
          title: '刷新',
          icon: 'fa fa-refresh text-primary',
          type: NodeTypes.NODE_TYPE.BUTTON,
          disabled: false,
          data: {
            index: 0,
            btnData: {
              operationLabel: '刷新',
              operationName: 'refresh',
              operationIcon: 'fa fa-refresh',
              operationType: 'refresh',
              operationState: 'normal',
              operationNoneState: true,
              operationDefaultState: true,
              operationOrder: '1'
            }
          }
        },
        {
          parentId: '',
          title: '新增',
          type: NodeTypes.NODE_TYPE.BUTTON,
          disabled: false,
          icon: 'fa fa-plus text-info',
          data: {
            index: 1,
            btnData: {
              operationLabel: '新增',
              operationName: 'add',
              operationIcon: 'fa fa-plus',
              operationType: 'none',
              operationState: 'new',
              operationNoneState: true,
              operationDefaultState: true,
              operationOrder: '2'
            }
          }
        },
        {
          parentId: '',
          title: '编辑',
          type: NodeTypes.NODE_TYPE.BUTTON,
          disabled: false,
          icon: 'fa fa-pencil text-info',
          data: {
            index: 2,
            btnData: {
              operationLabel: '编辑',
              operationName: 'none',
              operationIcon: 'fa fa-pencil',
              operationType: 'none',
              operationState: 'edit',
              operationNoneState: true,
              operationDefaultState: true,
              operationOrder: '3'
            }
          }
        },
        {
          parentId: '',
          title: '删除',
          type: NodeTypes.NODE_TYPE.BUTTON,
          disabled: false,
          icon: 'fa fa-remove font-red',
          data: {
            index: 3,
            btnData: {
              operationLabel: '删除',
              operationName: 'remove',
              operationIcon: 'fa fa-remove',
              operationType: 'confirm',
              operationState: 'normal',
              operationNoneState: true,
              operationDefaultState: true,
              operationOrder: '4'
            }
          }
        },
        {
          parentId: '',
          title: '保存',
          type: NodeTypes.NODE_TYPE.BUTTON,
          disabled: false,
          icon: 'fa fa-save text-success',
          data: {
            index: 4,
            btnData : {
              operationLabel: '保存',
              operationName: 'save',
              operationIcon: 'fa fa-save',
              operationType: 'after_sql',
              operationState: 'normal',
              operationNoneState: true,
              operationDefaultState: true,
              operationOrder: '5'
            }
          }
        },
        {
          parentId: '',
          title: '取消',
          type: NodeTypes.NODE_TYPE.BUTTON,
          disabled: false,
          icon: 'fa fa-reply text-muted',
          data: {
            index: 5,
            btnData: {
              operationLabel: '取消',
              operationName: 'cancel',
              operationIcon: 'fa fa-reply',
              operationType: 'none',
              operationState: 'normal',
              operationNoneState: true,
              operationDefaultState: true,
              operationOrder: '6'
            }
          }
        }
      ],
      'rootConfigs': [],
      'childConfigList': []
    }}},
    {
      id: 'grid_view', icon: 'icon-user', title: '数据网格', data: {
      'viewCfg': {
        'viewId': '',
        'component': 'grid_view',
        'classType': 'GridView',
        'searchForm': [],
        'toolbarsConfig': [],
        'toolbarsConfigData': [
          {
            parentId: '',
            title: '刷新',
            icon: 'fa fa-refresh text-primary',
            type: NodeTypes.NODE_TYPE.BUTTON,
            disabled: false,
            data: {
              index: 0,
              btnData: [
                {
                  viewId: 'viewId_property',
                  data: {
                    id: 'row_1',
                    operationLabel: '刷新',
                    operationName: 'refresh',
                    operationIcon: 'fa fa-refresh',
                    operationType: 'refresh',
                    operationState: 'normal',
                    operationNoneState: true,
                    operationDefaultState: true,
                    operationOrder: '1'
                  }
                },
                {
                  viewId: 'viewId_sql',
                  data: [
                    {
                      id: 'row_1',
                      execSqlStr: '001',
                      execSqlMethod: '1',
                      execSqlStatus: 'normal'
                    }
                  ]
                },
                {
                  viewId: 'viewId_sqlParam',
                  data: [
                    {
                      id: 'row_1',
                      paramName: '@Name_',
                      paramReplaceStr: '',
                      paramValueFrom: 'UI',
                      paramNullValue: '',
                      paramDataType: 'string',
                      paramFromSystem: '',
                      paramValueField: 'Name',
                      parentId: 'row_1'
                    },
                  ]
                },
                {
                  viewId: 'viewId_formLayout',
                  data: [
                    {
                      formLayoutType: 'table',
                      formLayoutNum: '1',
                    }
                  ]
                },
                {
                  viewId: 'viewId_formSql',
                  data: []
                },
                {
                  viewId: 'viewId_formSqlParam',
                  data: []
                },
                {
                  viewId: 'viewId_formConfig',
                  data: []
                },
                {
                  viewId: 'viewId_confirm',
                  data: []
                },
                {
                  viewId: 'viewId_confirmSql',
                  data: []
                },
                {
                  viewId: 'viewId_action',
                  data: []
                },
                {
                  viewId: 'viewId_actionParam',
                  data: []
                }
              ]
            }
          },
          {
            parentId: '',
            title: '新增',
            type: NodeTypes.NODE_TYPE.BUTTON,
            disabled: false,
            icon: 'fa fa-plus text-info',
            data: {
              index: 1,
              btnData: [
                {
                  viewId: 'viewId_property',
                  data: {
                    id: 'row_1',
                    operationLabel: '新增',
                    operationName: 'new',
                    operationIcon: 'fa fa-plus',
                    operationType: 'none',
                    operationState: 'new',
                    operationNoneState: true,
                    operationDefaultState: true,
                    operationOrder: '1'
                  }
                },
                {
                  viewId: 'viewId_sql',
                  data: [
                    {
                      id: 'row_1',
                      execSqlStr: '001',
                      execSqlMethod: '1',
                      execSqlStatus: '1'
                    }
                  ]
                },
                {
                  viewId: 'viewId_sqlParam',
                  data: [
                    {
                      id: 'row_1',
                      paramName: '@Name_',
                      paramReplaceStr: '',
                      paramValueFrom: 'UI',
                      paramNullValue: '',
                      paramDataType: 'string',
                      paramFromSystem: '',
                      paramValueField: 'Name',
                      parentId: 'row_1'
                    },
                  ]
                },
                {
                  viewId: 'viewId_formLayout',
                  data: [
                    {
                      formLayoutType: 'table',
                      formLayoutNum: '1',
                    }
                  ]
                },
                {
                  viewId: 'viewId_formSql',
                  data: []
                },
                {
                  viewId: 'viewId_formSqlParam',
                  data: []
                },
                {
                  viewId: 'viewId_formConfig',
                  data: []
                },
                {
                  viewId: 'viewId_confirm',
                  data: []
                },
                {
                  viewId: 'viewId_confirmSql',
                  data: []
                },
                {
                  viewId: 'viewId_action',
                  data: []
                },
                {
                  viewId: 'viewId_actionParam',
                  data: []
                }
              ]
            }
          },
          {
            parentId: '',
            title: '编辑',
            type: NodeTypes.NODE_TYPE.BUTTON,
            disabled: false,
            icon: 'fa fa-pencil text-info',
            data: {
              index: 2,
              btnData: [
                {
                  viewId: 'viewId_property',
                  data: {
                    id: 'row_1',
                    operationLabel: '编辑',
                    operationName: 'edit',
                    operationIcon: 'fa fa-pencil',
                    operationType: 'none',
                    operationState: 'edit',
                    operationNoneState: true,
                    operationDefaultState: true,
                    operationOrder: '1'
                  }
                },
                {
                  viewId: 'viewId_sql',
                  data: [
                    {
                      id: 'row_1',
                      execSqlStr: '001',
                      execSqlMethod: '1',
                      execSqlStatus: '1'
                    }
                  ]
                },
                {
                  viewId: 'viewId_sqlParam',
                  data: [
                    {
                      id: 'row_1',
                      paramName: '@Name_',
                      paramReplaceStr: '',
                      paramValueFrom: 'UI',
                      paramNullValue: '',
                      paramDataType: 'string',
                      paramFromSystem: '',
                      paramValueField: 'Name'
                    },
                  ]
                },
                {
                  viewId: 'viewId_formLayout',
                  data: [
                    {
                      formLayoutType: 'table',
                      formLayoutNum: '1',
                    }
                  ]
                },
                {
                  viewId: 'viewId_formSql',
                  data: []
                },
                {
                  viewId: 'viewId_formSqlParam',
                  data: []
                },
                {
                  viewId: 'viewId_formConfig',
                  data: []
                },
                {
                  viewId: 'viewId_confirm',
                  data: []
                },
                {
                  viewId: 'viewId_confirmSql',
                  data: []
                },
                {
                  viewId: 'viewId_action',
                  data: []
                },
                {
                  viewId: 'viewId_actionParam',
                  data: []
                }
              ]
            }
          },
          {
            parentId: '',
            title: '删除',
            type: NodeTypes.NODE_TYPE.BUTTON,
            disabled: false,
            icon: 'fa fa-remove font-red',
            data: {
              index: 3,
              btnData: [
                {
                  viewId: 'viewId_property',
                  data: {
                    id: 'row_1',
                    operationLabel: '删除',
                    operationName: 'refresh',
                    operationIcon: 'fa fa-remove',
                    operationType: 'confirm',
                    operationState: 'normal',
                    operationNoneState: true,
                    operationDefaultState: true,
                    operationOrder: '1'
                  }
                },
                {
                  viewId: 'viewId_sql',
                  data: [
                    {
                      id: 'row_1',
                      execSqlMethod: '1',
                      execSqlStatus: '1'
                    }
                  ]
                },
                {
                  viewId: 'viewId_sqlParam',
                  data: [
                    {
                      id: 'row_1',
                      paramName: '@Name_',
                      paramReplaceStr: '',
                      paramValueFrom: 'UI',
                      paramNullValue: '',
                      paramDataType: 'string',
                      paramFromSystem: '',
                      paramValueField: 'Name'
                    },
                  ]
                },
                {
                  viewId: 'viewId_formLayout',
                  data: [
                    {
                      formLayoutType: 'table',
                      formLayoutNum: '1',
                    }
                  ]
                },
                {
                  viewId: 'viewId_formSql',
                  data: []
                },
                {
                  viewId: 'viewId_formSqlParam',
                  data: []
                },
                {
                  viewId: 'viewId_formConfig',
                  data: []
                },
                {
                  viewId: 'viewId_confirm',
                  data: []
                },
                {
                  viewId: 'viewId_confirmSql',
                  data: []
                },
                {
                  viewId: 'viewId_action',
                  data: []
                },
                {
                  viewId: 'viewId_actionParam',
                  data: []
                }
              ]
            }
          },
          {
            parentId: '',
            title: '保存',
            type: NodeTypes.NODE_TYPE.BUTTON,
            disabled: false,
            icon: 'fa fa-save text-success',
            data: {
              index: 4,
              btnData : [
                {
                  viewId: 'viewId_property',
                  data: {
                    id: 'row_1',
                    operationLabel: '保存',
                    operationName: 'save',
                    operationIcon: 'fa fa-save',
                    operationType: 'after_sql',
                    operationState: 'edit',
                    operationNoneState: true,
                    operationDefaultState: true,
                    operationOrder: '1'
                  }
                },
                {
                  viewId: 'viewId_sql',
                  data: [
                    {
                      id: 'row_1',
                      execSqlId: '001',
                      execSqlStr: 'INSERT INTO',
                      execSqlMethod: '1',
                      execSqlStatus: '1'
                    },
                    {
                      id: 'row_2',
                      execSqlStr: 'UPDATE',
                      execSqlMethod: '1',
                      execSqlStatus: '1'
                    }
                  ]
                },
                {
                  viewId: 'viewId_sqlParam',
                  data: [
                    {
                      id: 'row_1',
                      paramName: '@Name_',
                      paramReplaceStr: '',
                      paramValueFrom: 'UI',
                      paramNullValue: '',
                      paramDataType: 'string',
                      paramFromSystem: '',
                      paramValueField: 'Name'
                    },
                  ]
                },
                {
                  viewId: 'viewId_formLayout',
                  data: [
                    {
                      formLayoutType: 'table',
                      formLayoutNum: '1',
                    }
                  ]
                },
                {
                  viewId: 'viewId_formSql',
                  data: []
                },
                {
                  viewId: 'viewId_formSqlParam',
                  data: []
                },
                {
                  viewId: 'viewId_formConfig',
                  data: []
                },
                {
                  viewId: 'viewId_confirm',
                  data: []
                },
                {
                  viewId: 'viewId_confirmSql',
                  data: []
                },
                {
                  viewId: 'viewId_action',
                  data: []
                },
                {
                  viewId: 'viewId_actionParam',
                  data: []
                }
              ]
            }
          },
          {
            parentId: '',
            title: '取消',
            type: NodeTypes.NODE_TYPE.BUTTON,
            disabled: false,
            icon: 'fa fa-reply text-muted',
            data: {
              index: 5,
              btnData: [
                {
                  viewId: 'viewId_property',
                  data: {
                    id: 'row_1',
                    operationLabel: '取消',
                    operationName: 'none',
                    operationIcon: 'fa fa-reply',
                    operationType: 'none',
                    operationState: 'edit',
                    operationNoneState: true,
                    operationDefaultState: true,
                    operationOrder: '1'
                  }
                },
                {
                  viewId: 'viewId_sql',
                  data: [
                    {
                      id: 'row_1',
                      execSqlStr: '001',
                      execSqlMethod: '1',
                      execSqlStatus: '1'
                    }
                  ]
                },
                {
                  viewId: 'viewId_sqlParam',
                  data: [
                    {
                      id: 'row_1',
                      paramName: '@Name_',
                      paramReplaceStr: '',
                      paramValueFrom: 'UI',
                      paramNullValue: '',
                      paramDataType: 'string',
                      paramFromSystem: '',
                      paramValueField: 'Name'
                    },
                  ]
                },
                {
                  viewId: 'viewId_formLayout',
                  data: [
                    {
                      formLayoutType: 'table',
                      formLayoutNum: '1',
                    }
                  ]
                },
                {
                  viewId: 'viewId_formSql',
                  data: []
                },
                {
                  viewId: 'viewId_formSqlParam',
                  data: []
                },
                {
                  viewId: 'viewId_formConfig',
                  data: []
                },
                {
                  viewId: 'viewId_confirm',
                  data: []
                },
                {
                  viewId: 'viewId_confirmSql',
                  data: []
                },
                {
                  viewId: 'viewId_action',
                  data: []
                },
                {
                  viewId: 'viewId_actionParam',
                  data: []
                }
              ]
            }
          }
        ],
        'ordering': true,
        'paging': true,
        'processing': false,
        'searching': true,
        'deferRender': true,
        'columnConfigClass': 'AppUser',
        'columnFilter': 'Data',
        'autoWidth': true,
        'destroy': true,
        'lengthMenu': [
          '5',
          '10',
          '20',
          '30',
          '40',
          '50',
          '100'
        ],
        'rowId': '',
        'pagingType': 'full_numbers',
        'pageLength': '20',
        'orderMulti': true,
        'select': true,
        'responsive': true,
        'columnDefs': [
          {
            'orderable': false,
            'targets': [
              0
            ]
          }
        ],
        'order': [
          [
            '1',
            'asc'
          ]
        ],
        'dom': 'Bfr<"table-scrollable"t>ip',
        'columnConfigs': []
    }}},
    { id: 'tabs_view', icon: 'icon-user', title: '标签页', data: {'tabs': []} },
    { id: 'Clear', icon: 'icon-user', title: '清空', data: {} }
  ];
  portletJson = {
    'id': '001',
    // "title": "用户列表",
    'titleColor': 'font-green',
    'titleIcon': 'fa fa-cogs',
    'isFullScreen': true,
    'isCollapse': true,
    'blockType': 'portlet',
    'size': {
      'xs': {
        'value': '12',
        'offset': ''
      },
      'sm': {
        'value': '12',
        'offset': ''
      },
      'md': {
        'value': '12',
        'offset': ''
      },
      'lg': {
        'value': '12',
        'offset': ''
      }
    }
  };
  // 布局json信息
  private sub: any;
  private counter = 0;
  constructor(
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private fixHook: FixComponetLifehookService
  ) {
     this.sub = this.fixHook.emitter.subscribe(counter => this.counter = counter);
     if (!this.config.height) {
     this.config.height = '300px';
     }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    App.initSlimScroll('.scroller');
  }

  createComponent(data?) {
    setTimeout(() => {
      if (data.name) {
        if (data.name === 'Clear') {
          if (this.componentRef) {
            this.componentRef.destroy();
          }
        } else {
          this.container.clear();
          const factory = this.resolver.resolveComponentFactory<ICnstPortlet>(components[data.name]);
          this.componentRef = this.container.createComponent(factory);
          this.componentRef.instance.config = data.value;
          if (data.name === 'grid_view') {
            this.config.viewCfg = data.value.viewCfg;
          }
          if (data.name === 'tree_view') {
            this.config.viewCfg = data.value.viewCfg;
          }
          if (data.name === 'tabs_view') {
            this.config.tabs = data.value.tabs;
            this.componentRef.instance.callback.subscribe(event => {
              this.config.tabs.push(event);
            });
          }
          if (this.tabContent) {
            this.tabContent.viewCfg = data.value.viewCfg;
          }
        }
      }
    });
    // this.componentRef.instance.type = type;
    //  this.componentRef.instance.output.subscribe((msg: string) => console.log(msg));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.componentRef) {
      this.componentRef.destroy();
    }

  }
}
