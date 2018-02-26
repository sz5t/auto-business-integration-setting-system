import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../form/form-models/IFieldConfig';
import { CnstDynamicFormComponent } from "../../cnst-form/cnst-dynamic-form.component";
import { CnstCodemirrorComponent } from "../cnst-codemirror/cnst-codemirror.component";
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'cnst-datasource,[cnst-datasource]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-datasource.component.html',
  styleUrls: ['./cnst-datasource.component.css']
})
export class CnstDatasourceComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  
  }
/*   @ViewChild(CnstDynamicFormComponent)
  form: CnstDynamicFormComponent; */
 
  @ViewChild('form1')
  form1:CnstDynamicFormComponent;

  @ViewChild('form2')
  form2:CnstDynamicFormComponent;

  @ViewChild(CnstCodemirrorComponent)
   codemirror: CnstCodemirrorComponent;
  _formConfigs = [[
    {
      'type': 'input',
      'inputType': 'text',
      'name': 'AssemblyName1',
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
      'name': 'AssemblyName2',
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
          'text': '字符',
          'value': '字符'
        },
        {
          'text': '数值',
          'value': '数值'
        },
        {
          'text': '时间',
          'value': '时间'
        }
      ],
      'name': 'AssemblyName3',
      'value': '',
      'inputClass': 'input-medium'
    },
    {
      'type': 'select',
      'placeholder': '--请选择--',
      'options': [
        {
          'text': '居中',
          'value': '居中'
        },
        {
          'text': '左对齐',
          'value': '左对齐'
        },
        {
          'text': '右对齐',
          'value': '右对齐'
        }
      ],
      'name': 'AssemblyName4',
      'value': '',
      'inputClass': 'input-medium'
    },
    {
      'type': 'select',
      'placeholder': '--请选择--',
      'options': [
        {
          'text': '显示',
          'value': '显示'
        },
        {
          'text': '隐藏',
          'value': '隐藏'
        }
      ],
      'name': 'AssemblyName5',
      'value': '',
      'inputClass': 'input-medium'
    },
    {
      'type': 'input',
      'inputType': 'text',
      'name': 'AssemblyName6',
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
  ]];
  _formConfigstilel = [
    { titel: '字段名称' },
    { titel: '标题' },
    { titel: '数据类型' },
    { titel: '展示样式' },
    { titel: '是否显示' },
    { titel: '顺序' },
  ];
  _formConfigsparameter = [];
  __formConfigsparametertilel = [
    { titel: '参数名' },
    { titel: '参数替换字符串' },
    { titel: '取值方式' },
    { titel: '为空取值' },
    { titel: '参数类型' },
    { titel: '系统参数' },
    { titel: '取值或赋值字段名' }
  ];
  _formConfig;
  _form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    //this._form = this.formBuilder.group({});
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this._formConfig.forEach(controlData => {
      controlData.forEach(control => {
        group.addControl(control.name, this.createControl(control));
      });
    });
    return group;
  }

  createControl(config: IFieldConfig) {
    const { disabled, validation, value } = config;
    return this.formBuilder.control({ disabled, value }, validation);
  }

  addfield() {
    this._formConfigs.push([
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'AssemblyName1',
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
        'name': 'AssemblyName2',
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
            'text': '字符',
            'value': '字符'
          },
          {
            'text': '数值',
            'value': '数值'
          },
          {
            'text': '时间',
            'value': '时间'
          }
        ],
        'name': 'AssemblyName3',
        'value': '',
        'inputClass': 'input-medium'
      },
      {
        'type': 'select',
        'placeholder': '--请选择--',
        'options': [
          {
            'text': '居中',
            'value': '居中'
          },
          {
            'text': '左对齐',
            'value': '左对齐'
          },
          {
            'text': '右对齐',
            'value': '右对齐'
          }
        ],
        'name': 'AssemblyName4',
        'value': '',
        'inputClass': 'input-medium'
      },
      {
        'type': 'select',
        'placeholder': '--请选择--',
        'options': [
          {
            'text': '显示',
            'value': '显示'
          },
          {
            'text': '隐藏',
            'value': '隐藏'
          }
        ],
        'name': 'AssemblyName5',
        'value': '',
        'inputClass': 'input-medium'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'AssemblyName6',
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
    ]);
  };

  addparameter() {
    this._formConfigsparameter.push([
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'AssemblyName1',
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
        'name': 'AssemblyName2',
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
        'name': 'AssemblyName3',
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
        'name': 'AssemblyName4',
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
        'name': 'AssemblyName5',
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
        'name': 'AssemblyName6',
        'value': '',
        'inputClass': 'input-medium'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'AssemblyName7',
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
    ]);
  };


  getCodemirrorValue() {
  
     alert(this.codemirror.getValue());
  };

  form1Save(){
    alert('参数json') ;
   console.log(this.form1.getValue());
  };

}
