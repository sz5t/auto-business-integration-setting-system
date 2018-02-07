import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {IField} from '../form-models/IField';
import {App} from '../../layout/cn-layout/cn-layout.component';
import {CommonUtility} from "../../../framework/utility/common-utility";
declare let $: any;
@Component({
  selector: 'cn-date-range-picker',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-date-range-picker.component.html',
  styleUrls: ['./cn-date-range-picker.component.css']
})
export class CnDateRangePickerComponent implements OnInit, IField {
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
    this._control = this.group.controls[this.config.name];
    $(this.elem).find('.input-daterange input').each(function () {
      $(this).datetimepicker({
        rtl: App.isRTL(),
        orientation: 'auto',
        autoclose: true,
        language: 'zh-CN',
      });
    });
    $(this.elem).find('.input-daterange input').datetimepicker().on('changeDate', (ev) => {
      this._control.setValue(new Date(ev.date).toTimeString(), {emitEvent: true});
    });
  }

}
