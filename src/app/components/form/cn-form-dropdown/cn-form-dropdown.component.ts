import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {CommonUtility} from '../../../framework/utility/common-utility';
declare let $: any;
@Component({
  selector: 'cn-form-dropdown',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-form-dropdown.component.html',
  styleUrls: ['./cn-form-dropdown.component.css']
})
export class CnFormDropdownComponent implements OnInit {
  submitValid: boolean;
  config: IFieldConfig;
  group: FormGroup;
  _asyncData;
  _GUID = CommonUtility.uuID(6);

  constructor(private _apiService: ApiService) {
  }

  ngOnInit() {
    const selectID = '#' + 'select_' + this._GUID;
    $.fn.select2.defaults.set('theme', 'bootstrap');
    const placeholder = '--请选择--';
    if (this.config.ajax) {
      const url = this.config.ajax.url;
      this._apiService.doGet2<any>(url).subscribe(
        response => {
          this._asyncData = response.Data;
          this._asyncData.forEach(item => {
            const newOption = new Option(item.text, item.value);
            $(selectID).append(newOption);
          });
        },
        error2 => {
        },
        () => {
          $(selectID).select2({placeholder: placeholder});
        }
      );
    }
  }

  changeValue(event) {
    console.log(event);
  }
}
