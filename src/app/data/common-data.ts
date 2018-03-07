import {CommonUtility} from "../framework/utility/common-utility";
export class CommonData {
  public static OPERATION_TYPE = {
    none: 'none',
    refresh: 'refresh',
    exec_sql: 'exec_sql',
    after_SQL: 'after_sql',
    form: 'form',
    confirm: 'confirm',
    dialog: 'dialog',
    window: 'window',
    refresh_parent: 'refresh_parent'
  };



  /**
   * 1、tab页中是否嵌套布局和组件
   * 2、如何配置组件的操作和交互的实现
   * @type {{none: {}; refresh: {tabs: [{id: string; icon: string; color: string; title: string; active: string; viewCfg: {editorHeader: {header: [{title: string; width: string},{title: string; width: string}]; deletebutton: {show: boolean}}; editorContent: [({type: string; label: string}|{type: string; inputType: string; name: string; helpText: string; inputClass: string; placeholder: string; helpClass: string; validations: {validator: string; errorMessage: string}[]})[],({type: string; label: string}|{type: string; inputType: string; name: string; helpText: string; inputClass: string; placeholder: string; helpClass: string; validations: {validator: string; errorMessage: string}[]})[],({type: string; label: string}|{type: string; inputType: string; name: string; helpText: string; inputClass: string; placeholder: string; helpClass: string})[],({type: string; label: string}|{type: string; options: ({text: string; value: string}|{text: string; value: string}|{text: string; value: string}|{text: string; value: string}|{text: string; value: string}|{text: string; value: string}|{text: string; value: string}|{text: string; value: string})[]; name: string; value: string; inputClass: string})[],({type: string; label: string}|{type: string; placeholder: string; options: ({text: string; value: string}|{text: string; value: string}|{text: string; value: string})[]; name: string; value: string; inputClass: string})[],({type: string; label: string}|{type: string; placeholder: string; options: ({text: string; value: boolean}|{text: string; value: boolean})[]; name: string; value: boolean; inputClass: string})[],({type: string; label: string}|{type: string; placeholder: string; options: ({text: string; value: boolean}|{text: string; value: boolean})[]; name: string; value: boolean; inputClass: string})[],({type: string; label: string}|{type: string; inputType: string; name: string; helpText: string; inputClass: string; placeholder: string; helpClass: string})[]]; data: {}}}]}; exec_sql: {tabs: [{},{},{}]}; after_SQL: {tabs: [{},{},{}]}; form: {tabs: [{},{}]}; confirm: {tabs: [{},{}]}; dialog: {tabs: [{},{}]}; window: {tabs: [{},{}]}; refresh_parent: {tabs: [{},{}]}}}
   */
  public static OPERATION_TYPE_DATA =
  [
    {
      'id': 'tab1',
      'icon': 'fa fa-text',
      'color': 'text-warning',
      'title': '操作设置',
      'active': 'active in',
      'viewCfg': [
        {
          'viewId': 'viewId_property',
          'component': 'form_view',
          'formHeader': {
            header: [
              {title: '属性名', width: '100px'},
              {title: '属性值', width: 'auto'}
            ]
          },
          'formContent':
            [
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
            ]
        }
      ]
    },
    {
      'id': 'tab2',
      'icon': 'fa fa-text',
      'color': 'text-warning',
      'title': '【SQL 语句】',
      'active': '',
      'viewCfg': [
        {
          'viewId': 'viewId_sql',
          'component': 'form_view',
          'formHeader': {
            'header': [
              { title: '编号', width: 'auto' },
              { title: 'SQL语句', width: 'auto' },
              { title: '执行方式', width: 'auto' },
              { title: '执行状态', width: 'auto' },
            ],
            'deleteButton': {
              'show': true
            }
          },
          'formContents': [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'execSqlId'
            },
            {
              'type': 'codeEditor',
              'inputType': 'text',
              'name': 'execSqlStr'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '执行一次',
                  'value': '1'
                },
                {
                  'text': '执行两次',
                  'value': '2'
                }
              ],
              'name': 'execSqlMethod',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'select',
              'placeholder': '--请选择--',
              'options': [
                {
                  'text': '新增状态',
                  'value': 'new'
                },
                {
                  'text': '更新状态',
                  'value': 'modify'
                }
              ],
              'name': 'execSqlStatus',
              'value': '',
              'inputClass': 'input-medium'
            }
          ]
        },
        {
          'viewId': 'viewId_sqlParam',
          'component': 'form_view',
          'formHeader': {
            'header': [
              { title: '参数名', width: 'auto' },
              { title: '参数替换字符串', width: 'auto' },
              { title: '取值方式', width: 'auto' },
              { title: '为空取值', width: 'auto' },
              { title: '参数类型', width: 'auto' },
              { title: '系统参数', width: 'auto' },
              { title: '取值或赋值字段名', width: 'auto' }
            ],
            'deleteButton': {
              'show': true
            }
          },
          'formContents': [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'paramName',
              'helpClass': 'help-inline'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'paramReplaceStr'
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
              'name': 'paramValueFrom',
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
              'name': 'paramNullValue',
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
              'name': 'paramDataType',
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
              'name': 'paramFromSystem',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'paramValueField'
            },
          ]
        }
      ]
    }
  ];

    /*none: {},
    refresh: {
      tabs:
    },*/
   /* exec_sql: {
      tabs:[
        {},
        {},
        {}
      ]
    },
    after_SQL: {
      tabs:[
        {},
        {},
        {}
      ]
    },
    form: {
      tabs:[
        {},
        {}
      ]
    },
    confirm: {
      tabs:[
        {},
        {}
      ]
    },
    dialog: {
      tabs:[
        {},
        {}
      ]
    },
    window: {
      tabs:[
        {},
        {}
      ]
    },
    refresh_parent: {
      tabs:[
        {},
        {}
      ]
    }*/
  operation_exec_sql_data = {};
  operation_form_data = {};
  operation_window_data = {};
  operation_dialog_data = {};

}
