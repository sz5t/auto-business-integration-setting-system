import { Component, OnInit } from '@angular/core';
import {IField} from "../form-models/IField";
import {IFieldConfig} from "../form-models/IFieldConfig";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'cn-form-submit',
  templateUrl: './cn-form-submit.component.html',
  styleUrls: ['./cn-form-submit.component.css']
})
export class CnFormSubmitComponent implements OnInit, IField {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;

  constructor() { }

  ngOnInit() {
  }

}
