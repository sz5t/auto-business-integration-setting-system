import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from '../form-models/IField';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {CommonUtility} from '../../../framework/utility/common-utility';
declare let $: any;
@Component({
  selector: 'cn-date-picker',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-date-picker.component.html',
  styleUrls: ['./cn-date-picker.component.css']
})
export class CnDatePickerComponent implements OnInit, IField, AfterViewInit {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;
  _control;
  _GUID = 'form_date' + CommonUtility.uuID(5);
  elem;

  constructor(private elementRef: ElementRef) {
    this.elem = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {

  }
  ngOnInit() {
    this._control = this.group.controls[this.config.name];
    $(this.elem).find('.form_datetime').datetimepicker({
      language: 'zh-CN',
      autoclose: true,
      todayBtn: true,
      todayHighlight: 1,
      maxView: 4,
      startView: 2,
      minView: 3,
      linkField: this._GUID
    });
    $(this.elem).find('.form_datetime').datetimepicker().on('changeDate', (ev) => {
      this._control.setValue(ev.date, {emitEvent: true});
    });
  }
}
