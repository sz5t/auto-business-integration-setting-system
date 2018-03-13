import { CommonUtility } from '../framework/utility/common-utility';
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
                { title: '属性名', width: '100px' },
                { title: '属性值', width: 'auto' }
              ]
            },
            'formContent': [
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
            'relation': [{
              'relationViewId': 'viewId_sqlParam',
              'relationSendContent': [
                {
                  name: 'selectRow', sender: 'viewId_sql', receiver: 'viewId_sqlParam',
                  relationData: { name: 'refreshAsChild' }, data: [{ pid: 'id', cid: 'parentId' }]
                }
              ]
            }],
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
              },
              'addButton': {},
              'keyId': 'id'
            },
            'formContents': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'id',
                'disabled': 'disabled'
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
                    'text': '浏览',
                    'value': 'new'
                  },
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
            'relation': [{
              'relationViewId': 'viewId_sql',
              'relationType': 'grid_grid_child',
              'relationReceiveContent': []
            }],
            'component': 'form_view',
            'formHeader': {
              'header': [
                { title: '参数编号', width: 'auto' },
                { title: '参数名', width: 'auto' },
                { title: '参数替换字符串', width: 'auto' },
                { title: '取值方式', width: 'auto' },
                { title: '为空取值', width: 'auto' },
                { title: '参数类型', width: 'auto' },
                { title: '系统参数', width: 'auto' },
                { title: '取值或赋值字段名', width: 'auto' },
                { title: 'SQ语句编号', width: 'auto' }
              ],
              'deleteButton': {
                'show': true
              },
              'addButton': {}
            },
            'formContents': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'id',
                'helpClass': 'help-inline'
              },
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
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'parentId'
              },
            ]
          }
        ]
      },
      {
        'id': 'tab3',
        'icon': 'fa fa-text',
        'color': 'text-warning',
        'title': '表单设置',
        'active': '',
        'viewCfg': [
          {
            'tabs': [
              {
                'id': 'tab3_1',
                'icon': 'fa fa-text',
                'color': 'text-warning',
                'title': '表单布局',
                'active': 'active in',
                'viewCfg': [
                  {
                    'viewId': 'viewId_formLayout',
                    'component': 'form_view',
                    'formHeader': {
                      'header': [
                        { title: '布局类型', width: 'auto' },
                        { title: '列组数', width: 'auto' },
                      ],
                    },
                    'formContents': [
                      {
                        'type': 'select',
                        'placeholder': '',
                        'options': [
                          {
                            'text': '表格',
                            'value': 'table'
                          },
                          {
                            'text': '流式',
                            'value': 'flow'
                          }
                        ],
                        'name': 'formLayoutType',
                        'value': true,
                        'inputClass': 'input-medium'
                      },
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'formLayoutNum',
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
                  },
                ]
              },
              {
                'id': 'tab3_2',
                'icon': 'fa fa-text',
                'color': 'text-warning',
                'title': 'SQL 语句',
                'active': '',
                'viewCfg': [
                  {
                    'viewId': 'viewId_formSql',
                    'component': 'form_view',
                    'formHeader': {
                      'header': [
                        { title: 'SQL', width: 'auto' }
                      ],
                      'addButton': {}
                    },
                    'formContent': [
                      [
                        {
                          'type': 'codeEditor',
                          'inputType': 'text',
                          'name': 'execSqlStr'
                        }
                      ]
                    ],
                  }
                ]
              },
              {
                'id': 'tab3_3',
                'icon': 'fa fa-text',
                'color': 'text-warning',
                'title': 'SQL 参数',
                'active': '',
                'viewCfg': [
                  {
                    'viewId': 'viewId_formSqlParam',
                    'component': 'form_view',
                    'formHeader': {
                      'header': [
                        { title: '参数编号', width: 'auto' },
                        { title: '参数名', width: 'auto' },
                        { title: '参数替换字符串', width: 'auto' },
                        { title: '取值方式', width: 'auto' },
                        { title: '为空取值', width: 'auto' },
                        { title: '参数类型', width: 'auto' },
                        { title: '系统参数', width: 'auto' },
                        { title: '取值或赋值字段名', width: 'auto' },
                        { title: 'SQ语句编号', width: 'auto' }
                      ],
                      'deleteButton': {
                        'show': true
                      },
                      'addButton': {}
                    },
                    'formContents': [
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'id',
                        'helpClass': 'help-inline'
                      },
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
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'parentId'
                      },
                    ]
                  }
                ]
              },
              {
                'id': 'tab3_4',
                'icon': 'fa fa-text',
                'color': 'text-warning',
                'title': '表单编辑',
                'active': '',
                'viewCfg': [
                  {
                    'viewId': 'viewId_formConfig',
                    'component': 'form_view',
                    'formHeader': {
                      'header': [
                        { title: '输入方式', width: 'auto' },
                        { title: '名称', width: 'auto' },
                        { title: '文本类型', width: 'auto' },
                        { title: '标签', width: 'auto' },
                        { title: '提示信息', width: 'auto' },
                        { title: '默认内容', width: 'auto' },
                        { title: '图标', width: 'auto' },
                        { title: '图标位置', width: 'auto' },
                        { title: '数据来源', width: 'auto' }
                      ],
                      'deleteButton': {
                        'show': true
                      },
                      'addButton': {}
                    },
                    'formContents': [
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'type'
                      },
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'name'
                      },
                      {
                        'type': 'select',
                        'placeholder': '--请选择--',
                        'options': [
                          {
                            'text': '字符',
                            'value': '1'
                          },
                          {
                            'text': '密码',
                            'value': '2'
                          },
                          {
                            'text': '邮箱',
                            'value': '3'
                          },
                          {
                            'text': '电话',
                            'value': '4'
                          },
                          {
                            'text': '链接地址',
                            'value': '5'
                          }
                        ],
                        'name': 'inputType',
                        'value': ''
                      },
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'label'
                      },
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'helpText'
                      },
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'placeholder'
                      },
                      {
                        'type': 'input',
                        'inputType': 'text',
                        'name': 'icon'
                      },
                      {
                        'type': 'select',
                        'placeholder': '--请选择--',
                        'options': [
                          {
                            'text': '左',
                            'value': 'left'
                          },
                          {
                            'text': '右',
                            'value': 'right'
                          },
                        ],
                        'name': 'iconPstn',
                        'value': '',
                        'inputClass': 'input-medium'
                      },
                      {
                        'type': 'select',
                        'placeholder': '--请选择--',
                        'options': [
                          {
                            'text': '数据集',
                            'value': 'left'
                          },
                          {
                            'text': '数据资源',
                            'value': 'right'
                          },
                        ],
                        'name': 'dataFrom',
                        'value': '',
                        'inputClass': 'input-medium'
                      }
                    ]
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        'id': 'tab4',
        'icon': 'fa fa-text',
        'color': 'text-warning',
        'title': '确认操作设置',
        'active': '',
        'viewCfg': [
          {
            'tabs': [
              {
                'id': 'tab4_1',
                'icon': 'fa fa-text',
                'color': 'text-warning',
                'title': '操作内容',
                'active': 'active in',
                'viewCfg': [
                  {
                    'viewId': 'viewId_confirm',
                    'component': 'form_view',
                    'formHeader': {
                      'header': [
                        { title: '属性', width: '100px' },
                        { title: '属性值', width: 'auto' },
                      ],
                    },
                    'formContent': [
                      [
                        {
                          'type': 'label',
                          'label': '消息标题：'
                        },
                        {
                          'type': 'input',
                          'inputType': 'text',
                          'name': 'dialog_title',
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
                          'label': '消息内容：'
                        },
                        {
                          'type': 'input',
                          'inputType': 'text',
                          'name': 'dialog_message',
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
                          'label': '类型：'
                        },
                        {
                          'type': 'select',
                          'placeholder': '',
                          'options': [
                            {
                              'text': '提示操作',
                              'value': 'alter'
                            },
                            {
                              'text': '确认操作',
                              'value': 'confirm'
                            }
                          ],
                          'name': 'dialog_type',
                          'value': true,
                          'inputClass': 'input-medium'
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                'id': 'tab4_2',
                'icon': 'fa fa-text',
                'color': 'text-warning',
                'title': 'SQL',
                'active': '',
                'viewCfg': [
                  {
                    'viewId': 'viewId_confirmSql',
                    'component': 'form_view',
                    'formHeader': {
                      'header': [
                        { title: '属性', width: '100px' },
                        { title: '属性值', width: 'auto' },
                      ],
                    },
                    'formContent': [
                      [
                        {
                          'type': 'label',
                          'label': '布局类型：'
                        },
                        {
                          'type': 'select',
                          'placeholder': '',
                          'options': [
                            {
                              'text': '表格',
                              'value': 'table'
                            },
                            {
                              'text': '流式',
                              'value': 'flow'
                            }
                          ],
                          'name': 'formLayoutType',
                          'value': true,
                          'inputClass': 'input-medium'
                        },
                      ],
                      [
                        {
                          'type': 'label',
                          'label': '列组数：'
                        },
                        {
                          'type': 'input',
                          'inputType': 'text',
                          'name': 'formLayoutNum',
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
                      ]
                    ]
                  }
                ]
              }
            ]
          }


        ]
      },
      {
        'id': 'tab5',
        'icon': 'fa fa-text',
        'color': 'text-warning',
        'title': '后置动作',
        'active': '',
        'viewCfg': [
          {
            'viewId': 'viewId_action',
            'relation': [{
              'relationViewId': 'viewId_actionparameter',
              'relationSendContent': [
                {
                  name: 'selectRow', sender: 'viewId_action', receiver: 'viewId_actionparameter',
                  relationData: { name: 'refreshAsChild' }, data: [{ pid: 'id', cid: 'parentId' }]
                }
              ]
            }],
            'component': 'form_view',
            'formHeader': {
              'header': [
                { title: '编号', width: 'auto' },
                { title: '标识值', width: 'auto' },
                { title: '动作 / 操作', width: 'auto' },
              ],
              'deleteButton': {
                'show': true
              },
              'addButton': {},
              'keyId': 'id'
            },
            'formContents': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'id',
                'disabled': 'disabled'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'actionValue'
              },
              {
                'type': 'select',
                'placeholder': '--请选择--',
                'options': [
                  {
                    'text': '动作1',
                    'value': '1'
                  },
                  {
                    'text': '动作2',
                    'value': '2'
                  },
                  {
                    'text': '动作3',
                    'value': '3'
                  }
                ],
                'name': 'action',
                'value': ''
              }
            ]
          },
          {
            'viewId': 'viewId_actionparameter',
            'relation': [{
              'relationViewId': 'viewId_action',
              'relationType': 'grid_grid_child',
              'relationReceiveContent': []
            }],
            'component': 'form_view',
            'formHeader': {
              'header': [

                { title: '当前参数', width: 'auto' },
                { title: '动作 / 操作参数', width: 'auto' },
                { title: '所属动作/操作编号', width: '130px' }
              ],
              'deleteButton': {
                'show': true
              },
              'addButton': {}
            },
            'formContents': [
              {
                'type': 'select',
                'placeholder': '--请选择--',
                'options': [
                  {
                    'text': '参数1',
                    'value': '1'
                  },
                  {
                    'text': '参数2',
                    'value': '2'
                  },
                  {
                    'text': '参数3',
                    'value': '3'
                  }
                ],
                'name': 'action',
                'value': ''
              },
              {
                'type': 'select',
                'placeholder': '--请选择--',
                'options': [
                  {
                    'text': '参数1',
                    'value': '1'
                  },
                  {
                    'text': '参数2',
                    'value': '2'
                  },
                  {
                    'text': '参数3',
                    'value': '3'
                  }
                ],
                'name': 'action',
                'value': ''
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'parentId'
              }
            ]
          }
        ]
      },
      {
        'id': 'tab6',
        'icon': 'fa fa-text',
        'color': 'text-warning',
        'title': '设置预览',
        'active': '',
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
