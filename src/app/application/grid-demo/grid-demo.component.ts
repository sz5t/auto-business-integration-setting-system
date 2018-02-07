import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cn-grid-demo',
  templateUrl: './grid-demo.component.html',
  styleUrls: ['./grid-demo.component.css']
})
export class GridDemoComponent implements OnInit {
  _config = [
    [
      {
        'title': '（1）单表区域',
        'titleColor': 'font-green',
        'titleIcon': 'fa fa-cogs',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'size': {
          'xsCol': {
            'value': '12',
            'offset': ''
          },
          'smCol': {
            'value': '12',
            'offset': ''
          },
          'mdCol': {
            'value': '12',
            'offset': ''
          },
          'lgCol': {
            'value': '12',
            'offset': ''
          }
        },
        'viewCfg': {
          'viewId': 'area1',
          'component': 'grid_view',
          'classType': 'GridView',
          'toolbarsConfig': [
            {
              'id': 'new',
              'text': '新建',
              'color': 'btn btn-success',
              'img': 'fa fa-plus',
              'type': 'button',
              'events': {
                'title': '新建程序集',
                'eventType': 'form_dialog',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'post',
                  'keyID': '',
                  'callback': ''
                }
              },
              'formConfig': [
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'Name',
                  'label': '程序集名称：',
                  'helpText': '动态读取程序集名称',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select2',
                  'placeholder': '--请选择--',
                  'ajax': {
                    'url': 'DataCategory?_select=Name as text,Id as value'
                  },
                  'name': 'Caption',
                  'label': '中文名称：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'asyndropdown',
                  'placeholder': '--请选择--',
                  'ajax': {
                    'url': 'DataCategory?_select=Name as text,Id as id'
                  },
                  'name': 'Caption',
                  'label': '中文名称：',
                  'value': '',
                  'inputClass': 'input-medium',
                  'multiple': ''
                },
                {
                  'type': 'asyndropdown',
                  'placeholder': '--请选择--',
                  'ajax': {
                    'url': 'DataCategory?_select=Name as text,Id as id'
                  },
                  'name': 'Caption',
                  'label': '中文名称：',
                  'value': '',
                  'inputClass': 'input-large',
                  'multiple': 'multiple'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ContextName',
                  'label': '上下文名称：',
                  'icon': 'fa fa-book',
                  'iconPstn': 'left',
                  'inputClass': 'input-group',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ProviderName',
                  'label': '提供者：',
                  'inputClass': 'input-medium input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'right',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'maxLength',
                      'length': 20,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '编译成功',
                      'value': '编译成功'
                    },
                    {
                      'text': '正在定义',
                      'value': '正在定义'
                    }
                  ],
                  'name': 'BuildState',
                  'label': '编译状态：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '手动',
                      'value': '手动'
                    },
                    {
                      'text': '自动',
                      'value': '自动'
                    }
                  ],
                  'name': 'BuildMode',
                  'label': '编译方式：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'DefaultNamespace',
                  'label': '命名空间：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': '默认为程序编译后提供的命名空间',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'EntitiesName',
                  'label': '实体名称：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': ''
                },
                {
                  'type': 'checkbox',
                  'options': [
                    {
                      'checked': 'checked',
                      'disabled': false,
                      'value': '1',
                      'label': '启用'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '2',
                      'label': '禁用'
                    }
                  ],
                  'name': 'ShareScope',
                  'label': '使用范围：',
                  'inputClass': 'mt-checkbox-inline'
                },
                {
                  'type': 'textarea',
                  'name': 'Remark',
                  'label': '备注：'
                },
                {
                  'type': 'button',
                  'name': 'submit',
                  'disabled': false
                }
              ]
            },
            {
              'id': 'del',
              'text': '删除',
              'color': 'btn btn-success',
              'img': 'fa fa-remove',
              'type': 'button',
              'events': {
                'title': '确认提示',
                'text': '确定要删除选中的记录吗?',
                'eventType': 'confirm_dialog',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'delete',
                  'keyId': 'Id'
                }
              }
            },
            {
              'id': 'sub',
              'text': '提交',
              'color': 'btn btn-success',
              'img': 'fa fa-save',
              'type': 'button',
              'events': {
                'title': '确认提示',
                'text': '是否提交当前数据?',
                'eventType': 'confirm_dialog',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'proc'
                }
              }
            },
            {
              'id': 'modify',
              'text': '修改',
              'color': 'btn btn-success',
              'img': 'fa fa-edit',
              'type': 'button',
              'events': {
                'eventType': 'form_dialog',
                'title': '修改程序集信息',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'put',
                  'keyID': 'Id',
                  'callback': ''
                }
              },
              'formConfig': [
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'Id',
                  'label': 'ID：',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'AssemblyName',
                  'label': '程序集名称：',
                  'helpText': '动态读取程序集名称',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ContextName',
                  'label': '上下文名称：',
                  'icon': 'fa fa-book',
                  'iconPstn': 'left',
                  'inputClass': 'input-group',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ProviderName',
                  'label': '提供者：',
                  'inputClass': 'input-medium input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'right',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'maxLength',
                      'length': 20,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '编译成功',
                      'value': '编译成功'
                    },
                    {
                      'text': '正在定义',
                      'value': '正在定义'
                    }
                  ],
                  'name': 'BuildState',
                  'label': '编译状态：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '手动',
                      'value': '手动'
                    },
                    {
                      'text': '自动',
                      'value': '自动'
                    }
                  ],
                  'name': 'BuildMode',
                  'label': '编译方式：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'DefaultNamespace',
                  'label': '命名空间：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': '默认为程序编译后提供的命名空间',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'maxLength',
                      'length': 20,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'EntitiesName',
                  'label': '实体名称：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': ''
                },
                {
                  'type': 'radio',
                  'options': [
                    {
                      'checked': 'checked',
                      'disabled': false,
                      'value': 'true',
                      'label': '启用'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': 'false',
                      'label': '禁用'
                    }
                  ],
                  'name': 'shareScope',
                  'label': '启用状态：',
                  'inputClass': 'mt-checkbox-inline'
                },
                {
                  'type': 'textarea',
                  'name': 'remark',
                  'label': '备注：'
                },
                {
                  'type': 'button',
                  'name': 'submit',
                  'disabled': false
                }
              ]
            }
          ],
          'ordering': true,
          'paging': true,
          'processing': false,
          'searching': true,
          'deferRender': true,
          'columnConfigClass': 'DynamicResModule',
          'columnFilter': '',
          'autoWidth': true,
          'destroy': true,
          'lengthMenu': [
            5,
            10,
            20,
            30,
            40,
            50,
            100
          ],
          'rowId': 'Id',
          'pagingType': 'full_numbers',
          'pageLength': 5,
          'orderMulti': true,
          'select': true,
          'responsive': true,
          'columnDefs': [
            {
              'targets': 0,
              'orderable': false
            }
          ],
          'dom': 'Bfr<"table-scrollable"t>ip',
          'columnConfigs': [
            {
              'title': '',
              'data': 'Id',
              'renderName': {
                'type': 'checkAll'
              },
              'className': 'text-center'
            },
            {
              'title': '共享范围',
              'data': 'ShareScope',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '程序集名称',
              'data': 'AssemblyName',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '编译状态',
              'data': 'BuildState',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '编译方式',
              'data': 'BuildMode',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '错误消息',
              'data': 'ErrorMessage',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '编译消息',
              'data': 'BuildMessage',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '上下文名称',
              'data': 'ContextName',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '提供者',
              'data': 'ProviderName',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '默认命名空间',
              'data': 'DefaultNamespace',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '客户编号',
              'data': 'PlatCustomerId'
            },
            {
              'title': '创建时间',
              'data': 'CreateTime',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            }
          ]
        }
      },
    ],
    [
      {
        'title': '（2）主表区域',
        'titleColor': 'font-green',
        'titleIcon': 'fa fa-cogs',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'size': {
          'xsCol': {
            'value': '12',
            'offset': ''
          },
          'smCol': {
            'value': '12',
            'offset': ''
          },
          'mdCol': {
            'value': '12',
            'offset': ''
          },
          'lgCol': {
            'value': '12',
            'offset': ''
          }
        },
        'viewCfg': {
          'viewId': 'area1',
          'component': 'grid_view',
          'classType': 'GridView',
          'toolbarsConfig': [
            {
              'id': 'new',
              'text': '新建',
              'color': 'btn btn-success',
              'img': 'fa fa-plus',
              'type': 'button',
              'events': {
                'title': '新建程序集',
                'eventType': 'form_dialog',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'post',
                  'keyID': '',
                  'callback': ''
                }
              },
              'formConfig': [
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'Name',
                  'label': '程序集名称：',
                  'helpText': '动态读取程序集名称',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select2',
                  'placeholder': '--请选择--',
                  'ajax': {
                    'url': 'DataCategory?_select=Name as text,Id as value'
                  },
                  'name': 'Caption',
                  'label': '中文名称：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'asyndropdown',
                  'placeholder': '--请选择--',
                  'ajax': {
                    'url': 'DataCategory?_select=Name as text,Id as id'
                  },
                  'name': 'Caption',
                  'label': '中文名称：',
                  'value': '',
                  'inputClass': 'input-medium',
                  'multiple': ''
                },
                {
                  'type': 'asyndropdown',
                  'placeholder': '--请选择--',
                  'ajax': {
                    'url': 'DataCategory?_select=Name as text,Id as id'
                  },
                  'name': 'Caption',
                  'label': '中文名称：',
                  'value': '',
                  'inputClass': 'input-large',
                  'multiple': 'multiple'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ContextName',
                  'label': '上下文名称：',
                  'icon': 'fa fa-book',
                  'iconPstn': 'left',
                  'inputClass': 'input-group',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ProviderName',
                  'label': '提供者：',
                  'inputClass': 'input-medium input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'right',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'maxLength',
                      'length': 20,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '编译成功',
                      'value': '编译成功'
                    },
                    {
                      'text': '正在定义',
                      'value': '正在定义'
                    }
                  ],
                  'name': 'BuildState',
                  'label': '编译状态：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '手动',
                      'value': '手动'
                    },
                    {
                      'text': '自动',
                      'value': '自动'
                    }
                  ],
                  'name': 'BuildMode',
                  'label': '编译方式：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'DefaultNamespace',
                  'label': '命名空间：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': '默认为程序编译后提供的命名空间',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'EntitiesName',
                  'label': '实体名称：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': ''
                },
                {
                  'type': 'checkbox',
                  'options': [
                    {
                      'checked': 'checked',
                      'disabled': false,
                      'value': '1',
                      'label': '启用'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '2',
                      'label': '禁用'
                    }
                  ],
                  'name': 'ShareScope',
                  'label': '使用范围：',
                  'inputClass': 'mt-checkbox-inline'
                },
                {
                  'type': 'textarea',
                  'name': 'Remark',
                  'label': '备注：'
                },
                {
                  'type': 'button',
                  'name': 'submit',
                  'disabled': false
                }
              ]
            },
            {
              'id': 'del',
              'text': '删除',
              'color': 'btn btn-success',
              'img': 'fa fa-remove',
              'type': 'button',
              'events': {
                'title': '确认提示',
                'text': '确定要删除选中的记录吗?',
                'eventType': 'confirm_dialog',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'delete',
                  'keyId': 'Id'
                }
              }
            },
            {
              'id': 'sub',
              'text': '提交',
              'color': 'btn btn-success',
              'img': 'fa fa-save',
              'type': 'button',
              'events': {
                'title': '确认提示',
                'text': '是否提交当前数据?',
                'eventType': 'confirm_dialog',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'proc'
                }
              }
            },
            {
              'id': 'modify',
              'text': '修改',
              'color': 'btn btn-success',
              'img': 'fa fa-edit',
              'type': 'button',
              'events': {
                'eventType': 'form_dialog',
                'title': '修改程序集信息',
                'execution': {
                  'api': 'DynamicResModule',
                  'method': 'put',
                  'keyID': 'Id',
                  'callback': ''
                }
              },
              'formConfig': [
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'Id',
                  'label': 'ID：',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'AssemblyName',
                  'label': '程序集名称：',
                  'helpText': '动态读取程序集名称',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ContextName',
                  'label': '上下文名称：',
                  'icon': 'fa fa-book',
                  'iconPstn': 'left',
                  'inputClass': 'input-group',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'ProviderName',
                  'label': '提供者：',
                  'inputClass': 'input-medium input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'right',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'maxLength',
                      'length': 20,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '编译成功',
                      'value': '编译成功'
                    },
                    {
                      'text': '正在定义',
                      'value': '正在定义'
                    }
                  ],
                  'name': 'BuildState',
                  'label': '编译状态：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '手动',
                      'value': '手动'
                    },
                    {
                      'text': '自动',
                      'value': '自动'
                    }
                  ],
                  'name': 'BuildMode',
                  'label': '编译方式：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'DefaultNamespace',
                  'label': '命名空间：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': '默认为程序编译后提供的命名空间',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'maxLength',
                      'length': 20,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'EntitiesName',
                  'label': '实体名称：',
                  'inputClass': 'input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'left',
                  'helpClass': 'help-inline',
                  'helpText': ''
                },
                {
                  'type': 'radio',
                  'options': [
                    {
                      'checked': 'checked',
                      'disabled': false,
                      'value': 'true',
                      'label': '启用'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': 'false',
                      'label': '禁用'
                    }
                  ],
                  'name': 'shareScope',
                  'label': '启用状态：',
                  'inputClass': 'mt-checkbox-inline'
                },
                {
                  'type': 'textarea',
                  'name': 'remark',
                  'label': '备注：'
                },
                {
                  'type': 'button',
                  'name': 'submit',
                  'disabled': false
                }
              ]
            }
          ],
          'ordering': true,
          'paging': true,
          'processing': false,
          'searching': true,
          'deferRender': true,
          'columnConfigClass': 'DynamicResModule',
          'columnFilter': '',
          'autoWidth': true,
          'destroy': true,
          'lengthMenu': [
            5,
            10,
            20,
            30,
            40,
            50,
            100
          ],
          'rowId': 'Id',
          'pagingType': 'full_numbers',
          'pageLength': 5,
          'orderMulti': true,
          'select': true,
          'responsive': true,
          'columnDefs': [
            {
              'targets': 0,
              'orderable': false
            }
          ],
          'dom': 'Bfr<"table-scrollable"t>ip',
          'columnConfigs': [
            {
              'title': '',
              'data': 'Id',
              'renderName': {
                'type': 'checkAll'
              },
              'className': 'text-center'
            },
            {
              'title': '共享范围',
              'data': 'ShareScope',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '程序集名称',
              'data': 'AssemblyName',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '编译状态',
              'data': 'BuildState',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '编译方式',
              'data': 'BuildMode',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '错误消息',
              'data': 'ErrorMessage',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '编译消息',
              'data': 'BuildMessage',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '上下文名称',
              'data': 'ContextName',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '提供者',
              'data': 'ProviderName',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '默认命名空间',
              'data': 'DefaultNamespace',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '客户编号',
              'data': 'PlatCustomerId'
            },
            {
              'title': '创建时间',
              'data': 'CreateTime',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            }
          ]
        }
      },
      {
        'title': '（3）子表区域',
        'titleColor': 'font-green',
        'titleIcon': 'fa fa-cogs',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'size': {
          'xsCol': {
            'value': '12',
            'offset': ''
          },
          'smCol': {
            'value': '12',
            'offset': ''
          },
          'mdCol': {
            'value': '12',
            'offset': ''
          },
          'lgCol': {
            'value': '12',
            'offset': ''
          }
        },
        'viewCfg': {
          'viewId': 'area2',
          'parentViewId': 'area1',
          'component': 'grid_view',
          'classType': 'GridView',
          'toolbarsConfig': [
            {
              'id': 'new',
              'text': '新建',
              'color': 'green-jungle',
              'img': 'fa fa-plus',
              'type': 'button',
              'events': {
                'eventType': 'form_dialog',
                'execution': {
                  'api': 'ResourceType',
                  'method': 'get',
                  'keyID': '',
                  'callback': ''
                }
              },
              'formConfig': [
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'Name',
                  'label': '资源名称：',
                  'helpText': '资源编译后自动生成',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'OwnerNameSpace',
                  'label': '命名空间：',
                  'icon': 'fa fa-book',
                  'iconPstn': 'left',
                  'inputClass': 'input-group',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'OwnerAssembly',
                  'label': '程序集：',
                  'inputClass': 'input-medium input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'right',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '编译成功',
                      'value': '编译成功'
                    },
                    {
                      'text': '正在定义',
                      'value': '正在定义'
                    }
                  ],
                  'name': 'BuildState',
                  'label': '编译状态：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '手动',
                      'value': '手动'
                    },
                    {
                      'text': '自动',
                      'value': '自动'
                    }
                  ],
                  'name': 'BuildMode',
                  'label': '编译方式：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'radio',
                  'options': [
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '1',
                      'label': '独立'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '2',
                      'label': '共享'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '3',
                      'label': '指定区域'
                    }
                  ],
                  'name': 'ShareScope',
                  'label': '使用范围：',
                  'inputClass': 'mt-radio-list'
                },
                {
                  'type': 'textarea',
                  'name': 'Note',
                  'label': '备注：'
                },
                {
                  'type': 'button',
                  'name': 'submit'
                }
              ]
            },
            {
              'id': 'del',
              'text': '删除',
              'color': 'red',
              'img': 'fa fa-remove',
              'type': 'button',
              'events': {
                'title': '确认提示',
                'text': '确定要删除选中的记录吗?',
                'eventType': 'confirm_dialog',
                'execution': {
                  'api': 'ResourceType',
                  'method': 'delete',
                  'keyId': 'RtId'
                }
              }
            },
            {
              'id': 'sub',
              'text': '提交',
              'color': 'green',
              'img': 'fa fa-save',
              'type': 'button',
              'events': {
                'title': '确认提示',
                'text': '是否提交当前数据?',
                'eventType': 'confirm_dialog',
                'execution': {
                  'api': 'ResourceType',
                  'method': 'proc'
                }
              }
            },
            {
              'id': 'modify',
              'text': '修改',
              'color': 'yellow',
              'img': 'fa fa-edit',
              'type': 'button',
              'events': {
                'eventType': 'form_dialog',
                'execution': {
                  'api': 'ResourceType',
                  'method': 'put',
                  'keyID': 'RtId',
                  'callback': ''
                }
              },
              'formConfig': [
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'Name',
                  'label': '资源名称：',
                  'helpText': '资源编译后自动生成',
                  'inputClass': 'input-inline input-medium',
                  'placeholder': '例如：Company.cn.app',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'OwnerNameSpace',
                  'label': '命名空间：',
                  'icon': 'fa fa-book',
                  'iconPstn': 'left',
                  'inputClass': 'input-group',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'input',
                  'inputType': 'text',
                  'name': 'OwnerAssembly',
                  'label': '程序集：',
                  'inputClass': 'input-medium input-group',
                  'icon': 'fa fa-bookmark-o',
                  'iconPstn': 'right',
                  'helpClass': 'help-inline',
                  'validations': [
                    {
                      'validator': 'required',
                      'errorMessage': ''
                    },
                    {
                      'validator': 'minLength',
                      'length': 6,
                      'errorMessage': ''
                    }
                  ]
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '编译成功',
                      'value': '编译成功'
                    },
                    {
                      'text': '正在定义',
                      'value': '正在定义'
                    }
                  ],
                  'name': 'BuildState',
                  'label': '编译状态：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'select',
                  'placeholder': '--请选择--',
                  'options': [
                    {
                      'text': '手动',
                      'value': '手动'
                    },
                    {
                      'text': '自动',
                      'value': '自动'
                    }
                  ],
                  'name': 'BuildMode',
                  'label': '编译方式：',
                  'value': '',
                  'inputClass': 'input-medium'
                },
                {
                  'type': 'radio',
                  'options': [
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '1',
                      'label': '独立'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '2',
                      'label': '共享'
                    },
                    {
                      'checked': '',
                      'disabled': false,
                      'value': '3',
                      'label': '指定区域'
                    }
                  ],
                  'name': 'ShareScope',
                  'label': '使用范围：',
                  'inputClass': 'mt-radio-list'
                },
                {
                  'type': 'textarea',
                  'name': 'Note',
                  'label': '备注：'
                },
                {
                  'type': 'button',
                  'name': 'submit'
                }
              ]
            }
          ],
          'ordering': true,
          'paging': true,
          'processing': false,
          'searching': true,
          'deferRender': true,
          'columnConfigClass': 'ResourceType',
          'columnFilter': '',
          'autoWidth': false,
          'destroy': true,
          'lengthMenu': [
            5,
            10,
            20,
            30,
            40,
            50,
            100
          ],
          'rowId': 'RtId',
          'pagingType': 'numbers',
          'pageLength': 5,
          'orderMulti': true,
          'select': true,
          'responsive': true,
          'columnDefs': [
            {
              'targets': 0,
              'orderable': false
            }
          ],
          'dom': 'Bfr<"table-scrollable"t>ip',
          'columnConfigs': [
            {
              'title': '',
              'data': 'Id',
              'renderName': {
                'type': 'checkAll'
              },
              'className': 'text-center'
            },
            {
              'title': '资源名称',
              'data': 'Name',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '命名空间',
              'data': 'OwnerNameSpace',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '程序集',
              'data': 'OwnerAssembly',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': '共享范围',
              'data': 'ShareScope'
            },
            {
              'title': '错误消息',
              'data': 'BuildMode',
              'renderName': {
                'type': 'notNull',
                'data': {}
              }
            },
            {
              'title': ' 编译状态',
              'data': 'BuildState',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '表类型',
              'data': 'TableType',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '备注',
              'data': 'Note',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': '客户编号',
              'data': 'PlatCustomerId',
              'renderName': {
                'type': 'notNull'
              }
            },
            {
              'title': 'DrmId',
              'data': 'DrmId'
            }
          ],
          'filterConfig': [
            {
              'classType': 'SFDW_Classes.TEntityLink',
              'masterClass': 'DynamicResModule',
              'slaveClass': 'ResourceType',
              'propLinks': [
                {
                  'classType': 'SFDW_Classes.TPropertyLink',
                  'masterProp': 'PlatCustomerId',
                  'slaveProp': 'PlatCustomerId'
                },
                {
                  'classType': 'SFDW_Classes.TPropertyLink',
                  'masterProp': 'Id',
                  'slaveProp': 'DrmId'
                }
              ]
            }
          ]
        }
      }
    ]
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
