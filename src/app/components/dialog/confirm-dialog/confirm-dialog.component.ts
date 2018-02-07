import {
  Component, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ButtonEvent} from '../../../framework/event/button-event';
import {ApiService} from '../../../services/api.service';
import {CnToastComponent, ToastType} from '../../toast/cn-toast/cn-toast.component';
declare let $: any;
@Component({
  selector: 'cn-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @ViewChild(CnToastComponent)
  toastComponent: CnToastComponent;
  @Input() message: string;
  @Input() title: string;
  @Input() confirmEventSetting;
  @Input() handleData: Map<string, string>;
  @Input() GUID;
  @Output() eventCallback: EventEmitter<string> = new EventEmitter<string>();

  constructor(private apiService: ApiService) {
  }

  onClick() {

    const url: string = this.confirmEventSetting.api || '';
    const method: string = this.confirmEventSetting.method || 'get';
    let params = this.confirmEventSetting.paramsMap || {};
    if (method === 'delete') {
      params = {'_ids': Array.from(this.handleData.values()).join(',')};
    }
    if (this.handleData) {
      const event = new ButtonEvent();
      event.execute(this.apiService, url, method, params, this.handleData).subscribe(
        result => {
          this.toastComponent.showToast(ToastType.TOAST_SUCCESS, 'success', '执行成功');
        },
        error => {
          // errors should be written in operation system log
          // show error message to user
          this.toastComponent.showToast(ToastType.TOAST_ERROR, 'error', error);
          console.error('error', error);
        },
        () => {
          $('#basic_dialog_' + this.GUID).modal('hide');
          this.eventCallback.emit();
        }
      );
    }

  }

  callback() {

  }

  ngOnInit() {
  }

}
