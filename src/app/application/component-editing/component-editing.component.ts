import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ClientStorageService } from '../../services/client-storage.service';
import { NodeTypes, SettingTreeNodeResource } from "../../data/TreeNodeTypes";
import { CommonUtility } from "../../framework/utility/common-utility";
import { App } from '../../components/layout/cn-layout/cn-layout.component';
import { CnstAttributeComponent } from '../../components/dynamic/cnst-attribute/cnst-attribute.component';
import { CnstDatasourceComponent } from '../../components/dynamic/cnst-datasource/cnst-datasource.component';
declare let $: any;
@Component({
  selector: 'cn-component-editing',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './component-editing.component.html',
  styleUrls: ['./component-editing.component.css']
})
export class ComponentEditingComponent implements OnInit, AfterViewInit {
  @ViewChild('selectFunc') selectFunc: ElementRef;
  @ViewChild('preview') preview: ElementRef;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('settingTree') settingTree: ElementRef;
  @ViewChild('treeScroller') treeScroller: ElementRef;

  @ViewChild(CnstAttributeComponent) CnstAttribute: CnstAttributeComponent;
  @ViewChild(CnstDatasourceComponent) CnstDatasource: CnstDatasourceComponent;
  
  //@ViewChildren('blocks') blocks: QueryList<ElementRef>;
  // @ViewChildren('blocks') blocks: QueryList<CnDynamicBlockPortletComponent>;
  _config;
  _json;
  nodeJson;
  cfgJson;
  @Input() _treeData;
  constructor(private clientService: ClientStorageService) {
    this._json = [
      {
        portletkey: 'portletkey01',
        cliclass: 'col-md-3',
        portlet: {
          portletclass: 'portlet light bordered',
          portlettitle: {//标题
            iconclass: 'icon-speech', //小图标
            captiontitle: '标题一'//,//标题文字
            //captionhelper: "" //小标题
          },
          portletbody: {//布局里的组件内容
            appendcomponent: ''
          }

        },
        menuList: [
          { id: 'AddTree', icon: 'icon-user', title: '新增树' },
          { id: 'AddTable', icon: 'icon-user', title: '新表格' },
          { id: 'AddTabs', icon: 'icon-user', title: '新Tab' },
          { id: 'Clear', icon: 'icon-user', title: '清空' }
        ]
      },
      {
        portletkey: 'portletkey02',
        cliclass: 'col-md-9',
        portlet: {
          portletclass: 'portlet light bordered',
          portlettitle: {//标题
            iconclass: 'icon-speech', //小图标
            captiontitle: '标题一'//,//标题文字
            //captionhelper: "" //小标题
          },
          portletbody: {//布局里的组件内容
            appendcomponent: ''
          }

        },
        menuList: [
          { id: 'AddTree', icon: 'icon-user', title: '新增树' },
          { id: 'AddTable', icon: 'icon-user', title: '新表格' },
          { id: 'AddTabs', icon: 'icon-user', title: '新Tab' },
          { id: 'Clear', icon: 'icon-user', title: '清空' }
        ]
      }
    ];
  }

  ngOnInit() {

  }

  //取名称
  ComponentDic = {
    grid_view: {
      attribute: {
        viewId: {
          name: "viewId", text: "组件id", value: "", IsShow: true, form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        component: {
          name: "component", text: "组件名称", value: "", IsShow: true, form: {
            'type': 'label',
            'name': 'component',
            'label': '数据列表',

          },
          remark: "组件名称"
        },
        classType: {
          name: "classType", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'classType',
            'label': 'classType',
          },
          remark: "备注说明是id"
        },
        searchForm: {
          name: "searchForm", text: "查询", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'searchForm',
            'label': 'viewId',

          },
          remark: "查询表单"
        },
        toolbarsConfig: {
          name: "toolbarsConfig", text: "工具栏", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'toolbarsConfig',
            'label': 'toolbarsConfig',

          },
          remark: "工具栏"
        },
        ordering: {
          name: "ordering", text: "排序", value: "", IsShow: true,
          form: {
            'type': 'label',
            'name': 'ordering',
            'label': 'ordering',

          },
          remark: "排序"
        },
        paging: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        processing: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        searching: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        deferRender: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        columnConfigClass: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        columnFilter: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        autoWidth: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        destroy: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        lengthMenu: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        rowId: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        pagingType: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        pageLength: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        orderMulti: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        select: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        responsive: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        columnDefs: {
          name: "", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        order: {
          name: "order", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        dom: {
          name: "dom", text: "", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',

          },
          remark: "备注说明是id"
        },
        columnConfigs: {
          name: "columnConfigs", text: "字段配置", value: "", IsShow: false,
          form: {
            'type': 'label',
            'name': 'columnConfigs',
            'label': 'columnConfigs',

          },
          remark: "字段配置"
        }
      },
      field: {//字段 （列头，内容行）
        titleHeader: {
          header: [
            { title: '字段名称', width: 'auto' },
            { title: '标题', width: 'auto' },
            { title: '数据类型', width: 'auto' },
            { title: '展示样式', width: 'auto' },
            { title: '是否显示', width: 'auto' },
            { title: '顺序', width: 'auto' },
          ],
          deletebutton: {
            show: true
          }
        },
        content:
          [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName1',
              'helpClass': 'help-inline',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName2',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '字符',
                  'value': '字符'
                },
                {
                  'text': '数值',
                  'value': '数值'
                },
                {
                  'text': '时间',
                  'value': '时间'
                }
              ],
              'name': 'AssemblyName3',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '居中',
                  'value': '居中'
                },
                {
                  'text': '左对齐',
                  'value': '左对齐'
                },
                {
                  'text': '右对齐',
                  'value': '右对齐'
                }
              ],
              'name': 'AssemblyName4',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '显示',
                  'value': '显示'
                },
                {
                  'text': '隐藏',
                  'value': '隐藏'
                }
              ],
              'name': 'AssemblyName5',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName6',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            }
          ]

      },
      parameter: {//参数 （列头，内容行）
        titleHeader: {
          header: [
            { title: '参数名', width: 'auto' },
            { title: '参数替换字符串', width: 'auto' },
            { title: '取值方式', width: 'auto' },
            { title: '为空取值', width: 'auto' },
            { title: '参数类型', width: 'auto' },
            { title: '系统参数', width: 'auto' },
            { title: '取值或赋值字段名', width: 'auto' }
          ],
          deletebutton: {
            show: true
          }
        },
        content:
          [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName1',
              'helpClass': 'help-inline',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName2',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '系统生成序号',
                  'value': '系统生成序号'
                },
                {
                  'text': '页面字段取当前值',
                  'value': '页面字段取当前值'
                },
                {
                  'text': '页面字段取原值',
                  'value': '页面字段取原值'
                },
                {
                  'text': '从系统参数取值',
                  'value': '从系统参数取值'
                }
              ],
              'name': 'AssemblyName3',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '取数据库空值',
                  'value': '取数据库空值'
                }
              ],
              'name': 'AssemblyName4',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '字符',
                  'value': '字符'
                },
                {
                  'text': '日期',
                  'value': '日期'
                },
                {
                  'text': '数值',
                  'value': '数值'
                },
                {
                  'text': '布尔',
                  'value': '布尔'
                }
              ],
              'name': 'AssemblyName5',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '用户id',
                  'value': '用户id'
                },
                {
                  'text': '部门id',
                  'value': '部门id'
                },
                {
                  'text': '角色',
                  'value': '角色'
                }
              ],
              'name': 'AssemblyName6',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName7',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
          ]

      }

    },
    tree_view: {
      attribute:{
        viewId: {
          name: "viewId", text: "组件id", value: "", IsShow: true,
          form: {
            'type': 'label',
            'name': 'viewId',
            'label': 'viewId',
  
          },
          remark: "备注说明是id"
        },
        component: {
          name: "component", text: "组件名称", value: "", IsShow: true,
          form: {
            'type': 'label',
            'name': 'component',
            'label': '树',
          },
          remark: ""
        },
        classType: {
          name: "classType", text: "类型", value: "", IsShow: false,
          form: {
            'type': 'select',
            'placeholder': '--请选择--',
            'options': [
              {
                'text': '字符',
                'value': '字符'
              },
              {
                'text': '数值',
                'value': '数值'
              },
              {
                'text': '时间',
                'value': '时间'
              }
            ],
            'name': 'classType',
            'value': '',
            'inputClass': 'input-medium'
          },
          remark: ""
        },
        rootConfigs: {
          name: "rootConfigs", text: "", value: "", IsShow: false,
          form: {
            'type': 'select',
            'placeholder': '--请选择--',
            'options': [
              {
                'text': '字符',
                'value': '字符'
              },
              {
                'text': '数值',
                'value': '数值'
              },
              {
                'text': '时间',
                'value': '时间'
              }
            ],
            'name': 'rootConfigs',
            'value': '',
            'inputClass': 'input-medium'
          },
          remark: ""
        },
        childConfigList: {
          name: "childConfigList", text: "", value: "", IsShow: false,
          form: {
            'type': 'select',
            'placeholder': '--请选择--',
            'options': [
              {
                'text': '字符',
                'value': '字符'
              },
              {
                'text': '数值',
                'value': '数值'
              },
              {
                'text': '时间',
                'value': '时间'
              }
            ],
            'name': 'childConfigList',
            'value': '',
            'inputClass': 'input-medium'
          },
          remark: ""
        }
      },
      field: {//字段 （列头，内容行）
        titleHeader: {
          header: [
            { title: '字段名称', width: 'auto' },
            { title: '数据类型', width: 'auto' },
            { title: '顺序', width: 'auto' },
          ],
          deletebutton: {
            show: true
          }
        },
        content:
          [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName1',
              'helpClass': 'help-inline',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '字符',
                  'value': '字符'
                },
                {
                  'text': '数值',
                  'value': '数值'
                },
                {
                  'text': '时间',
                  'value': '时间'
                }
              ],
              'name': 'AssemblyName2',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName3',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            }
          ]

      },
      parameter: {//参数 （列头，内容行）
        titleHeader: {
          header: [
            { title: '参数名', width: 'auto' },
            { title: '参数替换字符串', width: 'auto' },
            { title: '取值方式', width: 'auto' },
            { title: '为空取值', width: 'auto' },
            { title: '参数类型', width: 'auto' },
            { title: '系统参数', width: 'auto' },
            { title: '取值或赋值字段名', width: 'auto' }
          ],
          deletebutton: {
            show: true
          }
        },
        content:
          [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName1',
              'helpClass': 'help-inline',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName2',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '系统生成序号',
                  'value': '系统生成序号'
                },
                {
                  'text': '页面字段取当前值',
                  'value': '页面字段取当前值'
                },
                {
                  'text': '页面字段取原值',
                  'value': '页面字段取原值'
                },
                {
                  'text': '从系统参数取值',
                  'value': '从系统参数取值'
                }
              ],
              'name': 'AssemblyName3',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '取数据库空值',
                  'value': '取数据库空值'
                }
              ],
              'name': 'AssemblyName4',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '字符',
                  'value': '字符'
                },
                {
                  'text': '日期',
                  'value': '日期'
                },
                {
                  'text': '数值',
                  'value': '数值'
                },
                {
                  'text': '布尔',
                  'value': '布尔'
                }
              ],
              'name': 'AssemblyName5',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '用户id',
                  'value': '用户id'
                },
                {
                  'text': '部门id',
                  'value': '部门id'
                },
                {
                  'text': '角色',
                  'value': '角色'
                }
              ],
              'name': 'AssemblyName6',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'AssemblyName7',
              'validations': [
                {
                  'validator': 'required',
                  'errorMessage': ''
                },
                {
                  'validator': 'minLength',
                  'length': 6,
                  'errorMessage': ''
                }
              ]
            },
          ]

      }
      
    }
  };

 
  ngAfterViewInit() {
    this.preview.nativeElement.style.height = window.screen.availHeight + 'px';
    this.editor.nativeElement.style.height = window.screen.availHeight + 'px';
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectFunc.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue) {
        const funcName = $(this.selectFunc.nativeElement).selectpicker('val');
        const settingData = this.clientService.getLocalStorage(funcName);
        console.log( settingData);
        this._config =  settingData;
        let treeData = [{
          id: funcName, text: '配置结构树', icon: 'fa fa-folder icon-state-warning', li_attr: '', a_attr: '', parent: '#', readonly: false, data: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, type: ''
        }];
        settingData.forEach(settings => {
          let n = 0;
          settings.forEach(setting => {
            n++;
            const node = { ...SettingTreeNodeResource.settingTreeNode };
            node.id = 'node_' + n;
            node.text = setting.title;
            node.icon = setting.titleIcon;
            node.parent = funcName;
            node.type = NodeTypes.NODE_TYPE.LAYOUT;
            node.state.disabled = false;
            treeData.push(node);
            if (setting.tabs) {//标签页加载
              n++;
              const nodeitem = { ...SettingTreeNodeResource.settingTreeNode };
              nodeitem.id = 'nodeitem_' + n;
              nodeitem.text = "tabs标签页";
              nodeitem.icon = setting.titleIcon;
              nodeitem.parent = node.id;
              nodeitem.type = "tabs";//类型里未维护
              nodeitem.state.disabled = false;

              treeData.push(nodeitem);

              setting.tabs.forEach(tab => {
                n++;
                const nodetab = { ...SettingTreeNodeResource.settingTreeNode };
                nodetab.id = 'nodetab_' + n;
                nodetab.text = tab.title;
                nodetab.icon = setting.titleIcon;
                nodetab.parent = nodeitem.id;
                nodetab.type = "tab";//类型里未维护
                nodetab.state.disabled = false;
                nodetab.state.opened = false;
                treeData.push(nodetab);
                if (tab.viewCfg) {
                  n++;
                  const nodetabitem = { ...SettingTreeNodeResource.settingTreeNode };
                  nodetabitem.id = 'nodeitem_' + n;
                  nodetabitem.text = tab.viewCfg.component;
                  nodetabitem.icon = setting.titleIcon;
                  nodetabitem.parent = nodetab.id;
                  nodetabitem.type = tab.viewCfg.component;
                  nodetabitem.state.disabled = false;
                  nodetabitem.state.opened = false;
                  nodeitem.data=setting.viewCfg;
                  treeData.push(nodetabitem);
                  for (var key in tab.viewCfg) {
                    n++;
                    const nodetabitems = { ...SettingTreeNodeResource.settingTreeNode };
                    nodetabitems.id = 'nodetabitems_' + n;
                    nodetabitems.text = this.ComponentDic[tab.viewCfg.component].attribute[key].text + " " + key;
                    nodetabitems.icon = setting.titleIcon;
                    nodetabitems.parent = nodetabitem.id;
                    nodetabitems.type = key;
                    nodetabitems.state.disabled = false;
                   
                    treeData.push(nodetabitems);
                    console.log(key);
                  }
                }



              });

            }
            else {
              if (setting.viewCfg) {
                n++;
                const nodeitem = { ...SettingTreeNodeResource.settingTreeNode };
                nodeitem.id = 'nodeitem_' + n;
                nodeitem.text = setting.viewCfg.component;
                nodeitem.icon = setting.titleIcon;
                nodeitem.parent = node.id;
                nodeitem.type = setting.viewCfg.component;
                nodeitem.state.disabled = false;
                nodeitem.state.opened = false;
                nodeitem.data=setting.viewCfg;
                treeData.push(nodeitem);
                for (var key in setting.viewCfg) {
                  n++;
                  const nodeitems = { ...SettingTreeNodeResource.settingTreeNode };
                  nodeitems.id = 'nodeitems_' + n;
                  nodeitems.text = this.ComponentDic[setting.viewCfg.component].attribute[key].text + " " + key;
                  nodeitems.icon = setting.titleIcon;
                  nodeitems.parent = nodeitem.id;
                  nodeitems.type = key;
                  nodeitems.state.disabled = false;
                  treeData.push(nodeitems);
                  console.log(key);
                }
              }
            }




            /* treeData = treeData.concat(
              this._treeData
            ); */

            //console.log(treeData);
          });
        });
        $(this.settingTree.nativeElement).jstree('destroy');
        const $tree = $(this.settingTree.nativeElement);
        const instance = $tree.jstree(true);
        const createAction = (t, n) => {
          switch (n) {
            // toolbar config
            case NodeTypes.NODE_TYPE.LAYOUT:
              const component_submenu = t[NodeTypes.NODE_TYPE.LAYOUT_COMPONENT_ADD].submenu;
              const layout_submenu = t[NodeTypes.NODE_TYPE.LAYOUT_LAYOUT_ADD].submenu;
              component_submenu[NodeTypes.NODE_TYPE.LAYOUT_TREE].action = (data) => {
                const node = instance.get_node(data.reference[0]);
                //const node = _menu.jstree('get_node', data.reference[0]);
                const newID = instance.create_node(node.id, NodeTypes.buttonNode, 'last', () => {
                  instance.deselect_node(node.id);
                }, true);
                instance.select_node(newID);
                const nd = instance.get_node(newID);
                instance.edit(nd);
              };
              component_submenu[NodeTypes.NODE_TYPE.LAYOUT_GRIDVIEW].action = (data) => {
                alert('refresh button');
              };
              layout_submenu[NodeTypes.NODE_TYPE.LAYOUT_TABS].action = (data) => {
                alert('delete all button');
              };
              layout_submenu[NodeTypes.NODE_TYPE.LAYOUT_ACCORDION].action = (data) => {
                alert('delete all button');
              };
              t[NodeTypes.NODE_TYPE.LAYOUT_COMPONENT_REMOVE].action = (data) => {

              };
              t[NodeTypes.NODE_TYPE.LAYOUT_LAYOUT_REMOVE].action = (data) => {

              };
              break;
          }
        };
        $tree.jstree({
          'core': {
            'themes': {
              'responsive': true
            },
            'check_callback': true,
            'data': treeData
          },
          'types': NodeTypes.nodeTypes,
          'state': { 'key': 'demo2' },
          'plugins': ['dnd', 'state', 'types', 'contextmenu'],
          'contextmenu': {
            'items': function (node) {
              const type = this.get_type(node);
              const _smenu = NodeTypes[type];
              createAction(_smenu, type);
              return _smenu;
            }
          }
        });
        //点击选中树节点
        $tree.on("changed.jstree", (e, data) => {
          //选中节点的时候，其实是同时去切换数据源和属性。
          this.nodeJson=data.node.data;
          this.cfgJson=this.ComponentDic[data.node.type];
         //this.CnstDatasource.setComponentDic(this.ComponentDic[data.node.type],data.node.data);

         // this.CnstAttribute.setComponentDic(this.ComponentDic[data.node.type],data.node.data);
          console.log( settingData);
        });
      }
    });

    const validHeight = document.body.scrollHeight - 500;
    this.treeScroller.nativeElement.style.height = validHeight + 'px';
    App.initSlimScroll('.scroller');
  }

  createTreePropsNode() {
    return [

    ]
  }

  createGridPropsNode(pid) {
    return [
      {
        id: 'g1', text: '数据源', icon: 'fa fa-folder icon-state-warning', li_attr: '', a_attr: '', parent: pid, readonly: false, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false
        }, type: ''
      }
    ]
  }
}
