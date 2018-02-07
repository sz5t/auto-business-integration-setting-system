import { Component, OnInit } from '@angular/core';
import {IField} from "../form-models/IField";
import {IFieldConfig} from "../form-models/IFieldConfig";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'cn-form-textarea',
  templateUrl: './cn-form-textarea.component.html',
  styleUrls: ['./cn-form-textarea.component.css']
})
export class CnFormTextareaComponent implements IField {
  submitValid: boolean;
  config: IFieldConfig;
  group: FormGroup;

}
