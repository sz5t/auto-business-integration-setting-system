import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IFieldConfig} from "../form-models/IFieldConfig";
import {FormGroup} from "@angular/forms";
import {IField} from "../form-models/IField";

@Component({
  selector: 'cn-form-search-button',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-form-search-button.component.html',
  styleUrls: ['./cn-form-search-button.component.css']
})
export class CnFormSearchButtonComponent implements OnInit, IField {
  submitValid: boolean;
  config: IFieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

}
