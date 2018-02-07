import {Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, OnChanges, Input} from '@angular/core';
import {IFieldConfig} from '../form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {IField} from '../form-models/IField';

@Component({
  selector: 'cn-form-input',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-form-input.component.html',
  styleUrls: ['./cn-form-input.component.css']
})
export class CnFormInputComponent implements IField, OnInit, AfterViewInit, OnChanges {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;
  _control;
  ngOnInit(){
    this._control = this.group.get(this.config.name);
  }
  ngOnChanges(){
   /* this.submitValid = this._control.valid;
    console.log(this.submitValid);*/
  }
  ngAfterViewInit(){
  }
}
