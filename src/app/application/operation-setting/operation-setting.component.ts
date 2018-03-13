import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NodeTypes, SettingTreeNodeResource, OperationSettingNodeTypes } from '../../data/TreeNodeTypes';
import { ClientStorageService } from '../../services/client-storage.service';
import { CommonUtility } from '../../framework/utility/common-utility';
import { CnstDynamicFormComponent } from '../../components/cnst-form/cnst-dynamic-form.component';
import { CommonData } from '../../data/common-data';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SubjectMessageService } from '../../services/subject-message.service';
declare let $: any;
@Component({
  selector: 'cn-operation-setting',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './operation-setting.component.html',
  styleUrls: ['./operation-setting.component.css']
})
export class OperationSettingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectFunc') selectFunc: ElementRef;
  @ViewChild('preview') preview: ElementRef;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('settingTree') settingTree: ElementRef;
  @ViewChild(CnstDynamicFormComponent) propertyForm: CnstDynamicFormComponent;
  _config = [];
  _navsData;
  _settingHeader = {
    header: [
      { title: '属性名', width: '100px' },
      { title: '属性值', width: 'auto' }
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

  _subscrib;
  _viewIdCounter;
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
            const node = { ...SettingTreeNodeResource.settingTreeNode };
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
                  const node1 = { ...SettingTreeNodeResource.settingTreeNode };
                  node1.id = tabNode.id + 'operation';
                  node1.text = '操作';
                  node1.parent = tabNode.id;
                  node1.type = NodeTypes.NODE_TYPE.BUTTON_GROUP;
                  node1.state.disabled = false;
                  node1.data = {
                    type: 'tab',
                    settingsIndex: settingsIndex,
                    settingIndex: settingIndex,
                    tabIndex: tabIndex
                  };
                  treeData.push(node1);
                  const node2 = { ...SettingTreeNodeResource.settingTreeNode };
                  node2.id = tabNode.id + 'action';
                  node2.text = '动作';
                  node2.parent = tabNode.id;
                  node2.type = NodeTypes.NODE_TYPE.ACTION_GROUP;
                  node2.state.disabled = false;
                  node2.data = {
                    type: 'tab',
                    settingsIndex: settingsIndex,
                    settingIndex: settingIndex,
                    tabIndex: tabIndex
                  };
                  treeData.push(node2);
                 
                  if (tab.viewCfg) {
                    if (node1.type === 'button_group') {
                      treeData.push(...this.initOperations(node1.id, tab.viewCfg.toolbarsConfigData,NodeTypes.NODE_TYPE.BUTTON));
                    }
                    if (node2.type === 'action_group') {
                      treeData.push(...this.initOperations(node2.id, tab.viewCfg.toolbarsConfigData,NodeTypes.NODE_TYPE.ACTION));
                    }
                  }
                });
              }
            }
            else if (setting.viewCfg) {
              node.type = setting.viewCfg.component;
              node.state.disabled = true;
              node.data = {
                type: 'component',
                settingsIndex: settingsIndex,
                settingIndex: settingIndex,
              };

              const node1 = { ...SettingTreeNodeResource.settingTreeNode };
              node1.id = setting.id + 'operation';
              node1.text = '操作';
              node1.parent = node.id;
              node1.type = NodeTypes.NODE_TYPE.BUTTON_GROUP;
              node1.state.disabled = false;
              node1.data = {
                type: 'component',
                settingsIndex: settingsIndex,
                settingIndex: settingIndex,
              };
              treeData.push(node1);
              if (node1.type === 'button_group') {
                treeData.push(...this.initOperations(node1.id, setting.viewCfg.toolbarsConfigData,NodeTypes.NODE_TYPE.BUTTON));
              }
              const node2 = { ...SettingTreeNodeResource.settingTreeNode };
              node2.id = setting.id + 'action';
              node2.text = '动作';
              node2.parent = node.id;
              node2.type = NodeTypes.NODE_TYPE.ACTION_GROUP;
              node2.state.disabled = false;
              node2.data = {
                type: 'component',
                settingsIndex: settingsIndex,
                settingIndex: settingIndex,
              };
              treeData.push(node2);
              if (node2.type === 'action_group') {
                treeData.push(...this.initOperations(node2.id, setting.viewCfg.toolbarsConfigData,NodeTypes.NODE_TYPE.ACTION));
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
            case NodeTypes.NODE_TYPE.BUTTON_GROUP:
            case NodeTypes.NODE_TYPE.ACTION_GROUP:
              t['addButton'].action = (data) => {

                let type=NodeTypes.NODE_TYPE.BUTTON;
                if(n===NodeTypes.NODE_TYPE.ACTION_GROUP){
                  type=NodeTypes.NODE_TYPE.ACTION
                }
                const node = this.$tree.jstree('get_node', data.reference[0]);
                const idIndex = this._currentNewData.length > 0 ? this._currentNewData.length : 0;
                const newOperationData = [
                  {
                    viewId: 'viewId_property',
                    data: {
                      id: 'row_' + CommonUtility.uuID(5),
                      operationLabel: '',
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
                        id: 'row_' + CommonUtility.uuID(5),
                        execSqlStr: '',
                        execSqlMethod: '1',
                        execSqlStatus: 'normal'
                      }
                    ]
                  },
                  {
                    viewId: 'viewId_sqlParam',
                    data: [
                      {
                        id: 'row_' + CommonUtility.uuID(5),
                        paramName: '',
                        paramReplaceStr: '',
                        paramValueFrom: '',
                        paramNullValue: '',
                        paramDataType: 'string',
                        paramFromSystem: '',
                        paramValueField: '',
                        parentId: ''
                      },
                    ]
                  },
                  {
                    viewId: 'viewId_formLayout',
                    data:
                      {

                      }
                  },
                  {
                    viewId: 'viewId_formSql',
                    data:
                      {

                      }
                  },
                  {
                    viewId: 'viewId_formSqlParam',
                    data:
                      {

                      }
                  },
                  {
                    viewId: 'viewId_formConfig',
                    data:
                      {

                      }
                  },
                  {
                    viewId: 'viewId_confirm',
                    data:
                      {

                      }
                  },
                  {
                    viewId: 'viewId_confirmSql',
                    data:
                      {

                      }
                  },
                  {
                    viewId: 'viewId_action',
                    data:
                      {

                      }
                  },
                  {
                    viewId: 'viewId_actionParam',
                    data:
                      {

                      }
                  },
                ];
                const newNode = this.createNode({
                  parentId: node.id,
                  title: '操作',
                  type: type,
                  disabled: false,
                  data: {
                    index: idIndex,
                    btnData: newOperationData
                  }
                });
                treeData.push(newNode);
                this._currentNewData.push({
                  parentId: node.id,
                  title: '操作',
                  type: type,
                  disabled: false,
                  data: { index: idIndex, btnData: newOperationData }
                });
                const newId = instance.create_node(node.id, newNode, 'last', () => {
                  instance.deselect_node(node.id);
                }, true);
                instance.select_node(newId);
              };
              break;
            case NodeTypes.NODE_TYPE.BUTTON:
            case NodeTypes.NODE_TYPE.ACTION:
              t['removeButton'].action = (data) => {
                const node = this.$tree.jstree('get_node', data.reference[0]);
                const parentNode = this.$tree.jstree('get_node', node.parent);
                const pNodeData = parentNode.data;
                const nd = node.data;
                if (pNodeData.type === 'component') {
                  this._config[pNodeData.settingsIndex][pNodeData.settingIndex]
                    .viewCfg.toolbarsConfigData.splice(nd.index, 1);
                }
                else if (pNodeData.type === 'tab') {
                  this._config[pNodeData.settingsIndex][pNodeData.settingIndex]
                    .tabs[pNodeData.tabIndex]
                    .viewCfg.toolbarsConfigData.splice(nd.index, 1);
                }
                if (parentNode.children.length > 1) {
                  parentNode.children.forEach((child, ind) => {
                    if (ind > nd.index) {
                      this.$tree.jstree('get_node', child).data.index--;
                    }
                  });
                }


                instance.delete_node(node);
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
          if (nd.btnData) {
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
            this.subject.sendMessage({ type: 'setValue' }, this._currentNodeData[this._currentNodeDataIndex].data.btnData);
            /*this.propertyForm.setFormValue(this._currentNodeData[this._currentNodeDataIndex].data.btnData);*/
          }
          if (data.node.data.type === 'component') {
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
    const node = { ...SettingTreeNodeResource.settingTreeNode };
    node.id = 'node_' + CommonUtility.uuID(6);
    node.text = info.title;
    node.type = info.type;
    node.parent = info.parentId;
    node.state.disabled = info.disabled;
    node.data = info.data;
    node.icon = info.icon ? info.icon : '';
    return node;
  }

  initOperations(parentId, btnsData,type?) {
    const initButtons = [];
    btnsData.forEach(btn => {
      if(type){
        if(btn.type===type){
          btn.parentId = parentId;
          initButtons.push(this.createNode(btn));
        }
      }
      else{
        btn.parentId = parentId;
        initButtons.push(this.createNode(btn));
      }
    });
    return initButtons;
  }

  submit($event) {
   // this.propertyForm.handleSubmit($event);
  }

  save(event) {
    this._viewIdCounter = {};
    this._currentNodeData[this._currentNodeDataIndex].data.btnData.forEach(data => {
      this._viewIdCounter[data.viewId] = false;
    });
    if (!this._subscrib) {
      this._subscrib = this.subject.getMessage().subscribe(formData => {
        if (formData.type.type === 'returnFormValue') {
          const oldData = this._currentNodeData[this._currentNodeDataIndex].data.btnData;
          oldData.forEach(d => {
            if (d.viewId === formData.data.viewId) {
              d.data = formData.data.data;
              if (d.viewId === 'viewId_property') {
                if (this._currentNodeId && this.$tree) {
                  const node = this.$tree.jstree('get_node', this._currentNodeId);
                  node.data.data = formData.data.data;
                  this.$tree.jstree('rename_node', node, formData.data.data.operationLabel);
                  this._currentNodeData[this._currentNodeDataIndex].title=formData.data.data.operationLabel;
                  this._currentNodeData[this._currentNodeDataIndex].icon=formData.data.data.operationIcon;
                }
              }
              this._viewIdCounter[d.viewId] = true;
            }
          });
          let isFinished = true;
          for (let counter in this._viewIdCounter) {
            if (this._viewIdCounter[counter] === false) {
              isFinished = false;
            }
          }
          if (isFinished === true) {
            console.log('完成数据保存',this._config);
            this._config.forEach(cfgs =>{
              cfgs.forEach(cfg => {
                cfg.viewCfg.toolbarsConfigData.forEach(btnCfg => {
                  const allViewData = {};
                  btnCfg.data.btnData.forEach(viewData =>{
                    allViewData[viewData.viewId] = viewData.data;
                  });
                  // console.log(allViewData);
                  this.generateToolbarsConfig(allViewData);
                });
              });
            });
          }
        }
      });
    }
    this.subject.sendMessage({ type: 'getValue' }, this._currentNodeData[this._currentNodeDataIndex].data.btnData);
  }

  /**
   * 生成配置
   * @param allViewData 按钮配置的所有数据
   */
  private generateToolbarsConfig(allViewData) {
    const propertyData = allViewData['viewId_property'];
    switch (propertyData.operationType) {
      case CommonData.OPERATION_TYPE.none: // 改变行状态
        return this.generateDataStatusConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.refresh: // 刷新数据
        return this.generateRefreshConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.refresh_parent: // 刷新父页面数据
        return this.generateRefreshParentConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.exec_sql: // 执行SQL
        return this.generateSQLConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.after_SQL: // 执行SQL后
        return this.generateAfterSQLConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.form: // 弹出表单
        return this.generateFormConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.dialog: // 弹出对话框
        return this.generateDialogConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.window: // 弹出窗体
        return this.generateWindowConfig(allViewData, propertyData);
      case CommonData.OPERATION_TYPE.confirm: // 弹出确认框
        return this.generateConfirmConfig(allViewData, propertyData);
    }
  }

  /**
   *
   * @param propertyData
   * @param generateData
   */
  private generatePropertyData (propertyData, generateData) {

    generateData.id = propertyData.id;
    generateData.text = propertyData.operationLabel;
    generateData.img = propertyData.operationIcon;
    generateData.enabled = propertyData.operationDefaultState;
    generateData.noneDataEnabled = propertyData.operationNoneState;
    generateData.color = '';
    generateData.events.execution.dataStatus = propertyData.operationState;
    generateData.order = propertyData.order;
    return generateData;
  }

  // 生成行状态改变配置
  private generateDataStatusConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.none};
    return this.generatePropertyData(propertyData, generateData);
  }
  // 生成执行SQL配置
  private generateSQLConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.exec_sql};
    const result = this.generatePropertyData(propertyData, generateData);
    // 获取所有SQL语句数据
    const sqlData = allViewData['viewId_sql'];
    // 获取所有SQL参数数据
    const sqlParam = allViewData['viewId_sqlParam'];
    // 处理SQL和参数的映射关联
    const sqlObjs = this.generateSQLObject(sqlData, sqlParam);
    // Todo 回写处理结构
    return result;
  }

  // 执行SQL后刷新
  private generateAfterSQLConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.after_sql};
    const result = this.generatePropertyData(propertyData, generateData);
    // 获取所有SQL语句数据
    const sqlData = allViewData['viewId_sql'];
    // 获取所有SQL参数数据
    const sqlParam = allViewData['viewId_sqlParam'];
    // 处理SQL和参数的映射关联
    const sqlObjs = this.generateSQLObject(sqlData, sqlParam);
    // Todo 处理执行SQL后的逻辑结构
    return result;
  }
  // 执行SQL后刷新
  private generateRefreshConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.refresh};
    const result =  this.generatePropertyData(propertyData, generateData);
    // 获取所有SQL语句数据
    const sqlData = allViewData['viewId_sql'];
    // 获取所有SQL参数数据
    const sqlParam = allViewData['viewId_sqlParam'];
    // 处理SQL和参数的映射关联
    const sqlObjs = this.generateSQLObject(sqlData, sqlParam);
    // Todo 设置刷新当前页面
    return result;
  }
  // 执行SQL后刷新主页面
  private generateRefreshParentConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.refresh_parent};
    const result =  this.generatePropertyData(propertyData, generateData);
    // 获取所有SQL语句数据
    const sqlData = allViewData['viewId_sql'];
    // 获取所有SQL参数数据
    const sqlParam = allViewData['viewId_sqlParam'];
    // 处理SQL和参数的映射关联
    const sqlObjs = this.generateSQLObject(sqlData, sqlParam);
    // Todo 设置刷新主页面，应用于弹出内容
    return result;
  }
  // 对话框
  private generateDialogConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.dialog};
    const result = this.generatePropertyData(propertyData, generateData);
    const dialogData = allViewData['viewId_dialog'];
    // Todo 设置对话框及其操作
    return result;
  }
  // 生成弹出表单
  private generateFormConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.form};
    const result =  this.generatePropertyData(propertyData, generateData);
    const formLayout = allViewData['viewId_formLayout'];
    const formSql = allViewData['viewId_formLayout'];
    const formSqlParam = allViewData['viewId_formLayout'];
    // 处理SQL和参数的映射关联
    const sqlObjs = this.generateSQLObject(formSql, formSqlParam);
    // Todo 设置生成表单及其操作结构
    return result;
  }
  // 生成弹出确认框
  private generateConfirmConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.confirm};
    const result =  this.generatePropertyData(propertyData, generateData);
    const confirmLayout = allViewData['viewId_formLayout'];
    const confirmSql = allViewData['viewId_formLayout'];
    const confirmSqlParam = allViewData['viewId_formLayout'];
    // 处理SQL和参数的映射关联
    const sqlObjs = this.generateSQLObject(confirmSql, confirmSqlParam);
    // Todo 设置生成确认操作及其操作结构
    return result;
  }
  // 生成弹出窗体
  private generateWindowConfig(allViewData, propertyData) {
    const generateData = {...CommonData.OPERATION_TYPE_CONFIG.window};
    const result =  this.generatePropertyData(propertyData, generateData);
    const windowData = allViewData['viewId_sql'];
    // Todo 设置生成窗体及其操作结构
    return result;
  }
  // 生成SQL操作语句结构
  private generateSQLObject(sqlData, sqlParam) {
    const sqlObjs = [];
    if(sqlData && Array.isArray(sqlData)){
      sqlData.forEach(sql => {
        if(sqlParam && Array.isArray(sqlParam)){
          sqlParam.forEach(param => {
            // Todo 生成SQL语句及参数对应结构；
          });
        }
      });
    }
    return sqlObjs;
  }
  ngOnDestroy() {
    if (this._subscrib) {
      this._subscrib.unsubscribe();
    }
  }
}
