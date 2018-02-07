import {
  AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {IDynamicDialog, IDynamicDialogField} from '../dynamic-dialog.model';
import {CnDynamicFormComponent} from '../../../form/cn-dynamic-form.component';
import {CnToastComponent, ToastType} from '../../../toast/cn-toast/cn-toast.component';
import {ButtonEvent} from '../../../../framework/event/button-event';
import {ApiService} from '../../../../services/api.service';
import {Broadcaster} from '../../../../broadcast/broadcaster';
import {Subscription} from 'rxjs/Subscription';
declare let $: any;
@Component({
  selector: 'cn-dynamic-form-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-form-dialog.component.html',
  styleUrls: ['./dynamic-form-dialog.component.css']
})
export class CnDynamicFormDialogComponent implements OnInit, IDynamicDialog, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild(CnDynamicFormComponent)
  form: CnDynamicFormComponent;

  @ViewChild(CnToastComponent)
  toastComponent: CnToastComponent;

  @Input() dialogConfigField: IDynamicDialogField;
  @Input() handleData;
  @Input() selectedIds;
  _subscribe: Subscription;
  _submitValid = true;

  constructor(private _apiService: ApiService,
              private _broadcast: Broadcaster) {
  }

  ngOnInit() {
    this.registerBroadcast();
  }

  ngAfterViewInit(): void {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        // this.form.setDisabled('submit', !previousValid);

      }
    });
  }

  ngOnChanges(): void {
    const config = this.dialogConfigField;
    if (this.handleData && this.dialogConfigField && config.eventSetting.method === 'put') {
      delete this.handleData.$type;
      for (const d in this.handleData) {
        if (this.handleData.hasOwnProperty(d) && this.form) {
          this.form.setValue(d, this.handleData[d]);
        }
      }
    }
  }

  registerBroadcast() {
    this._subscribe = this._broadcast.on<any>(this.dialogConfigField.GUID).subscribe(data => {

      const config = this.dialogConfigField;
      if (data && this.dialogConfigField && config.eventSetting.method === 'put') {
        delete data.$type;
        for (const d in data) {
          if (this.handleData.hasOwnProperty(d) && this.form) {
            this.form.setValue(d, data[d]);
          }
        }
      }
    });
  }

  submit(value: { [name: string]: any }) {
    this._submitValid = this.form.valid;
    const isNext = $('#saveAndGo').prop('checked');
    if (!this.form.valid) {
      return false;
    }
    const event = new ButtonEvent();
    const url = this.dialogConfigField.eventSetting.api;
    const method = this.dialogConfigField.eventSetting.method;
    const params = '';
    event.execute(this._apiService, url, method, params, value)
      .subscribe(
        result => {
          this.toastComponent.showToast(ToastType.TOAST_SUCCESS, '', '执行成功');
          this.form.resetFormValue();
        },
        error => {
          this.toastComponent.showToast(ToastType.TOAST_ERROR, error, '出现错误');
        },
        () => {
          if (!isNext) {
            $('#formDialig_' + this.dialogConfigField.GUID).modal('hide');
          }
          this.dialogConfigField.eventCallBack.emit();
        }
      );
  }

  ngOnDestroy(): void {
    if (this._subscribe) {
      this._subscribe.unsubscribe();
    }
  }
}
