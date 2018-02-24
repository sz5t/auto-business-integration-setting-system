import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../form/form-models/IFieldConfig';
import {CnstDynamicFormComponent} from "../../cnst-form/cnst-dynamic-form.component";
@Component({
  selector: 'cnst-datasource,[cnst-datasource]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-datasource.component.html',
  styleUrls: ['./cnst-datasource.component.css']
})
export class CnstDatasourceComponent implements OnInit {
  @ViewChild(CnstDynamicFormComponent)
  form: CnstDynamicFormComponent;
  _formConfigs = [
    [
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
        'type': 'input',
        'inputType': 'text',
        'name': 'AssemblyName3',
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
        'name': 'AssemblyName4',
        'label': '程序集名称：',
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
        'name': 'AssemblyName5',
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
      ],
    [
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
        'type': 'input',
        'inputType': 'text',
        'name': 'AssemblyName3',
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
        'name': 'AssemblyName4',
        'label': '程序集名称：',
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
        'name': 'AssemblyName5',
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
    ]
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
    const {disabled, validation, value} = config;
    return this.formBuilder.control({disabled, value}, validation);
  }


}
