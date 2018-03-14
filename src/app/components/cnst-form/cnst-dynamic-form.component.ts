import {
  AfterViewInit,
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFieldConfig } from '../form/form-models/IFieldConfig';
import { CommonUtility } from '../../framework/utility/common-utility';
import { retry } from 'rxjs/operator/retry';
import { SubjectMessageService } from '../../services/subject-message.service';
import {Subject} from "rxjs/Subject";
declare let bootbox: any;
declare let $: any;
@Component({
  exportAs: 'cnstDynamicForm',
  selector: 'cnst-dynamic-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-dynamic-form.component.html',
  styleUrls: ['./cnst-dynamic-form.component.css']
})
export class CnstDynamicFormComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('table') table: ElementRef;
  @Input() configs;
  @Input() configsTitle;
  @Input() ConfigsContent;
  @Input() config: IFieldConfig[] = [];
  @Input() submitValid;
  @Input() relation;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  _viewId;
  _formType;
  dtOptions;
  dtTrigger: Subject<any> = new Subject();
  get controls() {
    const allControls = [];
    this.configs.forEach(config => {
      config.forEach(control => {
        allControls.push(control);
      });
    });
    return allControls.filter(({ type }) => {
      return type !== 'button' && type !== 'label';
    });
  }

  get changes() {
    return this.form.valueChanges;
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  constructor(private formBuilder: FormBuilder, private subjectMessage: SubjectMessageService) {

  }

  ngOnInit() {
    this.form = this.createGroup();
    this.dtOptions = {
      pagingType: 'full',
      select: true
    };
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);

      const configControls = this.controls.map(item => item.name);

      controls
        .filter(control => !configControls.includes(control))
        .forEach(control => this.form.removeControl(control));

      configControls
        .filter(control => !controls.includes(control))
        .forEach(name => {
          const item = this.controls.find(control => control.name === name);
          this.form.addControl(name, this.createControl(item));
        });
    }
  }

  ngAfterViewInit() {

    this.getGrelation();
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: IFieldConfig) {
    const { disabled, validation, value } = config;
    return this.formBuilder.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
    this.config = this.config.map(item => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValid(name: string, valid: boolean) {
    if (this.form.controls[name]) {
    }
  }

  resetFormValue() {
    this.form.reset();
  }

  setValue(name: string, value: any) {
    const control = this.form.controls[name];
    if (control) {
      control.setValue(value, { emitEvent: true });
    }
  }

  setFormValue(data) {
    if (data) {
      for (const d in data) {
        if (data.hasOwnProperty(d)) {
          this.setValue(d, data[d]);
        }
      }
    }
  }

  getControlValue(name: string) {
    return this.form.controls[name].value;
  }

  delrow(row?: any) {
    bootbox.confirm({
      // title: "确认",
      message: '确定要删除?',
      buttons: {
        confirm: {
          label: '确定'
        },
        cancel: {
          label: '取消'

        }
      },
      callback: (result) => {
        if (result) {
          const tableIndex = this.configs.findIndex(item => {
            return item === row;
          });
          this.configs.splice(tableIndex, 1);
          this.ngChangesRow();

        } else {
          return;
        }

      }
    });
    // bootbox.confirm("确定要删除?", function (o) {
    //   alert(o);
    // });
  }

  getValue() {
    return this.value;
  }

  addRowChanges(columnConfigsData?) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this.ConfigsContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (const key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);

      });
      this.configs = row;
    }
    else {
      this.configs = [];
    }
  }

  /**
   * 添加新行
   */
  addRow() {
    if (this._saveType === 'grid_grid_child') {
      if (this._parentId) {
        //alert('创建记录');
      }
      else {
        alert('先选中主表记录，再新增');
        return;
      }
    }

    const fieldIdentity = CommonUtility.uuID(5);
    const conent = $.extend(true, [], this.ConfigsContent);
    conent.forEach(Field => {
      Field.name = fieldIdentity + '_' + Field.name;
    });
    this.configs.push(conent);
    // this.configs = $.extend(true, [], this.configs);
    this.ngChangesRow();

    if (this.configsTitle.keyId) {
      this.setValue(fieldIdentity + '_' + this.configsTitle.keyId, fieldIdentity);
    }

    if (this._formEvent['addRow']) {
      this._formEvent['selectRow'].forEach(sendEvent => {
        if (sendEvent.isRegister === true) {
          this.subjectMessage.sendMessage({ type: 'relation' }, sendEvent.data);
        }
      });
    }

  }

  changeRowFormValue(columnConfigsData) {
    const row = [];
    if (columnConfigsData.length > 0) {
      const fieldData = {};
      columnConfigsData.forEach(element => {
        const conent = $.extend(true, [], this.ConfigsContent);
        conent.forEach(Field => {
          Field.name = element.rowId + '_' + Field.name;
        });
        for (const key in element.cols) {
          const colsname = element.rowId + '_' + key;
          fieldData[colsname] = element.cols[key];
        }
        row.push(conent);

      });
      this.setFormValue(fieldData);
    }
  }

  /**
   * 构建新行
   */
  ngChangesRow() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map(item => item.name);

      controls
        .filter(control => !configControls.includes(control))
        .forEach(control => this.form.removeControl(control));

      configControls
        .filter(control => !controls.includes(control))
        .forEach(name => {
          const item = this.controls.find(control => control.name === name);
          this.form.addControl(name, this.createControl(item));
        });
      this.dtTrigger.next();
    }
  }

  /**
   * 表单赋值
   * @param viewId
   * @param formValue
   */
  setViewFormValue(viewId?, formValue?) {
    this._viewId = viewId;
    if (Array.isArray(formValue)) { // 列表赋值

      this._formType = 'formGroup';
      this._temporaryValue = formValue;
      if(this._saveType != 'grid_grid_child'){
        this.setRowChanges(formValue);
      }

    } else { // 表单赋值
      this.setFormValue(formValue);
      this._formType = 'form';
      //this.ngChangesRow();
    }
  }

  /**
   * 根据选中行的主键控件，获取当前行的ID
   * @param name
   */
  selectRowIdByControlName(name) {

    if (this._selectRow != this.getControlValue(name)) {
      if (this._formEvent['selectRow']) {

        this._formEvent['selectRow'].forEach(sendEvent => {
          if (sendEvent.isRegister === true) {
            const receiver = { name: 'refreshAsChild', receiver: sendEvent.receiver, parentId: this.getControlValue(name) };
            this.subjectMessage.sendMessage({ type: 'relation' }, receiver);
          }
        });

      }
      this._selectRow = this.getControlValue(name);
    }

  }

  /**
   * 赋值生成行
   * @param columnConfigsData
   */
  setRowChanges(columnConfigsData?) {
    const row = [];
    if (columnConfigsData.length > 0) {

      const fieldData = {};
      columnConfigsData.forEach(element => {
        const fieldIdentity = CommonUtility.uuID(5);
        const conent = $.extend(true, [], this.ConfigsContent);
        conent.forEach(Field => {
          Field.name = fieldIdentity + '_' + Field.name;
        });
        for (const key in element) {
          const colsname = fieldIdentity + '_' + key;
          fieldData[colsname] = element[key];
        }
        row.push(conent);

      });
      this.configs = row;
      this.ngChangesRow();
      this.setFormValue(fieldData);
    }
    else {
      this.configs = [];
      this.ngChangesRow();
    }
  }

  /**
   * 根据viewId获取表单数据
   * @returns {any}
   */
  getValueByViewId() {
    if (this._formType === 'form') {
      return { viewId: this._viewId, data: this.value };
    } else if (this._formType === 'formGroup') {
      if (this._saveType === 'grid_grid_child') {
        this.temporaryValueSave(this._parentId);
        return { viewId: this._viewId, data: this._temporaryValue };
      } else {
        return { viewId: this._viewId, data: this.formatSubmitValue() };
      }
    } else {
      return { viewId: this._viewId, data:null };
    }

  }

  formatSubmitValue() {
    const formJson = [];
    const formValue = this.value;
    const submitValue = [];
    for (const key in formValue) { // 遍历表单提交的数据
      const formRow = {// 可以将此结构定义在其他地方，动态加载，就和加载树节点一样
        rowId: '',
        cols: {}
      };
      let isRow = false;
      // 随机标识id_字段名
      const index = key.indexOf('_');
      const formRowId = key.substring(0, index); //行标识
      const formItem = key.substring(index + 1, key.length); //字段标识
      formJson.forEach(row => {
        if (row.rowId == formRowId) {//判断是否存在行
          isRow = true;
          // 存在行，添加属性
          row.cols[formItem] = formValue[key];
        }
      });
      if (!isRow) { // 不存在行，添加属性
        formRow.rowId = formRowId;
        formRow.cols[formItem] = formValue[key];
        formJson.push(formRow);
      }
    }
    formJson.forEach(row => {
      submitValue.push(row.cols);
    });

    return submitValue;
  }

  //记录选中行id
  _selectRow = '';
  // 作为子表时，主表id
  _parentId;
  // 临时存储值
  _temporaryValue = [];
  // 方法列表(注册消息的方法)
  _formEvent = {
    addRow: [],
    selectRow: []
  };
  _saveType;

  // 表单发布消息
  formSendMessage(data?) {
    // 当操作什么的时候发布消息
    if (data) {
      if (this._formEvent[data.name]) {
        this._formEvent[data.name].push({ isRegister: true, receiver: data.receiver, data: data.relationData });
      }
    }
  }

  // 接收消息
  formReceiveMessage(data?) {
    //当操作什么的时候，接收消息
    //console.log('表单接收消息', data);
    if (data) {
      switch (data.name) {
        case 'refreshAsChild':
          this.refreshAsChild(data.parentId);
          break;
      }
    }
  }

  /** 刷新，作为子表的刷新*/
  refreshAsChild(parentId?) {

    if (parentId === this._parentId) {
      return;
    }
    else {
      // 1.将当前页面的值存储在临时变量里，且需要整理临时变量的数据
      this.temporaryValueSave(parentId);
      // 2. 读取出临时变量里属于主表当前关系的数据
      this.temporaryValueLoad();
    }

  }

  /**
   * 临时变量存值[]
   */
  temporaryValueSave(parentId?) {
    // 我需要再此解析 关系映射字段
    //1.找出临时变量里当前父节点的所有值，清空
    if (parentId) {
      if (this._temporaryValue) {
        for (var i = 0; i < this._temporaryValue.length; i++) {
          if (this._temporaryValue[i].parentId === this._parentId) {   //如果找到要被删除的数字所在的数组下标
            var num = this._temporaryValue.splice(i, 1);   //从i位置开始删除1个数字
            i = i - 1;    //解决方案
          }
        }
      }

      //2.将当前页面的值，写进去
      const newValue = this.formatSubmitValue();
      if (newValue) {
        newValue.forEach((element, index) => {
          element.parentId = this._parentId;
          this._temporaryValue.push(element); //删除节点值
        });

      }
    }
    if (parentId) {
      this._parentId = parentId; //保存完值后，切换页面所属父对象的id标识值
    }
  }

  /**
   * 主表切换时，子表动作
   */
  temporaryValueLoad() {
    const formValue = [];
    if (this._temporaryValue) {
      this._temporaryValue.forEach((element, index) => {
        if (element.parentId === this._parentId) {//上一个操作的值
          formValue.push(element); //添加节点值
        }
      });
    }
    this.setRowChanges(formValue);
  }

  // 获取关系里的保存方式
  getGrelation() {
    if (this.relation) {
      this.relation.forEach(element => {
        if (element.relationType) {
          if (element.relationType === 'grid_grid_child') {
            this._saveType = 'grid_grid_child';
          }
        }
      });
    }

  }

  subscribFormData() {
    this.subjectMessage.sendMessage({ type: 'returnFormValue' }, this.getValueByViewId());
  }


}
