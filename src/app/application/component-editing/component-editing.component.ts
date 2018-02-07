import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {ClientStorageService} from '../../services/client-storage.service';
import {NodeTypes, SettingTreeNodeResource} from "../../data/TreeNodeTypes";
import {CommonUtility} from "../../framework/utility/common-utility";
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
  //@ViewChildren('blocks') blocks: QueryList<ElementRef>;
  // @ViewChildren('blocks') blocks: QueryList<CnDynamicBlockPortletComponent>;
  _config;
  _json;
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
          {id: 'AddTree', icon: 'icon-user', title: '新增树'},
          {id: 'AddTable', icon: 'icon-user', title: '新表格'},
          {id: 'AddTabs', icon: 'icon-user', title: '新Tab'},
          {id: 'Clear', icon: 'icon-user', title: '清空'}
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
          {id: 'AddTree', icon: 'icon-user', title: '新增树'},
          {id: 'AddTable', icon: 'icon-user', title: '新表格'},
          {id: 'AddTabs', icon: 'icon-user', title: '新Tab'},
          {id: 'Clear', icon: 'icon-user', title: '清空'}
        ]
      }
    ];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.preview.nativeElement.style.height = window.screen.availHeight + 'px';
    this.editor.nativeElement.style.height = window.screen.availHeight + 'px';
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectFunc.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue){
        const funcName = $(this.selectFunc.nativeElement).selectpicker('val');
        const settingData = this.clientService.getLocalStorage(funcName);
        this._config = settingData;
        let treeData = [{
          id: funcName, text: '配置结构树', icon: 'fa fa-folder icon-state-warning', li_attr: '', a_attr: '', parent: '#', readonly: false, value: null,
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
            const node = {...SettingTreeNodeResource.settingTreeNode};
            node.id = 'node_' + n;
            node.text = setting.title;
            node.icon = setting.titleIcon;
            node.parent = funcName;
            node.type = NodeTypes.NODE_TYPE.LAYOUT;
            node.state.disabled = false;
            treeData.push(node);
            if(n === 1){

            }
            else {
              treeData = treeData.concat(
                this._treeData
              );
            }

            console.log(treeData);
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
              t[NodeTypes.NODE_TYPE.LAYOUT_COMPONENT_REMOVE].action = (data) =>{

              };
              t[NodeTypes.NODE_TYPE.LAYOUT_LAYOUT_REMOVE].action = (data) =>{

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
