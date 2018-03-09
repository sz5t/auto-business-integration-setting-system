import {
  AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ClientStorageService} from '../../services/client-storage.service';
import {CnDynamicBlockPortletComponent} from '../../components/dynamic/dynamic-block/dynamic-block-portlet/dynamic-block-portlet.component';
import {CnDynamicRowDirective} from '../../components/dynamic/dynamic-row/cn-dynamic-row.directive';
import {CnDynamicLayoutComponent} from '../../components/dynamic/dynamic-layout/dynamic-layout.component';
import {NodeTypes, SettingTreeNodeResource, TreeNode} from '../../data/TreeNodeTypes';
import {CommonUtility} from '../../framework/utility/common-utility';
import {CnstPortletComponent} from "../../cnst-component/cnst-portlet/cnst-portlet.component";
declare let $: any;
@Component({
  selector: 'cn-component-setting',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './component-setting.component.html',
  styleUrls: ['./component-setting.component.css']
})
export class ComponentSettingComponent implements OnInit, AfterViewInit {
  @ViewChild('selectFunc') selectFunc: ElementRef;
  @ViewChild('preview') preview: ElementRef;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('settingTree') settingTree: ElementRef;

  @ViewChildren('blocks') blocks: QueryList<CnDynamicBlockPortletComponent>;
  _config;

  constructor(private clientService: ClientStorageService) {}

  ngOnInit() {}

  ngAfterViewInit () {
   /* const validHeight = document.body.scrollHeight - 300;
    this.preview.nativeElement.style.height = validHeight + 'px';
    this.editor.nativeElement.style.height = validHeight + 'px';*/
    //const $tree = $(this.settingTree.nativeElement);
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectFunc.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue){
        const funcName = $(this.selectFunc.nativeElement).selectpicker('val');
        const settingData = this.clientService.getLocalStorage(funcName);
        this._config = settingData;
        /* const treeData = [{
          id: funcName, text: '布局结构树', icon: 'fa fa-folder icon-state-warning', li_attr: '', a_attr: '', parent: '#', readonly: false, value: null,
          state: {
            opened: true,
            disabled: true,
            selected: false
          }, type: ''
        }];
        settingData.forEach(settings => {
          settings.forEach(setting => {
            const node = {...SettingTreeNodeResource.settingTreeNode};
            node.id = setting.id; // 树区域节点ID和布局区域ID保持一至
            node.text = setting.title;
            node.icon = setting.titleIcon;
            node.parent = funcName;
            node.type = NodeTypes.NODE_TYPE.LAYOUT;
            node.state.disabled = false;
            treeData.push(node);
          });
        });
        const layoutTree = $tree.jstree({
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
              return  createAction(_smenu, type, node.id);
            }
          }
        });
        const instance = $tree.jstree();
        const createComponentNode = (treeInstance, component, parentId) =>{

          const newID = treeInstance.create_node(
            parentId, component, 'last', () => {
              treeInstance.deselect_node(parentId);
            }, true);
          treeInstance.select_node(newID);

          this._config.forEach(config => {
            config.forEach(c => {
              if(c.id === parentId) {
                //两种实现，1、改变config 输入参数没动态改变，2、调用创建方法
                c.viewCfg = {component: component.type};
              }
            });
          });
          this._config = $.extend(true, [], this._config);
          console.log(this._config);
        };
        const createAction = (t, n, parentId) => {
          // t is menu node
          // n is component name
          switch (n) {
            case NodeTypes.NODE_TYPE.LAYOUT:
              const component_submenu = t[NodeTypes.NODE_TYPE.LAYOUT_COMPONENT_ADD].submenu;
              const layout_submenu = t[NodeTypes.NODE_TYPE.LAYOUT_LAYOUT_ADD].submenu;
              component_submenu[NodeTypes.NODE_TYPE.LAYOUT_TREE].action = (data) => {
                // const node = layoutTree.jstree('get_node', data.reference[0]);
                // const node = instance.get_node(data);
                createComponentNode(instance, NodeTypes.component_tree_node, parentId);
              };
              component_submenu[NodeTypes.NODE_TYPE.LAYOUT_GRIDVIEW].action = (data) => {
                createComponentNode(instance, NodeTypes.component_gridview_node, parentId)
              };
              layout_submenu[NodeTypes.NODE_TYPE.LAYOUT_TABS].action = (data) => {
                // add tabs
              };
              layout_submenu[NodeTypes.NODE_TYPE.LAYOUT_ACCORDION].action = (data) => {
                // add accordion
              };
              t[NodeTypes.NODE_TYPE.LAYOUT_COMPONENT_REMOVE].action = (data) => {
                // remove component
              };
              t[NodeTypes.NODE_TYPE.LAYOUT_LAYOUT_REMOVE].action = (data) => {
                // remove layout
              };
              break;
          }
          return t;
        };*/
      }
    });
  }
  save($event?) {
    const name = $(this.selectFunc.nativeElement).selectpicker('val')
    this.clientService.setLocalStorage(name, this._config);
  }
}





