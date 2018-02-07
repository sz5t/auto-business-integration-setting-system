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
  //@ViewChildren('blocks') blocks: QueryList<ElementRef>;
  @ViewChildren('blocks') blocks: QueryList<CnDynamicBlockPortletComponent>;
  _config;

  constructor(private clientService: ClientStorageService) {}

  ngOnInit() {}

  ngAfterViewInit () {
    this.preview.nativeElement.style.height = window.screen.availHeight + 'px';
    this.editor.nativeElement.style.height = window.screen.availHeight + 'px';
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectFunc.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue){
        const funcName = $(this.selectFunc.nativeElement).selectpicker('val');
        const settingData = this.clientService.getLocalStorage(funcName);
        this._config = settingData;
        const treeData = [{
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
            node.id = 'node_' + CommonUtility.uuID(5);
            node.text = setting.title;
            node.icon = setting.titleIcon;
            node.parent = funcName;
            node.type = NodeTypes.NODE_TYPE.LAYOUT;
            node.state.disabled = false;
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



  save($event?) {

  }
}





