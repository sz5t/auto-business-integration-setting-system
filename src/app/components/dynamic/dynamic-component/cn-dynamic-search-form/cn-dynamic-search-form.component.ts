import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {CnDynamicFormsComponent} from '../cn-dynamic-form/cn-dynamic-forms.component';

@Component({
  selector: 'cn-dynamic-search-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-dynamic-search-form.component.html',
  styleUrls: ['./cn-dynamic-search-form.component.css']
})
export class CnDynamicSearchFormComponent implements OnInit {
  @ViewChild(CnDynamicFormsComponent)
  form: CnDynamicFormsComponent;

  @Input() searchFormConfig: any;
  @Input() captionConfig: any;
  @Output() eventCallback: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {

  }

  submit(value: { [name: string]: any }) {
    this.eventCallback.emit(value);
  }

}
