import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IField} from '../../form/form-models/IField';
import {IFieldConfig} from '../../form/form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
declare let $: any;
@Component({
  selector: 'cnst-form-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-form-select.component.html',
  styleUrls: ['./cnst-form-select.component.css']
})
export class CnstFormSelectComponent implements IField, OnInit, AfterViewInit {

  submitValid: boolean;
  config: IFieldConfig;
  group: FormGroup;


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    $('.bs-select').selectpicker();
  }
}
