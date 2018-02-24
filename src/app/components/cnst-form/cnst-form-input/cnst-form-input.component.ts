import {Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, OnChanges, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IField} from '../../form/form-models/IField';
import {IFieldConfig} from '../../form/form-models/IFieldConfig';

@Component({
  selector: 'cnst-form-input',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-form-input.component.html',
  styleUrls: ['./cnst-form-input.component.css']
})
export class CnstFormInputComponent implements IField, OnInit, AfterViewInit, OnChanges {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;
  _control;
  ngOnInit(){
    this._control = this.group.get(this.config.name);
  }
  ngOnChanges(){
  }
  ngAfterViewInit(){
  }
}
