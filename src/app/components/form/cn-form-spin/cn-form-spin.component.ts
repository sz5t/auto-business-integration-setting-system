import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from '../form-models/IField';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {CommonUtility} from "../../../framework/utility/common-utility";
declare let $: any;
@Component({
  selector: 'cn-form-spin',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-form-spin.component.html',
  styleUrls: ['./cn-form-spin.component.css']
})
export class CnFormSpinComponent implements OnInit, IField {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;
  _control;
  _GUID = CommonUtility.uuID(6);

  constructor() {
  }

  ngOnInit() {
    this._control = this.group.get(this.config.name);
  }

}
