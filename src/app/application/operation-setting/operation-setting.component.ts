import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NodeTypes, SettingTreeNodeResource, OperationSettingNodeTypes} from '../../data/TreeNodeTypes';
import {ClientStorageService} from '../../services/client-storage.service';
import {CommonUtility} from '../../framework/utility/common-utility';
import {CnstDynamicFormComponent} from '../../components/cnst-form/cnst-dynamic-form.component';
import {CommonData} from '../../data/common-data';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {SubjectMessageService} from "../../services/subject-message.service";
declare let $: any;
@Component({
  selector: 'cn-operation-setting',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './operation-setting.component.html',
  styleUrls: ['./operation-setting.component.css']
})
export class OperationSettingComponent implements OnInit, AfterViewInit {
  @ViewChild('selectFunc') selectFunc: ElementRef;
  @ViewChild('preview') preview: ElementRef;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('settingTree') settingTree: ElementRef;
  @ViewChild(CnstDynamicFormComponent) propertyForm: CnstDynamicFormComponent;
  _config = [];
  _navsData;
  _settingHeader = {
    header: [
      {title: '属性名', width: '100px'},
      {title: '属性值', width: 'auto'}
    ],
    deletebutton: {
      show: false
    }
  };
  _content = [
    [
      {
        'type': 'label',
        'label': '名称：'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'operationLabel',
        'helpText': '',
        'inputClass': 'input-inline input-medium',
        'placeholder': '',
        'helpClass': 'help-inline',
        'validations': [
          {
            'validator': 'required',
            'errorMessage': ''
          }
        ]
      }
    ],
    [
      {
        'type': 'label',
        'label': '标识：'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'operationName',
        'helpText': '',
        'inputClass': 'input-inline input-medium',
        'placeholder': '',
        'helpClass': 'help-inline',
        'validations': [
          {
            'validator': 'required',
            'errorMessage': ''
          }
        ]
      }
    ],
    [
      {
        'type': 'label',
        'label': '图标：'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'operationIcon',
        'helpText': '',
        'inputClass': 'input-inline input-medium',
        'placeholder': '',
        'helpClass': 'help-inline'
      },
    ],
    [
      {
        'type': 'label',
        'label': '类型：'
      },
      {
        'type': 'select',
        'options': [
          {
            'text': '无',
            'value': 'none'
          },
          {
            'text': '刷新数据',
            'value': 'refresh'
          },
          {
            'text': '执行SQL',
            'value': 'exec_sql'
          },
          {
            'text': '执行SQL后刷新',
            'value': 'after_sql'
          },
          {
            'text': '弹出确认框',
            'value': 'confirm'
          },
          {
            'text': '弹出窗体',
            'value': 'dialog'
          },
          {
            'text': '弹出表单',
            'value': 'form'
          },
          {
            'text': '执行SQL后刷新主界面',
            'value': 'refresh_parent'
          }
        ],
        'name': 'operationType',
        'value': 'none',
        'inputClass': 'input-medium'
      },
    ],
    [
      {
        'type': 'label',
        'label': '操作后状态：'
      },
      {
        'type': 'select',
        'placeholder': '浏览状态',
        'options': [
          {
            'text': '浏览状态',
            'value': 'normal'
          },
          {
            'text': '新增状态',
            'value': 'new'
          },
          {
            'text': '编辑状态',
            'value': 'edit'
          }
        ],
        'name': 'operationState',
        'value': 'normal',
        'inputClass': 'input-medium'
      },
    ],
    [
      {
        'type': 'label',
        'label': '空数据状态：'
      },
      {
        'type': 'select',
        'placeholder': '启用',
        'options': [
          {
            'text': '启用',
            'value': true
          },
          {
            'text': '禁用',
            'value': false
          }
        ],
        'name': 'operationNoneState',
        'value': true,
        'inputClass': 'input-medium'
      },
    ],
    [
      {
        'type': 'label',
        'label': '默认状态：'
      },
      {
        'type': 'select',
        'placeholder': '启用',
        'options': [
          {
            'text': '启用',
            'value': true
          },
          {
            'text': '禁用',
            'value': false
          }
        ],
        'name': 'operationDefaultState',
        'value': true,
        'inputClass': 'input-medium'
      },
    ],
    [
      {
        'type': 'label',
        'label': '顺序：'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'operationOrder',
        'helpText': '',
        'inputClass': 'input-inline input-medium',
        'placeholder': '',
        'helpClass': 'help-inline'
      }
    ],
    [
      {
        'type': 'label',
        'label': 'SQL：'
      },
      {
        'type': 'codeEditor',
        'inputType': 'text',
        'name': 'operationSQL',
        'helpText': '',
        'inputClass': 'input-inline input-medium',
        'placeholder': '',
        'helpClass': 'help-inline'
      }
    ]
  ];
  _currentNodeId;
  _currentNodeData;
  _currentNodeDataIndex;
  _currentNewData;
  $tree;
  _showTab = [false, false, false, false, false];
  _configTabs = CommonData.OPERATION_TYPE_DATA;

  dataStruct = [];
  constructor(private clientService: ClientStorageService, private subject: SubjectMessageService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.preview.nativeElement.style.height = window.screen.availHeight + 'px';
    //this.editor.nativeElement.style.height = window.screen.availHeight + 'px';
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectFunc.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue) {
        const funcName = $(this.selectFunc.nativeElement).selectpicker('val');
        const settingData = this.clientService.getLocalStorage(funcName);
        this._config = settingData;
        const treeData = [{
          id: funcName,
          text: '操作设置',
          icon: 'fa fa-cogs icon-state-warning',
          li_attr: '', a_attr: '', parent: '#', readonly: false, data: {},
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, type: ''
        }];
        //生成数据跟节点对象结构
        settingData.forEach((settings, settingsIndex) => {
          settings.forEach((setting, settingIndex) => {
            const node = {...SettingTreeNodeResource.settingTreeNode};
            node.id = setting.id;
            node.text = setting.title;
            node.parent = funcName;
            if (setting.tabs) {
              node.type = NodeTypes.NODE_TYPE.LAYOUT_TABS;
              node.state.disabled = true;
              if (setting.tabs) {
                setting.tabs.forEach((tab, tabIndex) => {
                  const tabNode = this.createNode({
                    parentId: node.id,
                    title: tab.title,
                    type: NodeTypes.NODE_TYPE.LAYOUT_TAB,
                    disabled: false,
                    data: {
                      type: 'tab',
                      settingsIndex: settingsIndex,
                      settingIndex: settingIndex,
                      tabIndex: tabIndex
                    }
                  });
                  treeData.push(tabNode);
                  if (tab.viewCfg) {
                    treeData.push(...this.initOperations(tabNode.id, tab.viewCfg.toolbarsConfigData));
                  }
                });
              }
            }
            else if (setting.viewCfg) {
              node.type = setting.viewCfg.component;
              node.state.disabled = false;
              node.data = {
                type: 'component',
                settingsIndex: settingsIndex,
                settingIndex: settingIndex,
              };
              if (node.type === 'grid_view') {
                treeData.push(...this.initOperations(node.id, setting.viewCfg.toolbarsConfigData));
              }
            }
            treeData.push(node);
          });
        });
        $(this.settingTree.nativeElement).jstree('destroy');
        this.$tree = $(this.settingTree.nativeElement);

        const createAction = (t, n) => {
          const instance = this.$tree.jstree(true);
          switch (n) {
            case NodeTypes.NODE_TYPE.LAYOUT_GRIDVIEW:
              t['addButton'].action = (data) => {
                const node = this.$tree.jstree('get_node', data.reference[0]);
                const idIndex = this._currentNewData.length  > 0 ? this._currentNewData.length : 0;
                const newOperationData = {
                  operationLabel: '操作',
                  operationName: '',
                  operationIcon: '',
                  operationType: 'none',
                  operationState: 'new',
                  operationNoneState: true,
                  operationDefaultState: true,
                  operationOrder: ''
                };
                const newNode = this.createNode({
                  parentId: node.id,
                  title: '操作',
                  type: NodeTypes.NODE_TYPE.BUTTON,
                  disabled: false,
                  data: {
                    index: idIndex,
                    btnData: newOperationData
                  }
                });
                treeData.push(newNode);
                this._currentNewData.push({data: {index: idIndex, btnData: newOperationData}});
                const newId = instance.create_node(node.id, newNode, 'last', () => {
                  instance.deselect_node(node.id);
                }, true);
                instance.select_node(newId);
              };
              break;
            case NodeTypes.NODE_TYPE.BUTTON:
              t['removeButton'].action = (data) => {
                const node = this.$tree.jstree('get_node', data.reference[0]);
                instance.delete_node(node);
                this.propertyForm.resetFormValue();
                this._navsData = [];
              };
              break;
          }
        };
        this.$tree.jstree({
          'core': {
            'themes': {
              'responsive': true
            },
            'check_callback': true,
            'data': treeData
          },
          'types': NodeTypes.nodeTypes,
          'plugins': ['dnd', 'state', 'types', 'contextmenu', 'wholerow'],
          'contextmenu': {
            'items': function (node) {
              const type = this.get_type(node);
              const _smenu = OperationSettingNodeTypes[type];
              createAction(_smenu, type);
              return _smenu;
            }
          }
        });
        this.$tree.on('select_node.jstree', (e, data) => {
          this._currentNodeId = data.node.id;
          const nd = data.node.data;
          if (nd.btnData){
            const parentNode = this.$tree.jstree('get_node', data.node.parent);
            const pNodeData = parentNode.data;
            if (pNodeData.type === 'component') {
              this._currentNodeData = this._config[pNodeData.settingsIndex][pNodeData.settingIndex]
                .viewCfg.toolbarsConfigData;
              this._currentNodeDataIndex = nd.index;
            }
            else if (pNodeData.type === 'tab') {
              this._currentNodeData = this._config[pNodeData.settingsIndex][pNodeData.settingIndex]
                .tabs[pNodeData.tabIndex]
                .viewCfg.toolbarsConfigData;
              this._currentNodeDataIndex = nd.index;
            }
            // 设置赋值调用
            this.subject.sendMessage({type: 'setValue'}, this._currentNodeData[this._currentNodeDataIndex].data.btnData);
            /*this.propertyForm.setFormValue(this._currentNodeData[this._currentNodeDataIndex].data.btnData);*/
          }
          if (data.node.data.type === 'component'){
            this._currentNewData = this._config[data.node.data.settingsIndex][data.node.data.settingIndex]
              .viewCfg.toolbarsConfigData;
          }
          if (data.node.data.type === 'tab') {
            this._currentNewData = this._config[data.node.data.settingsIndex][data.node.data.settingIndex]
              .tabs[data.node.data.tabIndex]
              .viewCfg.toolbarsConfigData;
          }
          this._navsData = this.$tree.jstree('get_path', data.node);
        });
      }
    });
  }

  createNode(info) {
    const node = {...SettingTreeNodeResource.settingTreeNode};
    node.id = 'node_' + CommonUtility.uuID(6);
    node.text = info.title;
    node.type = info.type;
    node.parent = info.parentId;
    node.state.disabled = info.disabled;
    node.data = info.data;
    node.icon = info.icon ? info.icon : '';
    return node;
  }

  initOperations(parentId, btnsData) {
    const initButtons = [];
    btnsData.forEach(btn => {
      btn.parentId = parentId;
      initButtons.push(this.createNode(btn));
    });
    return initButtons;
  }

  save(event) {
    this.subject.getMessage().subscribe(formData => {
      const oldData = this._currentNodeData[this._currentNodeDataIndex].data.btnData;
      oldData.forEach(d => {
        if(d.viewId === formData.data.viewId){
          d.data = formData.data.data;
        }
      });
    });
    this.subject.sendMessage({type: 'getValue'},{});
    /*if (this._currentNodeId && this.$tree) {
      const node = this.$tree.jstree('get_node', this._currentNodeId);
      node.data.data = event;
      this.$tree.jstree('rename_node', node, event.operationLabel);
      if (this._currentNodeData[this._currentNodeDataIndex]){
        this._currentNodeData[this._currentNodeDataIndex].data.btnData = event;
      }else {
        this._currentNodeData.push({data: {index: this._currentNodeDataIndex, btnData: event}});
      }
    }*/
  }

  submit($event) {
    this.propertyForm.handleSubmit($event);
  }

  setOperationFunction(value) {
    switch (value.operationType) {
      case CommonData.OPERATION_TYPE.none:
        this._showTab = [false, false, false, false, true];
        break;
      case CommonData.OPERATION_TYPE.exec_sql:
        this._showTab = [true, false, false, false, true];
        break;
      case CommonData.OPERATION_TYPE.after_SQL:
        this._showTab = [true, false, false, false, true];
        break;
      case CommonData.OPERATION_TYPE.refresh:
        this._showTab = [true, false, false, false, true];
        break;
      case CommonData.OPERATION_TYPE.confirm:
        this._showTab = [true, false, true, false, true];
        break;
      case CommonData.OPERATION_TYPE.form:
        this._showTab = [true, true, false, false, true];
        break;
      case CommonData.OPERATION_TYPE.window:
        this._showTab = [true, false, false, true, true];
        break;
      case CommonData.OPERATION_TYPE.refresh_parent:
        this._showTab = [true, true, false, false, false];
        break;
    }
  }
}
