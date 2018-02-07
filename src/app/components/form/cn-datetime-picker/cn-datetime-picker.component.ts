import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {IField} from '../form-models/IField';
import {FormGroup} from '@angular/forms';
import {CommonUtility} from "../../../framework/utility/common-utility";
declare let $: any;
@Component({
  selector: 'cn-datetime-picker',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-datetime-picker.component.html',
  styleUrls: ['./cn-datetime-picker.component.css']
})
export class CnDatetimePickerComponent implements OnInit, IField {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;
  _control;
  _GUID = 'form_date' + CommonUtility.uuID(5);
  elem;

  constructor(private elementRef: ElementRef) {
    this.elem = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this._control = this.group.get(this.config.name);
    if ($().datetimepicker) {
      $(this.elem).find('.form_datetime').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayBtn: true,
        todayHighlight: 1
      });
    }
    $(this.elem).find('.form_datetime').datetimepicker().on('changeDate', (ev) => {
      this._control.setValue(ev.date, {emitEvent: true});
    });
  }
}
