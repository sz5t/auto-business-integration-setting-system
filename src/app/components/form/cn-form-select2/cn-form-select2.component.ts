import {Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef} from '@angular/core';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {IField} from '../form-models/IField';
import {FormGroup} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {CommonUtility} from "../../../framework/utility/common-utility";
declare let $: any;
@Component({
  selector: 'cn-form-select2',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-form-select2.component.html',
  styleUrls: ['../cn-form-select/cn-form-select.component.css']
})
export class CnFormSelect2Component implements IField, OnInit, AfterViewInit {
  submitValid: boolean;
  config: IFieldConfig;
  group: FormGroup;
  _asyncData;
  _GUID = CommonUtility.uuID(6);
  _elem;

  constructor(private _apiService: ApiService, private _elemRef: ElementRef) {
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    const id = '#' + 'select_' + this._GUID;
    if (this.config.ajax) {
      const url = this.config.ajax.url;
      this._apiService.doGet2<any>(url).subscribe(
        response => {
          this._asyncData = response.Data;
          const options = [];
          this._asyncData.forEach(item => {
            const newOption = new Option(item.text, item.value);
            options.push(newOption);
          });
          $(id).append(options);
          $(id).selectpicker();
        },
        error2 => {
        },
        () => {
          $(id).selectpicker('refresh');
        }
      );
    }
  }

  changeValue(event) {
    console.log(event);
  }
}
