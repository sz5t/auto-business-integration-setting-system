import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NodeTypes, SettingTreeNodeResource, OperationSettingNodeTypes} from '../../data/TreeNodeTypes';
import {ClientStorageService} from '../../services/client-storage.service';
import {CommonUtility} from '../../framework/utility/common-utility';
import {addPathToRoutes} from '@angular/cli/lib/ast-tools';
import {del} from 'selenium-webdriver/http';
import {CnstDynamicFormComponent} from '../../components/cnst-form/cnst-dynamic-form.component';
declare let $: any;
@Component({
  selector: 'cn-operation-setting',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './operation-setting.component.html',
  styleUrls: ['./operation-setting.component.css']
})
export class OperationSettingComponent implements OnInit, AfterViewInit{
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
    ], [
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
    ], [
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
            'value': 'exec_SQL'
          },
          {
            'text': '执行SQL后刷新',
            'value': 'after_SQL'
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
    ], [
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
    ], [
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
    ], [
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
    ], [
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
    ]
  ];
  constructor(private clientService: ClientStorageService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.preview.nativeElement.style.height = window.screen.availHeight + 'px';
    //this.editor.nativeElement.style.height = window.screen.availHeight + 'px';
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectFunc.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue){
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
        settingData.forEach(settings => {
          settings.forEach(setting => {
            const node = {...SettingTreeNodeResource.settingTreeNode};
            node.id = 'node_' + CommonUtility.uuID(6);
            node.text = setting.title;
            node.parent = funcName;
            if (setting.tabs){
              node.type = NodeTypes.NODE_TYPE.LAYOUT_TABS;
              node.state.disabled = true;
              if (setting.tabs){
                setting.tabs.forEach(tab => {
                  const tabNode = this.createNode({
                    parentId: node.id,
                    title: tab.title,
                    type: NodeTypes.NODE_TYPE.LAYOUT_TAB,
                    disabled: false
                  });
                  treeData.push(tabNode);
                  if (tab.viewCfg){
                    treeData.push(...this.initOperations(tabNode.id));
                  }
                });
              }
            }else if (setting.viewCfg) {
              node.type = setting.viewCfg.component;
              node.state.disabled = false;
              if (node.type === 'grid_view'){
                treeData.push(...this.initOperations(node.id));
              }
            }
            treeData.push(node);
          });
        });
        $(this.settingTree.nativeElement).jstree('destroy');
        const $tree = $(this.settingTree.nativeElement);

        const createAction = (t, n) => {
          const instance = $tree.jstree(true);
          switch (n) {
            case NodeTypes.NODE_TYPE.LAYOUT_GRIDVIEW:
              t['addButton'].action = (data) => {
                const node = $tree.jstree('get_node', data.reference[0]);
                const newId = instance.create_node(node.id, NodeTypes.buttonNode, 'last', () => {
                  instance.deselect_node(node.id);
                }, true);
                instance.select_node(newId);
              };
              break;
            case NodeTypes.NODE_TYPE.BUTTON:
              t['removeButton'].action = (data) => {
                const node = $tree.jstree('get_node', data.reference[0]);
                instance.delete_node(node);
                this.propertyForm.resetFormValue();
                this._navsData = [];
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
              const _smenu = OperationSettingNodeTypes[type];
              createAction(_smenu, type);
              return _smenu;
            }
          }
        });
        $tree.on('select_node.jstree', (e, data) => {
          this.propertyForm.setFormValue(data.node.data);
          this._navsData = $tree.jstree('get_path', data.node);
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
  initOperations(parentId) {
    const refreshOpt = this.createNode({
      parentId: parentId,
      title: '刷新',
      icon: 'fa fa-refresh text-primary',
      type: NodeTypes.NODE_TYPE.BUTTON,
      disabled: false,
      data: {
        operationLabel: '刷新',
        operationName: 'refresh',
        operationIcon: 'fa fa-refresh',
        operationType: 'refresh',
        operationState: 'normal',
        operationNoneState: true,
        operationDefaultState: true,
        operationOrder: '1'
      }
    });
    const addOpt = this.createNode({
      parentId: parentId,
      title: '新增',
      type: NodeTypes.NODE_TYPE.BUTTON,
      disabled: false,
      icon: 'fa fa-plus text-info',
      data: {
        operationLabel: '新增',
        operationName: 'add',
        operationIcon: 'fa fa-plus',
        operationType: 'none',
        operationState: 'new',
        operationNoneState: true,
        operationDefaultState: true,
        operationOrder: '2'
      }
    });
    const updateOpt = this.createNode({
      parentId: parentId,
      title: '编辑',
      type: NodeTypes.NODE_TYPE.BUTTON,
      disabled: false,
      icon: 'fa fa-pencil text-info',
      data: {
        operationLabel: '编辑',
        operationName: 'none',
        operationIcon: 'fa fa-pencil',
        operationType: 'none',
        operationState: 'edit',
        operationNoneState: true,
        operationDefaultState: true,
        operationOrder: '3'
      }
    });
    const delOpt = this.createNode({
      parentId: parentId,
      title: '删除',
      type: NodeTypes.NODE_TYPE.BUTTON,
      disabled: false,
      icon: 'fa fa-remove font-red',
      data: {
        operationLabel: '删除',
        operationName: 'remove',
        operationIcon: 'fa fa-remove',
        operationType: 'confirm',
        operationState: 'normal',
        operationNoneState: true,
        operationDefaultState: true,
        operationOrder: '4'
      }
    });
    const saveOpt = this.createNode({
      parentId: parentId,
      title: '保存',
      type: NodeTypes.NODE_TYPE.BUTTON,
      disabled: false,
      icon: 'fa fa-save text-success',
      data: {
        operationLabel: '保存',
        operationName: 'save',
        operationIcon: 'fa fa-save',
        operationType: 'none',
        operationState: 'normal',
        operationNoneState: true,
        operationDefaultState: true,
        operationOrder: '5'
      }
    });
    const cancelOpt = this.createNode({
      parentId: parentId,
      title: '取消',
      type: NodeTypes.NODE_TYPE.BUTTON,
      disabled: false,
      icon: 'fa fa-reply text-muted',
      data: {
        operationLabel: '取消',
        operationName: 'cancel',
        operationIcon: 'fa fa-reply',
        operationType: 'none',
        operationState: 'normal',
        operationNoneState: true,
        operationDefaultState: true,
        operationOrder: '6'
      }
    });
    return [refreshOpt, addOpt, updateOpt, delOpt, saveOpt, cancelOpt];
  }
}
