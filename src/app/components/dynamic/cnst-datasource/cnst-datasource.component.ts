import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../form/form-models/IFieldConfig';
import { CnstDynamicFormComponent } from "../../cnst-form/cnst-dynamic-form.component";
import { CnstCodemirrorComponent } from "../cnst-codemirror/cnst-codemirror.component";
import { AfterViewInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { CommonUtility } from '../../../framework/utility/common-utility';
@Component({
  selector: 'cnst-datasource,[cnst-datasource]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-datasource.component.html',
  styleUrls: ['./cnst-datasource.component.css']
})
export class CnstDatasourceComponent implements OnInit, AfterViewInit, OnChanges {
  ngAfterViewInit(): void {

  }
  @Input() _treeData;
  @Input() cfgJson;
  /*   @ViewChild(CnstDynamicFormComponent)
    form: CnstDynamicFormComponent; */

  @ViewChild('form1')
  form1: CnstDynamicFormComponent;

  @ViewChild('form2')
  form2: CnstDynamicFormComponent;

  @ViewChild(CnstCodemirrorComponent)
  codemirror: CnstCodemirrorComponent;
  _formConfigs = [];
  _formConfigsTitle = {
    header: [
      { title: '字段名称', width: 'auto' },
      { title: '标题', width: 'auto' },
      { title: '数据类型', width: 'auto' },
      { title: '展示样式', width: 'auto' },
      { title: '是否显示', width: 'auto' },
      { title: '顺序', width: 'auto' },
    ],
    deletebutton: {
      show: true
    }
  };
  _formConfigsContent = [];
  _formConfigsparameter = [];
  __formConfigsparameterTitle = {
    header: [
      { title: '参数名', width: 'auto' },
      { title: '参数替换字符串', width: 'auto' },
      { title: '取值方式', width: 'auto' },
      { title: '为空取值', width: 'auto' },
      { title: '参数类型', width: 'auto' },
      { title: '系统参数', width: 'auto' },
      { title: '取值或赋值字段名', width: 'auto' }
    ],
    deletebutton: {
      show: true
    }
  };
  __formConfigsparameterContent = [];
  _formConfig;
  _form: FormGroup;



  constructor() {

  }

  ngOnInit() {

  }


  addField() {

    const fieldIdentity = CommonUtility.uuID(5);
    const conent = $.extend(true, [], this._formConfigsContent);

    conent.forEach(Field => {
      Field.name = fieldIdentity + '_' + Field.name;
    });

    this._formConfigs.push(conent);

    this._formConfigs = $.extend(true, [], this._formConfigs);

  };

  addparameter() {
    const fieldIdentity = CommonUtility.uuID(5);
    const conent = $.extend(true, [], this.__formConfigsparameterContent);
    conent.forEach(Field => {
      Field.name = fieldIdentity + '_' + Field.name;
    });

    this._formConfigsparameter.push(conent);
    this._formConfigsparameter = $.extend(true, [], this._formConfigsparameter);
  };

  ngOnChanges() {
    alert('hh');
    if (this.cfgJson) {


      this._formConfigs = [];
      this._formConfigsTitle = this.cfgJson.field.titleHeader;
      this._formConfigsContent = this.cfgJson.field.content;

      this._formConfigsparameter = [];
      this.__formConfigsparameterTitle = this.cfgJson.parameter.titleHeader;
      this.__formConfigsparameterContent = this.cfgJson.parameter.content;
    }
  }

  getCodemirrorValue() {

    alert(this.codemirror.getValue());
  };


  //大概的字段结构(只是gridview的)，这个结构也需要从树上传递进来，用来区别tree treegrid


  form1Save() {
    //将表单信息分组取出每个字段信息json格式如下    [ { rowId: '1', cols: { id: '1', name: 'mc', code: '001' } } ];
    const formJson = [];
    const formValue = this.form1.getValue();
    for (var key in formValue) { //遍历表单提交的数据
      const formRow = {//可以将此结构定义在其他地方，动态加载，就和加载树节点一样
        rowId: '',
        cols: {}
      };
      let isRow = false;
      // 随机标识id_字段名
      const index = key.indexOf('_');
      const fromRowId = key.substring(0, index);//行标识
      const fromItem = key.substring(index + 1, key.length);//字段标识
      formJson.forEach(row => {
        if (row.rowId == fromRowId) {//判断是否存在行
          isRow = true;
          //存在行，添加属性
          row.cols[fromItem] = formValue[key];
        }
      });
      if (!isRow) {//不存在行，添加属性
        formRow.rowId = fromRowId;
        formRow.cols[fromItem] = formValue[key];
        formJson.push(formRow);
      }

    }

    const fieldJson = [];

    formJson.forEach(row => {

      const fieldItemJson = {
        "title": "",
        "data": "",
        "renderName": {}
      };
      fieldItemJson.title = row.cols.AssemblyName2;
      fieldItemJson.data = row.cols.AssemblyName1;
      fieldJson.push(fieldItemJson);
    });
    console.log('保存');
    console.log(formJson);
    console.log(fieldJson);
    this._treeData.columnConfigs = fieldJson;
  };

  form2Save() {

    //将表单信息分组取出每个字段信息json格式如下    [ { rowId: '1', cols: { id: '1', name: 'mc', code: '001' } } ];
    const formJson = [];
    const formValue = this.form2.getValue();
    for (var key in formValue) { //遍历表单提交的数据
      const formRow = {//可以将此结构定义在其他地方，动态加载，就和加载树节点一样
        rowId: '',
        cols: {}
      };
      let isRow = false;
      // 随机标识id_字段名
      const index = key.indexOf('_');
      const fromRowId = key.substring(0, index);//行标识
      const fromItem = key.substring(index + 1, key.length);//字段标识
      formJson.forEach(row => {
        if (row.rowId == fromRowId) {//判断是否存在行
          isRow = true;
          //存在行，添加属性
          row.cols[fromItem] = formValue[key];
        }
      });
      if (!isRow) {//不存在行，添加属性
        formRow.rowId = fromRowId;
        formRow.cols[fromItem] = formValue[key];
        formJson.push(formRow);
      }

    }

    const parameterJson = [];

    formJson.forEach(row => {

      const parameterItemJson = {
        "parameterName": "",
        "replace": "",
        "valueAs": "",
        "valueType": '',
        "parameterType": '',
        "systemParameter": '',
        "fieldName": ''

      };
      parameterItemJson.parameterName = row.cols.AssemblyName1;
      parameterItemJson.replace = row.cols.AssemblyName2;
      parameterItemJson.valueAs = row.cols.AssemblyName3;
      parameterItemJson.valueType = row.cols.AssemblyName4;
      parameterItemJson.parameterType = row.cols.AssemblyName5;
      parameterItemJson.systemParameter = row.cols.AssemblyName6;
      parameterItemJson.fieldName = row.cols.AssemblyName7;
      parameterJson.push(parameterItemJson);
    });
    console.log('保存');
    console.log(formJson);
    console.log(parameterJson);
    this._treeData.parametercfg = parameterJson;
    console.log(this._treeData);
  };


  //切换数据源
  setComponentDic(Data?, saveJson?) {

    this._formConfigs = [];
    this._formConfigsTitle = Data.field.titleHeader;
    this._formConfigsContent = Data.field.content;

    this._formConfigsparameter = [];
    this.__formConfigsparameterTitle = Data.parameter.titleHeader;
    this.__formConfigsparameterContent = Data.parameter.content;
  }

}
