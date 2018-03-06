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
  public static OPERATION_TYPE_DATA = {
    none: {},
    refresh: {
      tabs:[
        {
          'id': 'tab1',
          'icon': 'fa fa-text',
          'color': 'text-warning',
          'title': '【SQL 语句】',
          'active': 'active in',
          'viewCfg': [
            {
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
              'formContent': [
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'execSqlId'
                },
                {
                  'type': 'input',
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
              'formContent': [
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
      ]
    },
    exec_sql: {
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
    }
  };
  operation_exec_sql_data = {};
  operation_form_data = {};
  operation_window_data = {};
  operation_dialog_data = {};

}
