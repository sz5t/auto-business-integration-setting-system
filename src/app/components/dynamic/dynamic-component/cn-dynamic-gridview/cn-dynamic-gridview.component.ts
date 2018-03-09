import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs/Subject';
import {IDynamicDialogField} from '../../dynamic-dialog/dynamic-dialog.model';
import {Broadcaster} from '../../../../broadcast/broadcaster';
import {ButtonEvent, EVENT_TYPE} from '../../../../framework/event/button-event';
import {CommonUtility} from '../../../../framework/utility/common-utility';
import {ICnComponent} from '../../../component-models/component.interface';
import {Subscription} from 'rxjs/Subscription';
import {Configuration} from '../../../../framework/configuration';
import {OpPermissionResolver} from '../../../../framework/resolver/op.permission.resolver';
import {ClientStorageService} from '../../../../services/client-storage.service';
import {CnToastComponent, ToastType} from '../../../toast/cn-toast/cn-toast.component';
import {ApiService} from '../../../../services/api.service';
import {environment} from '../../../../../environments/environment';
declare let $: any;
@Component({
  selector: 'cn-dynamic-gridview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-dynamic-gridview.component.html',
  styleUrls: ['./cn-dynamic-gridview.component.css']
})
export class CnDynamicGridviewComponent implements OnInit, ICnComponent, AfterViewInit, OnDestroy {

  @ViewChild('datatable')
  tableDiv: ElementRef;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @ViewChild(CnToastComponent)
  toastComponent: CnToastComponent;

  @Input() componentConfig;
  @Input() captionConfig;
  _GUID: string;
  handleData;
  gridConfig;
  searchFormConfig;
  detailConfig;
  dtTrigger: Subject<object> = new Subject();
  dialogConfig: IDynamicDialogField;
  _subscribe: Subscription;
  checkedValue: Map<string, string> = new Map<string, string>();
  constructor(private _broadcast: Broadcaster,
              private _localStorage: ClientStorageService,
              private apiService: ApiService) {

  }

  ngOnInit() {
    this._GUID = CommonUtility.uuID(4);
    this.gridConfig = this.componentConfig;
    this.componentConfig.searchForm && (this.searchFormConfig = this.componentConfig.searchForm);
    this.gridConfig.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td', row).unbind('click');
      $('td', row).bind('click', () => {
        this.handleData = data;
        this._broadcast.broadcast(this.gridConfig.viewId, data);
      });
    };
    this.gridConfig.buttons = this.initButton(this.componentConfig.toolbarsConfig);
    if (this.gridConfig.filterConfig && Array.isArray(this.gridConfig.filterConfig)) {
      this.registerSubscribe();
    }
  }

  ngAfterViewInit() {
    const that = this;
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstabce) => {
      const $element = $(this.tableDiv.nativeElement);
      // init cell button event
      dtInstabce.on('click.dt', (event) => {
        // button click and stop propagation
        $(event.target).attr('data-name')
        && $(event.target).attr('data-name') === 'dtAction'
        && event.stopPropagation();

        const $btn = $(event.target);
        let data;
        const d = $btn.attr('data-opt');
        const id = $btn.attr('data-id');
        d && (data = JSON.parse(d));
        // confirmation button
        if ($(event.target).attr('data-toggle') === 'confirmation') {
          const con = $('[data-toggle="confirmation"]').confirmation({
            placement: 'top',
            title: data.text ? data.text : '是否继续？',
            btnOkLabel: '确认',
            btnCancelLabel: '取消',
            btnOkClass: 'btn btn-success',
            btnCancelClass: 'btn btn-default',
            singleton: true,
            popout: true,
            onConfirm: (e) => {
              e.stopPropagation();
              this.doConfirm(data.execution, id);
            },
            onCancel: (e) => {
              e.stopPropagation();
            }
          });
        }
        // detail button
        if ($(event.target).attr('data-toggle') === 'detail') {
          this._broadcast.broadcast(`detail_${this._GUID}`, {'detailId': id});
          $('#detail_dialog_' + this._GUID).modal('show');
        }
      });
      // init checked all event
      $element.find('.group-checkable').change(function () {
        const set = $(this).attr('data-set');
        const checked = $(this).is(':checked');
        $element.find('.checkboxes').each(function () {
          if (checked) {
            $(this).prop('checked', true);
            $(this).parents('tr').addClass('active');
            that.checkedValue.set($(this).val(), $(this).val());
          } else {
            $(this).prop('checked', false);
            $(this).parents('tr').removeClass('active');
            that.checkedValue.clear();
          }
        });
      });
      $element.on('change', 'tbody tr .checkboxes', function () {
        $(this).parents('tr').toggleClass('active');
        if ($(this).prop('checked') === true) {
          that.checkedValue.set($(this).val(), $(this).val());
        } else {
          that.checkedValue.delete($(this).val());
        }
      });
    });
  }

  doConfirm(eventSetting, id) {
    const url: string = eventSetting.api || '';
    const method: string = eventSetting.method || 'get';
    const params = eventSetting.paramsMap || {};
    if (eventSetting.keyId && eventSetting.keyId.trim().length > 0) {
      params[eventSetting.keyId] = id || '';
    }
    const event = new ButtonEvent();
    event.execute(this.apiService, url, method, params, this.handleData).subscribe(
      result => {
        this.toastComponent.showToast(ToastType.TOAST_SUCCESS, '', '执行成功');
        this.reload();
      },
      error => {
        // errors should be written in operation system log
        // show error message to user
        this.toastComponent.showToast(ToastType.TOAST_ERROR, '', error);
        console.error('出现错误', error);
      },
      () => {
      }
    );
  }

  checkAll() {
    $('#checkall').click(function () {
      const check = $(this).prop('checked');
      $('input[name=\'checkchild\']').prop('checked', check);
    });
  }

  initButton(data): any[] {
    const btns = [];
    for (const d of data) {
      const btn = {...d};
      if (d.img) {
        btn.text = btn.text + ' ' + '<i class=\'' + d.img + '\'></i>';
      }
      btn.className = 'btn ' + d.color;
      btn.action = (e, dt, node, config) => {
        switch (btn.events.eventType) {
          case EVENT_TYPE.common:
            break;
          case EVENT_TYPE.confirm_dialog:
            $('#basic_dialog_' + this._GUID + btn.id).modal('show');
            break;
          case EVENT_TYPE.form_dialog:
            this._broadcast.broadcast(this._GUID + btn.id, this.handleData);
            $('#formDialig_' + this._GUID + btn.id).modal('show');
            break;
        }
      };
      const permission = this.checkOpPermissions(btn.events.execution);
      if (permission === Configuration.AppPermissionType.PERMITTED) {
        btn.enabled = true;
        btns.push(btn);
      } else if (permission === Configuration.AppPermissionType.DISABLED) {
        btn.enabled = false;
        btns.push(btn);
      } else if (permission === Configuration.AppPermissionType.INVISIBLE) {
      } else if (permission === Configuration.AppPermissionType.NOT_SET) {
        btns.push(btn);
      } else {
        btns.push(btn);
      }
    }
    return btns;
  }

  checkOpPermissions(execution) {
    return OpPermissionResolver.getResourcePermission(
      execution.method,
      execution.api,
      this._localStorage.getSessionStorage('dataPermissions')
    );
  }

  reload(urlObj?): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if (urlObj) {
        let url = '';
        if (typeof urlObj === 'object') {
          const params = [];
          for (let p in urlObj) {
            if (urlObj.hasOwnProperty(p) && urlObj[p]) {
              params.push(`${p}=${urlObj[p]}`);
            }
          }
          const currentUrl = dtInstance.ajax.url();
          const lastIndex = currentUrl.indexOf('?');
          if (lastIndex > 0) {
            url = currentUrl.substring(0, currentUrl.lastIndexOf('?')) + '?' + params.join('&');
          } else {
            url = currentUrl + '?' + params.join('&');
          }
        } else if (typeof urlObj === 'string') {
          url = urlObj;
        }
        dtInstance.ajax.url(url).load();
      } else {
        dtInstance.ajax.reload();
      }
    });
  }

  registerSubscribe() {
    this._subscribe = this._broadcast.on<any>(this.gridConfig.parentViewId).subscribe(data => {
      if (this.gridConfig && this.gridConfig.filterConfig) {
        const filter = this.gridConfig.filterConfig[0];
        let condition = '';
        for (const propLink of filter.propLinks) {
          if (data) {
            condition += propLink['slaveProp'] + '=' + data[propLink.masterProp] + '&';
          }
        }
        const url = (environment.web_api + filter.slaveClass + '?' + condition.substring(0, condition.length - 1)).replace('{customerId}', this._localStorage.getCookies('customerId'));
        this.reload(url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this._subscribe) {
      this._subscribe.unsubscribe();
    }
  }
}
