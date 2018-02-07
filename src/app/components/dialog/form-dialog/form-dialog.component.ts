import {
  AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, OnChanges,
  ViewEncapsulation
} from '@angular/core';
import {CnDynamicFormComponent} from '../../form/cn-dynamic-form.component';
import {IFieldConfig} from '../../form/form-models/IFieldConfig';
import {ApiService} from '../../../services/api.service';
import {ButtonEvent} from '../../../framework/event/button-event';
import {CnToastComponent, ToastType} from '../../toast/cn-toast/cn-toast.component';
declare let $: any;
@Component({
  selector: 'cn-form-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements AfterViewInit, OnChanges {
  @ViewChild(CnDynamicFormComponent)
  form: CnDynamicFormComponent;
  @ViewChild(CnToastComponent)
  toastComponent: CnToastComponent;
  @Input() formEventSetting;
  @Input() title: string;
  @Input() config: IFieldConfig[];
  @Input() GUID: string;
  @Input() handleData;

  @Output() eventCallback: EventEmitter<string> = new EventEmitter<string>();
  _submitValid = true;

  constructor(private apiService: ApiService) {
  }

  ngOnChanges() {
    if (this.handleData
      && this.formEventSetting
      && this.formEventSetting.method === 'put') {
      delete this.handleData.$type;
      for (const d in this.handleData) {
        if (this.handleData.hasOwnProperty(d) && this.form) {
          this.form.setValue(d, this.handleData[d]);
        }
      }

    }
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        // this.form.setDisabled('submit', !previousValid);

      }
    });
    // this.form.setDisabled('submit',true);
    // this.form.setValue('name', '');
  }

  submit(value: { [name: string]: any }) {
    this._submitValid = this.form.valid;
    const isNext = $('#saveAndGo').prop('checked');
    if (!this.form.valid) {
      return false;
    }
    const event = new ButtonEvent();
    const url = this.formEventSetting.api;
    const method = this.formEventSetting.method;
    const params = '';
    event.execute(this.apiService, url, method, params, value).subscribe(
      result => {
        this.toastComponent.showToast(ToastType.TOAST_SUCCESS, '', '执行成功');
        this.form.resetFormValue();
      },
      error2 => {
        this.toastComponent.showToast(ToastType.TOAST_ERROR, error2, '出现错误');
      },
      () => {
        if (!isNext) {
          $('#formDialig_' + this.GUID).modal('hide');
        }
        this.eventCallback.emit();
      }
    );
  }

}
