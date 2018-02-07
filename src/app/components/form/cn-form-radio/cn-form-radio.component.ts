import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from "../form-models/IField";
import {IFieldConfig} from "../form-models/IFieldConfig";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'cn-form-radio',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './cn-form-radio.component.html',
  styleUrls: ['./cn-form-radio.component.css']
})
export class CnFormRadioComponent implements IField {
  submitValid: boolean;
  config:IFieldConfig;
  group:FormGroup;
}
