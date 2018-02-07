import {Component, OnInit} from '@angular/core';
import {IField} from "../form-models/IField";
import {IFieldConfig} from "../form-models/IFieldConfig";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'cn-form-row',
  templateUrl: './cn-form-row.component.html',
  styleUrls: ['./cn-form-row.component.css']
})
export class CnFormRowComponent implements OnInit, IField {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
