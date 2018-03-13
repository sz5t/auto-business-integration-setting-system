/**
 * Created by zhaoxinlei on 2/4/18.
 */
export class NodeTypes {
  public static readonly NODE_TYPE = {
    LAYOUT: 'layout',
    LAYOUT_COMPONENT_ADD: 'addComponent',
    LAYOUT_COMPONENT_REMOVE: 'removeComponent',
    LAYOUT_LAYOUT_ADD: 'addLayout',
    LAYOUT_LAYOUT_REMOVE: 'removeLayout',
    LAYOUT_TREE: 'tree',
    LAYOUT_GRIDVIEW: 'grid_view',
    LAYOUT_TABS: 'tabs',
    LAYOUT_TAB: 'tab',
    LAYOUT_ACCORDION: 'accordion',
    TOOLBAR_CONFIG: 'toolbarConfig',
    TOOLBAR_CONFIG_REFRESH: 'refresh',
    TOOLBAR_CONFIG_NEW: 'new',
    TOOLBAR_CONFIG_DELETE: 'delete',
    ACTION: 'action',
    ACTION_GROUP: 'action_group',
    BUTTON: 'button',
    BUTTON_GROUP:'button_group',
    BUTTON_EDIT: 'btn_edit',
    BUTTON_DELETE: 'btn_delete',
    BUTTON_ADD: 'btn_add',
    BUTTON_SAVE: 'btn_save',
    BUTTON_CANCEL: 'btn_cancel',
    BUTTON_REFRESH: 'btn_refresh',
    COLUMN_CONFIG: 'columnConfig',
    COLUMN_CONFIG_NEW: 'new',
    COLUMN_CONFIG_REFRESH: 'refresh',
    COLUMN_CONFIG_DELETE: 'delete',
    FIELD: 'field',
    FIELD_EDIT: 'edit',
    FIELD_DELETE: 'delete',
    SORT_CONFIG: 'sortConfig',
    SORT_CONFIG_NEW: 'new',
    SORT_CONFIG_REFRESH: 'refresh',
    SORT_CONFIG_DELETE: 'delete',
    SORT: 'sort',
    SORT_EDIT: 'edit',
    SORT_DELETE: 'delete'
  };
  public static nodeTypes = {
    'tree_view':{'icon': 'fa fa-cog font-green-jungle'},
    'grid_view': {'icon': 'fa fa-table font-green-jungle'},
    'layout': {'icon': 'fa fa-file font-green-jungle'},
    'default': {'icon': 'fa fa-folder icon-state-success'},
    'property': {'icon': 'fa fa-file icon-state-success'},
    'toolbarConfig': {'icon': 'fa fa-laptop font-green'},
    'tabs': {'icon': 'fa fa-laptop font-green'},
    'tab': {'icon': 'fa fa-tag font-green-jungle'},
    'button': {'icon': 'fa fa-square-o font-green-jungle'},
    'button_group':{'icon': 'fa fa-square-o font-green-jungle'},
    'action': {'icon': 'fa fa-square-o font-green-jungle'},
    'action_group': {'icon': 'fa fa-square-o font-green-jungle'},
    'btn_refresh': {'icon': 'fa fa-refresh font-green-jungle'},
    'btn_add': {'icon': 'fa fa-plus font-green-jungle'},
    'btn_delete': {'icon': 'fa fa-trash font-red'},
    'btn_edit': {'icon': 'fa fa-pencil font-green-jungle'},
    'btn_save': {'icon': 'fa fa-save font-blue'},
    'btn_cancel': {'icon': 'fa fa-reply text-muted'},
    'columnConfig': {'icon': 'fa fa-table font-green'},
    'field': {'icon': 'fa fa-columns font-yellow-soft'},
    'sortConfig': {'icon': 'fa fa-sort-amount-asc font-green'},
    'sort': {'icon': 'fa fa-sort font-red-soft'},
    'toolbarStatusConfig': {'icon': 'fa fa-exchange font-green'},
    'buttonState': {'icon': 'fa fa-circle-o font-yellow-soft'},
    'filterConfig': {'icon': 'fa fa-filter font-gery'},
    'filter': {'icon': 'fa fa-column font-orange'},
    'dataSourceAPI': {'icon': 'fa fa-database font-green'},
    'dataSourceItemAPI': {'icon': 'fa fa-cube font-green'},
    'pagingSetting': {'icon': 'fa fa-files-o font-green'},
    'isEnablePaging': {'icon': 'fa fa-dot-circle-o font-green'},
    'checkRight': {'icon': 'fa fa-check-square font-green-jungle'},
    'checkFalse': {'icon': 'fa fa-remove font-red'},
    'checkWarning': {'icon': 'fa fa-warning icon-state-warning'}
  };

  public static layout = {
    'addComponent': {
      'label': '<span class="fa fa-plus font-blue"></span> 添加组件',
      'icon': '',
      'separator_after': false,
      'submenu': {
        'tree': {
          'label': '<span class="fa fa-cog font-green"></span> 树组件',
          'icon': ' ',
          'separator_after': false
        },
        'gridview': {
          'label': '<span class="fa fa-table font-green"></span> 数据网格',
          'icon': ' ',
          'separator_after': false
        }
      }
    },
    'removeComponent': {
      'label': '<span class="fa fa-remove font-red"></span> 移除组件',
      'icon': ' ',
      'separator_after': true
    },
    'addLayout': {
      'label': '<span class="fa fa-refresh font-blue"></span> 添加布局',
      'icon': '',
      'separator_after': false,
      'submenu': {
        'tabs': {
          'label': '<span class="fa fa-plus font-green"></span> 标签页',
          'icon': ' ',
          'separator_after': false
        },
        'accordion': {
          'label': '<span class="fa fa-plus font-green"></span> 折叠面板',
          'icon': ' ',
          'separator_after': false
        }
      }
    },
    'removeLayout': {
      'label': '<span class="fa fa-remove font-red"></span> 移除布局',
      'icon': ' ',
      'separator_after': false
    },
  };

  public static toolbarConfig = {
    'refresh': {
      'label': '<span class="fa fa-refresh font-blue"></span> 刷新',
      'icon': '',
      'separator_after': true
    },
    'new': {
      'label': '<span class="fa fa-plus font-green"></span> 添加按钮',
      'icon': ' ',
      'separator_after': false
    },
    'delete': {
      'label': '<span class="fa fa-remove font-red"></span> 全部删除',
      'icon': ' ',
      'separator_after': false
    },
  };
  public static button = {
    'edit': {
      'label': '<span class="fa fa-edit font-green"></span> 编辑按钮',
      'icon': ' ',
      'separator_after': false
    },
    'delete': {
      'label': '<span class="fa fa-trash font-green"></span> 删除按钮',
      'icon': ' f',
      'separator_after': false
    }
  };
  public static columnConfig = {
    'refresh': {
      'label': '<span class="fa fa-refresh font-green"></span> 刷新',
      'icon': ' ',
      'separator_after': true
    },
    'new': {
      'label': '<span class="fa fa-plus font-green"></span> 添加一列',
      'icon': ' ',
      'separator_after': false
    },
    'delete': {
      'label': '<span class="fa fa-remove font-red"></span> 清空所有列',
      'icon': ' ',
      'separator_after': false
    },
  };
  public static field = {
    'edit': {
      'label': '<span class="fa fa-edit font-green"></span> 编辑列',
      'icon': ' ',
      'separator_after': false
    },
    'delete': {
      'label': '<span class="fa fa-trash font-red"></span> 删除列',
      'icon': ' ',
      'separator_after': false
    }
  };
  public static sortConfig = {
    'refresh': {
      'label': '<span class="fa fa-refresh font-green"></span> 刷新',
      'icon': ' ',
      'separator_after': true
    },
    'new': {
      'label': '<span class="fa fa-plus font-green"></span> 添加排序字段',
      'icon': ' ',
      'separator_after': false
    },
    'delete': {
      'label': '<span class="fa fa-remove font-red"></span> 全部删除',
      'icon': ' ',
      'separator_after': false
    }
  };
  public static sort = {
    'edit': {
      'label': '<span class="fa fa-edit font-green"></span> 编辑排序字段',
      'icon': ' ',
      'separator_after': false
    },
    'delete': {
      'label': '<span class="fa fa-trash font-red"></span> 删除排序字段',
      'icon': ' ',
      'separator_after': false
    }
  };

  public static component_gridview_node = {
    text: '数据网格组件',
    icon: 'fa fa-table',
    li_attr: '',
    a_attr: '',
    parent: '',
    readonly: true,
    value: null,
    state: {
      opened: true,
      disabled: false,
      selected: false,
    },
    type: 'grid_view'
  };
  public static component_tree_node = {
    text: '树组件',
    icon: 'fa fa-tree',
    li_attr: '',
    a_attr: '',
    parent: '',
    readonly: true,
    value: null,
    state: {
      opened: true,
      disabled: false,
      selected: false,
    },
    type: 'tree_view'
  };
  public static component_tabs_node = {};
  public static component_tab_node = {};
  public static component_form_node = {};
  public static component_accordion_node = {};
  public static buttonNode = {
    text: '操作',
    icon: '',
    li_attr: '',
    a_attr: '',
    parent: '',
    readonly: false,
    data: {
      operationLabel: '操作',
      operationName: '',
      operationIcon: '',
      operationType: 'none',
      operationState: 'new',
      operationNoneState: true,
      operationDefaultState: true,
      operationOrder: ''
    },
    state: {
      opened: true,
      disabled: false,
      selected: true,
    }, type: 'button'
  };
  public static fieldNode = {
    text: '列', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_columnConfigs', readonly: true, value: null,
    state: {
      opened: true,
      disabled: false,
      selected: false,
    }, type: 'field'
  };
  public static sortNode = {
    text: '字段', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_sortConfig', readonly: true, value: null,
    state: {
      opened: true,
      disabled: false,
      selected: false,
    }, type: 'sort'
  };
}

export class TreeNode {
  id: string;
  text: string;
  icon: string;
  li_attr: string;
  a_attr: string;
  parent: string;
  readonly: false;
  data: any;
  state: {
    opened: true,
    disabled: true,
    selected: false,
  };
}

export class SettingTreeNodeResource {
  public static settingTreeNode = {
    id: '', text: '', icon: '', li_attr: '', a_attr: '', parent: '', readonly: false, data: {},
    state: {
      opened: true,
      disabled: true,
      selected: false,
    },
    type: ''
  };

  public static settingTreeLayoutNode =  {
    id: '', text: '', icon: 'fa fa-clone icon-state-success', li_attr: '', a_attr: '', parent: '', readonly: true, data: {},
    state: {
      opened: true,
      disabled: true,
      selected: false,
    }
  };
  private _totalArea: any[];
  get totalArea(): any[] {
    return this._totalArea;
  }
  set totalArea(value: any[]) {
    this._totalArea = value;
  }
  constructor(){
    this.totalArea = [
      {
        id: 'masterTemplateConfig', text: '模版布局', icon: 'fa fa-folder icon-state-warning', li_attr: '', a_attr: '', parent: '#', readonly: false, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }
      },
      // totalAreaChildren
      {
        id: 'masterTemplateConfig_classType', text: '布局类型  <span class="badge badge-default">: Layout</span>', icon: 'fa fa-clone icon-state-success', li_attr: '', a_attr: '', parent: 'masterTemplateConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }
      },
      {
        id: 'masterTemplateConfig_parent', text: '布局ID  <span class="badge badge-default">: ID</span>', icon: 'fa fa-paperclip icon-state-success', li_attr: '', a_attr: '', parent: 'masterTemplateConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }
      },
      {
        id: 'masterTemplateConfig_pattern', text: '布局模式  <span class="badge badge-default ">: 1C</span>', icon: 'fa fa-th icon-state-success', li_attr: '', a_attr: '', parent: 'masterTemplateConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }
      },
      // pageConfigs
      {
        id: 'masterTemplateConfig_1_pageConfigs', text: '页面配置', icon: '', li_attr: '', a_attr: '', parent: 'masterTemplateConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }
      },
      // pageConfigsChildren
      {
        id: 'pageConfigs_1_classType', text: '布局类型  <span class="badge badge-default">: Cell</span>', icon: 'fa fa-copy', li_attr: '', a_attr: '', parent: 'masterTemplateConfig_1_pageConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, 'type': 'node'
      },
      {
        id: 'pageConfigs_1_id', text: '布局标志 <span class="badge badge-default">: a</span>', icon: 'fa fa-paperclip', li_attr: '', a_attr: '', parent: 'masterTemplateConfig_1_pageConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }, 'type': 'node'
      },
      {
        id: 'pageConfigs_1_text', text: '标题', icon: 'fa fa-header', li_attr: '', a_attr: '', parent: 'masterTemplateConfig_1_pageConfigs', readonly: false, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, 'type': 'node'
      },
      {
        id: 'pageConfigs_1_header', text: '是否显示标题', icon: 'fa fa-ban', li_attr: '', a_attr: '', parent: 'masterTemplateConfig_1_pageConfigs', readonly: false, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, 'type': 'node'
      },
      {
        id: 'pageConfig_1_pagingBarName', text: '分页对象 <span class="badge badge-default">: pagingBar_1</span>', icon: 'fa fa-flag', li_attr: '', a_attr: '', parent: 'masterTemplateConfig_1_pageConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }, 'type': 'node'
      },
      // viewCfg
      {
        id: 'pageConfigs_1_viewCfg', text: '页面配置', icon: '', li_attr: '', a_attr: '', parent: 'masterTemplateConfig_1_pageConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }
      },
      // viewCfgChildren
      {
        id: 'viewCfg_1_classType', text: '组件名称 <span class="badge badge-default">: GridView</span>', icon: 'fa fa-cogs font-orange', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }, 'type': 'node'
      },
      {
        id: 'viewCfg_1_id', text: '配置标识 <span class="badge badge-default">: a</span>', icon: 'fa fa-paperclip font-orange', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }, 'type': 'node'
      },
      {
        id: 'viewCfg_1_pagingBarName', text: '分页对象 <span class="badge badge-default">: pagingBar_1</span>', icon: 'fa fa-flag', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: true,
          selected: false,
        }
      },
      {
        id: 'viewCfg_1_toolbarsConfig', text: '工具栏设置', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'toolbarConfig'
      },
      // toolbarsConfig child
      {
        id: 'toolbarsConfig_1_new', text: '新增', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_toolbarsConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'button'
      },
      {
        id: 'toolbarsConfig_1_edit', text: '修改', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_toolbarsConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'button'
      },
      {
        id: 'toolbarsConfig_1_delete', text: '删除', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_toolbarsConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'button'
      },
      {
        id: 'toolbarsConfig_1_search', text: '查询', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_toolbarsConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'button'
      },
      {
        id: 'viewCfg_1_columnConfigs', text: '数据列', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'columnConfig'
      },
      // columnConfigs child
      {
        id: 'toolbarsConfig_1_col1', text: '数据列...', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_columnConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'field'
      },
      {
        id: 'toolbarsConfig_1_col2', text: '数据列...', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_columnConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'field'
      },
      {
        id: 'toolbarsConfig_1_col3', text: '数据列...', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_columnConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'field'
      },
      {
        id: 'toolbarsConfig_1_col4', text: '数据列...', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_columnConfigs', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'field'
      },
      {
        id: 'viewCfg_1_columnConfigClass', text: '数据源API', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, 'type': 'dataSourceAPI'
      },
      {
        id: 'viewCfg_1_sortConfig', text: '排序设置', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'sortConfig'
      },
      // sortConfig child
      {
        id: 'toolbarsConfig_1_sort1', text: '名称', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_sortConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'sort'
      },
      {
        id: 'toolbarsConfig_1_sort2', text: '日期', icon: '', li_attr: '', a_attr: '', parent: 'viewCfg_1_sortConfig', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'sort'
      },
      {
        id: 'viewCfg_1_columnConfigItem', text: '数据项API', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, 'type': 'dataSourceItemAPI'
      },
      {
        id: 'viewCfg_1_toolbarsStatusConfig', text: '按钮状态配置', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, type: 'toolbarStatusConfig'
      },
      {
        id: 'viewCfg_1_pagingSetting', text: '分页设置', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, 'type': 'pagingSetting'
      },
      {
        id: 'viewCfg_1_isEnablePaging', text: '是否分页', icon: '', li_attr: '', a_attr: '', parent: 'pageConfigs_1_viewCfg', readonly: true, value: null,
        state: {
          opened: true,
          disabled: false,
          selected: false,
        }, 'type': 'isEnablePaging'
      }
    ];
  }

}

export class OperationSettingNodeTypes {
  public static button_group= {
    'addButton':{
      'label': '添加按钮',
      'icon': 'fa fa-plus',
      'separator_after': false
    }
  };
  public static action_group= {
    'addButton':{
      'label': '添加动作',
      'icon': 'fa fa-plus',
      'separator_after': false
    }
  };
  public static button = {
    'removeButton':{
      'label': '移除按钮',
      'icon': 'fa fa-remove',
      'separator_after': false
    },
  };
  public static action = {
    'removeButton':{
      'label': '移除动作',
      'icon': 'fa fa-remove',
      'separator_after': false
    },
  };
}
