import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from '../form-models/IField';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
declare let $: any;
@Component({
  selector: 'cn-form-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-form-select.component.html',
  styleUrls: ['./cn-form-select.component.css']
})
export class CnFormSelectComponent implements IField, OnInit, AfterViewInit {

  submitValid: boolean;
  config: IFieldConfig;
  group: FormGroup;


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    $('.bs-select').selectpicker();
  }
}
