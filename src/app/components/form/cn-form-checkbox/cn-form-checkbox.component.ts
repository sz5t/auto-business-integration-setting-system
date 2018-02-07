import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from "../form-models/IField";
import {IFieldConfig} from "../form-models/IFieldConfig";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'cn-form-checkbox',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './cn-form-checkbox.component.html',
  styleUrls: ['./cn-form-checkbox.component.css']
})
export class CnFormCheckboxComponent implements IField {
  submitValid: boolean;
  config:IFieldConfig;
  group:FormGroup;

}
