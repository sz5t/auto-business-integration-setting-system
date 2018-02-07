import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cn-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.css']
})
export class FormDemoComponent implements OnInit {
  _config = [
    [
      {
        'title': '（1）表单区域',
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
          'component': 'form_view',
          'classType': 'FormView',
          'formConfig': [
            {
              'type': 'input',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
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
              'type': 'select2',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
              'placeholder': '--请选择--',
              'ajax': {
                'url': 'DataCategory?_select=Id as value,Name as text'
              },
              'name': 'Caption',
              'label': '中文名称：',
              'value': '',
              'inputClass': 'input-medium'
            },
            {
              'type': 'touchspin',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
              'inputType': 'text',
              'name': 'ContextName',
              'label': '上下文名称：',
              'icon': 'fa fa-book',
              'iconPstn': 'left',
              'inputClass': 'input-group input-medium'
            },
            {
              'type': 'input',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
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
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
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
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
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
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
              'inputType': 'text',
              'name': 'DefaultNamespace',
              'label': '命名空间：',
              'inputClass': 'input-group input-medium',
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
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
              'inputType': 'text',
              'name': 'EntitiesName',
              'label': '实体名称：',
              'inputClass': 'input-group input-medium',
              'icon': 'fa fa-bookmark-o',
              'iconPstn': 'left',
              'helpClass': 'help-inline',
              'helpText': ''
            },
            {
              'type': 'checkbox',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-6',
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
              'type': 'datepicker',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-12',
              'inputType': 'text',
              'name': 'date',
              'label': '创建日期：',
              'inputClass': 'input-medium',
              'placeholder': ''
            },
            {
              'type': 'datetimepicker',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-12',
              'inputType': 'text',
              'name': 'time',
              'label': '创建时间：',
              'inputClass': 'input-medium',
              'placeholder': ''
            },
            {
              'type': 'daterangepicker',
              'layout': 'col-md-6 col-lg-6 col-sm-12 col-sx-12',
              'inputType': 'text',
              'name': 'daterange',
              'label': '使用时间范围：',
              'inputClass': 'input-lg',
              'placeholder': ''
            },
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
