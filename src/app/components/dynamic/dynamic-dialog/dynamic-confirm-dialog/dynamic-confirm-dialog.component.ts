import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {IDynamicDialog, IDynamicDialogField} from '../dynamic-dialog.model';
import {CnToastComponent, ToastType} from '../../../toast/cn-toast/cn-toast.component';
import {ApiService} from '../../../../services/api.service';
import {ButtonEvent} from '../../../../framework/event/button-event';
declare let $: any;
@Component({
  selector: 'cn-dynamic-confirm-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-confirm-dialog.component.html',
  styleUrls: ['./dynamic-confirm-dialog.component.css']
})
export class CnDynamicConfirmDialogComponent implements OnInit, IDynamicDialog {
  @ViewChild(CnToastComponent)
  toastComponent: CnToastComponent;
  @Input() dialogConfigField: IDynamicDialogField;
  @Input() handleData: any;
  @Input() selectedIds: Map<string, string>;
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  onClick() {
    const config = this.dialogConfigField;
    const url = config.eventSetting.api;
    const method = config.eventSetting.method || 'get';
    let params = config.eventSetting.paramsMap || {};
    if (url && url.length > 0) {
      if (method === 'delete') {
        params = {'_ids': Array.from(this.selectedIds.values()).join(',')};
      }

      const event = new ButtonEvent();
      event.execute(this.apiService, url, method, params, this.handleData)
        .subscribe(
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
            $('#basic_dialog_' + config.GUID).modal('hide');
            this.dialogConfigField.eventCallBack.emit();
          }
        );
    }
  }
}
