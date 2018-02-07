import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from '../form-models/IField';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'cn-form-button',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-form-button.component.html',
  styleUrls: ['./cn-form-button.component.css']
})
export class CnFormButtonComponent implements IField {
  submitValid: boolean;
  config: IFieldConfig;
  group: FormGroup;
}
