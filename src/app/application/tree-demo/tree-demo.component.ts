import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cn-tree-demo',
  templateUrl: './tree-demo.component.html',
  styleUrls: ['./tree-demo.component.css']
})
export class TreeDemoComponent implements OnInit {
  _config = [
    [
      {
        'title': '（4）树区域',
        'titleColor': 'font-blue',
        'titleIcon': 'fa fa-bars',
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
            'value': '3',
            'offset': ''
          },
          'lgCol': {
            'value': '3',
            'offset': ''
          }
        },
        'viewCfg': {
          'viewId': 'areaTree',
          'component': 'tree_view',
          'classType': 'tree',
          'rootConfigs': [
            {
              'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
              'img': 'fa fa-list green',
              'entityClass': 'AppUser',
              'localCreate': false,
              'readOnly': false,
              'columnConfigsClass': 'AppUser',
              'enabled': false,
              'textKey': 'Name',
              'idKey': 'Id'
            },
            {
              'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
              'nodeText': '公用资源',
              'img': 'fa fa-list green',
              'nodeTypes': [
                {
                  'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'nodeText': '动态资源',
                  'nodeTypes': [
                    {
                      'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                      'img': '',
                      'entityClass': 'DynamicResModule',
                      'localCreate': false,
                      'readOnly': false,
                      'columnConfigsClass': 'DynamicResModule',
                      'enabled': true,
                      'textKey': 'Name',
                      'idKey': 'Id'
                    }
                  ],
                  'pageConfigs': [
                    {
                      'title': '标题',
                      'titleColor': 'blue',
                      'icon': '',
                      'isFullScreen': true,
                      'isCollapse': true,
                      'size': {
                        'xs': {
                          'value': '12',
                          'offset': ''
                        },
                        'sm': {
                          'value': '12',
                          'offset': ''
                        },
                        'md': {
                          'value': '12',
                          'offset': ''
                        },
                        'lg': {
                          'value': '12',
                          'offset': ''
                        }
                      },
                      'viewCfg': {
                        'viewId': 'area1_1',
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
                                'name': 'shareScope',
                                'label': '使用范围：',
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
                    }
                  ],
                  'localCreate': false,
                  'readOnly': false,
                  'enabled': true
                }
              ],
              'entityClass': '公用资源',
              'localCreate': false,
              'readOnly': false,
              'columnConfigsClass': '公用资源',
              'enabled': true
            },
            {
              'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
              'nodeText': '客户 — 项目',
              'img': 'fa fa-list green',
              'nodeTypes': [
                {
                  'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                  'entityClass': 'PlatformCustomer',
                  'img': 'fa fa-list green',
                  'textKey': 'Name',
                  'idKey': 'Id',
                  'parameters': [
                    '_includeRoot=True'
                  ],
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': 'PlatformCustomer',
                  'enabled': true
                }
              ],
              'entityClass': '客户 — 项目',
              'localCreate': false,
              'readOnly': false,
              'columnConfigsClass': '客户 — 项目',
              'enabled': true
            }
          ],
          'childConfigList': [
            {
              'classType': 'SFDW_Classes.TTreeNodeChildrenConfig',
              'img': 'fa fa-list green',
              'nodeTypes': [
                {
                  'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'filters': [
                    {
                      'classType': 'SFDW_Classes.TEntityLink',
                      'masterClass': 'PlatformCustomer',
                      'slaveClass': 'AppProject',
                      'propLinks': [
                        {
                          'classType': 'SFDW_Classes.TPropertyLink',
                          'masterProp': 'Id',
                          'slaveProp': 'PlatCustomerId'
                        }
                      ]
                    }
                  ],
                  'entityClass': 'AppProject',
                  'parameters': [
                    '_customers=~ParentId~'
                  ],
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': 'AppProject',
                  'enabled': true,
                  'textKey': 'Name',
                  'idKey': 'Id'
                },
                {
                  'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'nodeText': '（企业公共资源）',
                  'nodeTypes': [
                    {
                      'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
                      'img': 'fa fa-list green',
                      'nodeText': '（数据分类）',
                      'nodeTypes': [
                        {
                          'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                          'img': 'fa fa-list green',
                          'filters': [
                            {
                              'classType': 'SFDW_Classes.TEntityLink',
                              'masterClass': 'PlatformCustomer',
                              'slaveClass': 'DataCategory',
                              'propLinks': [
                                {
                                  'classType': 'SFDW_Classes.TPropertyLink',
                                  'masterProp': 'Id',
                                  'slaveProp': 'PlatCustomerId'
                                }
                              ]
                            }
                          ],
                          'entityClass': 'DataCategory',
                          'localCreate': false,
                          'readOnly': false,
                          'columnConfigsClass': 'DataCategory',
                          'enabled': true,
                          'textKey': 'Name',
                          'idKey': 'Id'
                        }
                      ],
                      'entityClass': '（数据分类）',
                      'localCreate': false,
                      'readOnly': false,
                      'columnConfigsClass': '（数据分类）',
                      'enabled': true
                    },
                    {
                      'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
                      'img': 'fa fa-list green',
                      'nodeText': '组织机构',
                      'entityClass': '组织机构',
                      'localCreate': false,
                      'readOnly': false,
                      'columnConfigsClass': '组织机构',
                      'enabled': true,
                      'Tag': 101001
                    }
                  ],
                  'entityClass': '（企业公共资源）',
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': '（企业公共资源）',
                  'enabled': true
                }
              ],
              'entityClass': 'PlatformCustomer',
              'localCreate': false,
              'readOnly': false,
              'columnConfigsClass': 'PlatformCustomer',
              'enabled': true
            },
            {
              'classType': 'SFDW_Classes.TTreeNodeChildrenConfig',
              'img': 'fa fa-list green',
              'nodeTypes': [
                {
                  'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'nodeText': '(资源模块)',
                  'nodeTypes': [
                    {
                      'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                      'img': 'fa fa-list green',
                      'filters': [
                        {
                          'classType': 'SFDW_Classes.TEntityLink',
                          'masterClass': 'AppProject',
                          'slaveClass': 'DynamicResModule',
                          'propLinks': [
                            {
                              'classType': 'SFDW_Classes.TPropertyLink',
                              'masterProp': 'PlatCustomerId',
                              'slaveProp': 'PlatCustomerId'
                            }
                          ]
                        }
                      ],
                      'entityClass': 'DynamicResModule',
                      'Parameters': [
                        'OwnerId=~ParentId~'
                      ],
                      'localCreate': false,
                      'readOnly': false,
                      'columnConfigsClass': 'DynamicResModule',
                      'enabled': true,
                      'textKey': 'AssemblyName',
                      'idKey': 'DrmId'
                    }
                  ],
                  'entityClass': '(资源模块)',
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': '(资源模块)',
                  'enabled': true
                },
                {
                  'classType': 'SFDW_Classes.TStaticTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'nodeText': '(数据分类)',
                  'nodeTypes': [
                    {
                      'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                      'img': 'fa fa-list green',
                      'filters': [
                        {
                          'classType': 'SFDW_Classes.TEntityLink',
                          'masterClass': 'AppProject',
                          'slaveClass': 'DataCategory',
                          'propLinks': [
                            {
                              'classType': 'SFDW_Classes.TPropertyLink',
                              'masterProp': 'PlatCustomerId',
                              'slaveProp': 'PlatCustomerId'
                            },
                            {
                              'classType': 'SFDW_Classes.TPropertyLink',
                              'masterProp': 'ProjId',
                              'slaveProp': 'ParentId'
                            }
                          ]
                        }
                      ],
                      'entityClass': 'DataCategory',
                      'localCreate': false,
                      'readOnly': false,
                      'columnConfigsClass': 'DataCategory',
                      'enabled': true,
                      'textKey': 'Name',
                      'idKey': 'Id'
                    }
                  ],
                  'entityClass': '(数据分类)',
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': '(数据分类)',
                  'enabled': true
                }
              ],
              'entityClass': 'AppProject',
              'localCreate': false,
              'readOnly': false,
              'columnConfigsClass': 'AppProject',
              'enabled': true,
              'textKey': 'Name',
              'idKey': 'Id'
            },
            {
              'classType': 'SFDW_Classes.TTreeNodeChildrenConfig',
              'img': 'fa fa-list green',
              'nodeTypes': [
                {
                  'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'filters': [
                    {
                      'classType': 'SFDW_Classes.TEntityLink',
                      'masterClass': 'DataCategory',
                      'slaveClass': 'DataCategory',
                      'propLinks': [
                        {
                          'classType': 'SFDW_Classes.TPropertyLink',
                          'masterProp': 'Id',
                          'slaveProp': 'ParentId'
                        },
                        {
                          'classType': 'SFDW_Classes.TPropertyLink',
                          'masterProp': 'PlatCustomerId',
                          'slaveProp': 'PlatCustomerId'
                        }
                      ]
                    }
                  ],
                  'entityClass': 'DataCategory',
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': 'DataCategory',
                  'enabled': true,
                  'textKey': 'Name',
                  'idKey': 'Id'
                },
                {
                  'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'filters': [
                    {
                      'classType': 'SFDW_Classes.TEntityLink',
                      'masterClass': 'DataCategory',
                      'slaveClass': 'EntityDefine',
                      'propLinks': [
                        {
                          'classType': 'SFDW_Classes.TPropertyLink',
                          'masterProp': 'OwnerId',
                          'slaveProp': 'OwnerId'
                        },
                        {
                          'classType': 'SFDW_Classes.TPropertyLink',
                          'masterProp': 'PlatCustomerId',
                          'slaveProp': 'PlatCustomerId'
                        }
                      ]
                    }
                  ],
                  'entityClass': 'EntityDefine',
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': 'EntityDefine',
                  'enabled': true,
                  'textKey': 'Name',
                  'idKey': 'Id'
                }
              ],
              'entityClass': 'DataCategory',
              'localCreate': false,
              'readOnly': false,
              'columnConfigsClass': 'DataCategory',
              'enabled': true,
              'textKey': 'Name',
              'idKey': 'Id'
            },
            {
              'classType': 'SFDW_Classes.TTreeNodeChildrenConfig',
              'img': 'fa fa-list green',
              'entityClass': 'DynamicResModule',
              'localCreate': false,
              'readOnly': false,
              'columnConfigsClass': 'DynamicResModule',
              'enabled': true,
              'textKey': 'Name',
              'idKey': 'Id',
              'nodeTypes': [
                {
                  'classType': 'SFDW_Classes.TDynaTreeNodeConfig',
                  'img': 'fa fa-list green',
                  'filters': [
                    {
                      'classType': 'SFDW_Classes.TEntityLink',
                      'masterClass': 'DynamicResModule',
                      'slaveClass': 'ResourceType',
                      'propLinks': [
                        {
                          'classType': 'SFDW_Classes.TPropertyLink',
                          'masterProp': 'Id',
                          'slaveProp': 'DrmId'
                        }
                      ]
                    }
                  ],
                  'entityClass': 'ResourceType',
                  'parameters': [
                    '_customers=~ParentId~'
                  ],
                  'localCreate': false,
                  'readOnly': false,
                  'columnConfigsClass': 'ResourceType',
                  'enabled': true,
                  'textKey': 'Name',
                  'idKey': 'Id'
                }
              ],
              'pageConfigs': [
                {
                  'title': '标题',
                  'titleColor': 'blue',
                  'icon': '',
                  'isFullScreen': true,
                  'isCollapse': true,
                  'size': {
                    'xs': {
                      'value': '12',
                      'offset': ''
                    },
                    'sm': {
                      'value': '12',
                      'offset': ''
                    },
                    'md': {
                      'value': '12',
                      'offset': ''
                    },
                    'lg': {
                      'value': '12',
                      'offset': ''
                    }
                  },
                  'viewCfg': {
                    'viewId': 'area2_2',
                    'parentViewId': 'areaTree',
                    'component': 'grid_multi_view',
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
            }
          ]
        }
      },
      {
        'title': '（4）动态表区域',
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
            'value': '9',
            'offset': ''
          },
          'lgCol': {
            'value': '9',
            'offset': ''
          }
        },
        'viewCfg': {
          'viewId': 'area4',
          'parentViewId': 'areaTree',
          'component': 'grid_multi_view',
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
              'data': 'Name'
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
              'data': 'OwnerAssembly'
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
              'title': '是否启用',
              'data': 'enabled'
            },
            {
              'title': '创建事件',
              'data': 'CreateTime'
            },
            {
              'title': 'DrmId',
              'data': 'DrmId'
            }
          ],
          /*"filterConfig": [
           {
           "classType": "SFDW_Classes.TEntityLink",
           "masterClass": "DynamicResModule",
           "slaveClass": "ResourceType",
           "propLinks": [
           {
           "classType": "SFDW_Classes.TPropertyLink",
           "masterProp": "PlatCustomerId",
           "slaveProp": "PlatCustomerId"
           },
           {
           "classType": "SFDW_Classes.TPropertyLink",
           "masterProp": "Id",
           "slaveProp": "DrmId"
           }
           ]
           }
           ]*/
        }
      }
    ]
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
