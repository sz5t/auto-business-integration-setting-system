import { Component, OnInit, ViewChild, ViewEncapsulation, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../form/form-models/IFieldConfig';
import { CnstDynamicFormComponent } from "../../cnst-form/cnst-dynamic-form.component";
import { CnstCodemirrorComponent } from "../cnst-codemirror/cnst-codemirror.component";
import { AfterViewInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { CommonUtility } from '../../../framework/utility/common-utility';
import { Output } from '@angular/core';
@Component({
  selector: 'cnst-datasource,[cnst-datasource]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-datasource.component.html',
  styleUrls: ['./cnst-datasource.component.css']
})
export class CnstDatasourceComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() _dataSource;
  @Input() _cfgJson;
  //@Input() showTabs;

  @Output() callbackSaveField: EventEmitter<any> = new EventEmitter<any>();
  @Output() callbackSaveParameter: EventEmitter<any> = new EventEmitter<any>();
  @Output() callbackSaveSql: EventEmitter<any> = new EventEmitter<any>();
  

  @ViewChild('fieldForm')
  fieldForm: CnstDynamicFormComponent;
  @ViewChild('parameterForm')
  parameterForm: CnstDynamicFormComponent;
  @ViewChild(CnstCodemirrorComponent)
  codemirror: CnstCodemirrorComponent;

  _formConfigs = [];
  _formConfigsTitle = {};
  _formConfigsContent = [];
  _formConfigsparameter = [];
  _formConfigsparameterTitle = {};
  _formConfigsparameterContent = [];
  _formConfig;
  _form: FormGroup;
 
  constructor() {
   /*  if(!this.showTabs){
      this.showTabs=[false, true]
    } */
   
   }

  ngOnInit() {
    if (this._cfgJson) {
      this._formConfigsTitle = this._cfgJson.field.titleHeader;
      this._formConfigsContent = this._cfgJson.field.content;
      this._formConfigsparameterTitle = this._cfgJson.parameter.titleHeader;
      this._formConfigsparameterContent = this._cfgJson.parameter.content;
    }
    if (this._dataSource) {
      if (this._dataSource.columnConfigsData) {
        this.addFieldChanges(this._dataSource.columnConfigsData);
      }
      else {
        this.addFieldChanges([]);
      }
      if (this._dataSource.parameterCfgData) {
        this.addParameterChanges(this._dataSource.parameterCfgData);
      }
      else {
        this.addParameterChanges([]);
      }
    }
  }
  addField() {
    const fieldIdentity = CommonUtility.uuID(5);
    const conent = $.extend(true, [], this._formConfigsContent);
    conent.forEach(Field => {
      Field.name = fieldIdentity + '_' + Field.name;
    });
    this._formConfigs.push(conent);
    this._formConfigs = $.extend(true, [], this._formConfigs);
  }
  ngOnChanges() {  
    if (this._cfgJson) {
      this._formConfigsTitle = this._cfgJson.field.titleHeader;
      this._formConfigsContent = this._cfgJson.field.content;
      this._formConfigsparameterTitle = this._cfgJson.parameter.titleHeader;
      this._formConfigsparameterContent = this._cfgJson.parameter.content;
    }
    if (this._dataSource) {
      if (this._dataSource.columnConfigsData) {
        this.addFieldChanges(this._dataSource.columnConfigsData);
      }
      else {
        this.addFieldChanges([]);
      }
      if (this._dataSource.parameterCfgData) {
        this.addParameterChanges(this._dataSource.parameterCfgData);
      }
      else {
        this.addParameterChanges([]);
      }
    }
  }
  ngAfterViewInit(): void {
    if (this._dataSource) {
      if (this._dataSource.columnConfigsData) {
        this.changeFieldFormValue(this._dataSource.columnConfigsData);
      }
      if (this._dataSource.parameterCfgData) {
        this.changeParameterFormValue(this._dataSource.parameterCfgData);
      }
    }

  }
  //字段赋值
  changeFieldFormValue(columnConfigsData) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this._formConfigsContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (var key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);

      });
      this.fieldForm.setFormValue(fieldData);
    }
  }
  //参数赋值
  changeParameterFormValue(columnConfigsData) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this._formConfigsparameterContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (var key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);
      });
      this.parameterForm.setFormValue(fieldData);
    }
  }

  addFieldChanges(columnConfigsData?) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this._formConfigsContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (var key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);

      });
      this._formConfigs = row;
    }
    else {
      this._formConfigs = [];
    }
  }
  addParameterChanges(columnConfigsData?) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this._formConfigsparameterContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (var key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);

      });
      this._formConfigsparameter = row;
    }
    else {
      this._formConfigsparameter = [];
    }
  }

  addparameter() {
    const fieldIdentity = CommonUtility.uuID(5);
    const conent = $.extend(true, [], this._formConfigsparameterContent);
    conent.forEach(Field => {
      Field.name = fieldIdentity + '_' + Field.name;
    });

    this._formConfigsparameter.push(conent);
    this._formConfigsparameter = $.extend(true, [], this._formConfigsparameter);
  }

  /** 
   * 获取sql值
  */
  getCodemirrorValue() {
    this.callbackSaveSql.emit(this.codemirror.getValue());
  };

  /** 字段保存 */
  fieldFormSave() {
    //将表单信息分组取出每个字段信息json格式如下    [ { rowId: '1', cols: { id: '1', name: 'mc', code: '001' } } ];
    const formJson = [];
    const formValue = this.fieldForm.getValue();
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
    // this._dataSource.columnConfigs = fieldJson;
    // this._dataSource.columnConfigsData = formJson;
    this.callbackSaveField.emit(formJson);
  };
  /**
   * 参数保存
   */
  parameterFormSave() {

    //将表单信息分组取出每个字段信息json格式如下    [ { rowId: '1', cols: { id: '1', name: 'mc', code: '001' } } ];
    const formJson = [];
    const formValue = this.parameterForm.getValue();
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

    //this._dataSource.parameterCfg = parameterJson;
    // this._dataSource.parameterCfgData = formJson;
    this.callbackSaveParameter.emit(formJson);
  };


  //切换数据源
  setComponentDic(Data?, saveJson?) {

    this._formConfigs = [];
    this._formConfigsTitle = Data.field.titleHeader;
    this._formConfigsContent = Data.field.content;

    this._formConfigsparameter = [];
    this._formConfigsparameterTitle = Data.parameter.titleHeader;
    this._formConfigsparameterContent = Data.parameter.content;
  }

}
