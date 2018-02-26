import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from '../../form/form-models/IField';
import {IFieldConfig} from '../../form/form-models/IFieldConfig';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'cnst-form-radio',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './cnst-form-radio.component.html',
  styleUrls: ['./cnst-form-radio.component.css']
})
export class CnstFormRadioComponent implements IField {
  submitValid: boolean;
  config:IFieldConfig;
  group:FormGroup;
}
