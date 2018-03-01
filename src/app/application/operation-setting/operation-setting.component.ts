import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NodeTypes, SettingTreeNodeResource} from '../../data/TreeNodeTypes';
import {ClientStorageService} from '../../services/client-storage.service';
import {CommonUtility} from '../../framework/utility/common-utility';
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
  _config;
  _operationFormConfig;
  @Input() _treeData;
  constructor(private clientService: ClientStorageService) {
    if (!this._operationFormConfig) {
      this._operationFormConfig = {//字段 （列头，内容行）
        titleHeader: {
          header: [
            { title: '属性名', width: '90px' },
            { title: '属性值', width: 'auto' },
          ],
            deletebutton: {
            show: false
          }
        },
        content:
          [
            [
              {
                'type': 'label',
                'label': '操作名称：'
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
              },
            ], [
            {
              'type': 'label',
              'label': '操作图标：'
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
              'label': '操作类型：'
            },
              {
                'type': 'select',
                'placeholder': '无',
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
              'label': '操作顺序：'
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
          ]
      };
    }
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
          id: funcName, text: '操作设置', icon: 'fa fa-cogs icon-state-warning', li_attr: '', a_attr: '', parent: '#', readonly: false, value: null,
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
            //node.icon = setting.titleIcon;
            node.parent = funcName;
            if (setting.tabs){
              node.type = NodeTypes.NODE_TYPE.LAYOUT_TABS;
              node.state.disabled = true;
              if (setting.tabs){
                setting.tabs.forEach(tab => {
                  const tabNode = {...SettingTreeNodeResource.settingTreeNode};
                  tabNode.id = 'node_' + CommonUtility.uuID(6);
                  tabNode.text = tab.title;
                  tabNode.type = NodeTypes.NODE_TYPE.LAYOUT_TAB;
                  tabNode.parent = node.id;
                  node.state.disabled = false;
                  treeData.push(tabNode);
                });
              }
            }else if (setting.viewCfg){
              node.type = setting.viewCfg.component;
              node.state.disabled = false;
            }
            treeData.push(node);
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
      }
    });
  }
}
