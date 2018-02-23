import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../form/form-models/IFieldConfig';
@Component({
  selector: 'cnst-datasource,[cnst-datasource]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-datasource.component.html',
  styleUrls: ['./cnst-datasource.component.css']
})
export class CnstDatasourceComponent implements OnInit {

  _form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this._form = this.formBuilder.group({});
  }

  
  // get controlsData() {
  //   return this._formConfigs.filter(({type}) => {
  //     return type !== 'button';
  //   });
  // }

  // get controls() {
  //   return this._formConfigs.filter(({type}) => {
  //     return type !== 'button';
  //   });
  // }

  get changes() {
    return this._form.valueChanges;
  }

  get valid() {
    return this._form.valid;
  }

  get value() {
    return this._form.value;
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this._formConfigs.forEach(controlData => {
      controlData.forEach(control => {
        group.addControl(control.name, this.createControl(control));
      });
    });
    return group;
  }

  createControl(config: IFieldConfig) {
    const {disabled, validation, value} = config;
    return this.formBuilder.control({disabled, value}, validation);
  }
  _formConfigs = [
      [
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
        }
      ]
  
  ];

}
