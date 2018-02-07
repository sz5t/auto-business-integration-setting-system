/**
 * Created by zhaoxinlei on 2017/11/28.
 */
import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs/Subject';
import {IDynamicDialogField} from '../../dynamic-dialog/dynamic-dialog.model';
import {Broadcaster} from '../../../../broadcast/broadcaster';
import {EVENT_TYPE} from '../../../../framework/event/button-event';
import {CommonUtility} from '../../../../framework/utility/common-utility';
import {ICnComponent} from '../../../component-models/component.interface';
import {Subscription} from 'rxjs/Subscription';
import {ComponentConfigFactory} from '../../../../framework/factory/component-config.factory';
import {ClientStorageService} from '../../../../services/client-storage.service';
declare let $: any;
@Component({
  selector: 'cn-dynamic-gridview-mulit',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-dynamic-gridview.component.html',
  styleUrls: ['./cn-dynamic-gridview.component.css']
})
export class CnDynamicGridviewMultiComponent implements OnInit, ICnComponent, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @Input() captionConfig;
  @Input() componentConfig;
  searchFormConfig;
  gridConfig;
  _GUID: string;
  handleData;
  dtTrigger: Subject<object> = new Subject();
  _subscribeStruct: Subscription;
  _rowCallback;
  _selectedItem;
  checkedValue: Map<string, string> = new Map<string, string>();
  constructor(private _broadcast: Broadcaster,
              private _clientStorage: ClientStorageService) {
    this.gridConfig = {
      language: {
        'processing': '处理中...',
        'lengthMenu': '显示 _MENU_ 项结果',
        'zeroRecords': '没有匹配结果',
        'info': '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
        'infoEmpty': '显示第 0 至 0 项结果，共 0 项',
        'infoFiltered': '(由 _MAX_ 项结果过滤)',
        'infoPostFix': '',
        'search': '搜索:',
        'url': '',
        'emptyTable': '表中数据为空',
        'loadingRecords': '载入中...',
        'thousands': ',',
        'paginate': {
          'first': '首页',
          'previous': '上一页',
          'next': '下一页',
          'last': '末页'
        },
        'aria': {
          'sortAscending': ': 以升序排列此列',
          'sortDescending': ': 以降序排列此列'
        }
      },
      pagingType: 'full_numbers',
      columns: [
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''},
        {visible: false, data: ''}
      ]
    };
  }

  ngOnInit() {
    this._GUID = CommonUtility.uuID(4);
    this.componentConfig.searchForm && (this.searchFormConfig = this.componentConfig.searchForm);
    this._rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td', row).unbind('click');
      $('td', row).bind('click', () => {
        this.handleData = data;
      });
    };
    this.registerSubscribeStruct();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  initGrid(originConfig, parentItemData = null) {
    return ComponentConfigFactory.createComponentConfig(
      originConfig,
      this.getCredential(),
      this.getCustomerId(),
      parentItemData
    );
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
      btns.push(btn);
    }
    return btns;
  }

  reload(newURL?: string): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if (newURL) {
        dtInstance.ajax.url(newURL).load();
      }
      else {
        dtInstance.ajax.reload();
      }
    });
  }

  registerSubscribeStruct() {
    this._subscribeStruct = this._broadcast.on<any>(this.componentConfig.parentViewId).subscribe(data => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        const config = this.initGrid(data.pageConfigs[0].viewCfg, data.parentItemNode);
        this.gridConfig = null;
        this.gridConfig = config;
        this.componentConfig.searchForm && (this.searchFormConfig = this.componentConfig.searchForm);
        this.gridConfig.buttons = this.initButton(this.gridConfig.toolbarsConfig);
        this.gridConfig.rowCallback = (row: Node, data: any[] | Object, index: number) => {
          $('td', row).unbind('click');
          $('td', row).bind('click', () => {
            this.handleData = data;
            this._broadcast.broadcast(this.gridConfig.viewId, data);
          });
        };
        //dtInstance.destroy();
        dtInstance.clear();
        this.dtElement.dtOptions = this.gridConfig;
        this.dtElement.dtTrigger.next();
        dtInstance.draw();
      });
    });
  }

  getCredential(): string {
    const onlineUser = this._clientStorage.getCookies('onlineUser');
    return onlineUser ? onlineUser.Token : '';
  }

  getCustomerId() {
    const customerId = this._clientStorage.getCookies('customerId');
    return customerId;
  }

  ngOnDestroy(): void {
    if (this._subscribeStruct) {
      this._subscribeStruct.unsubscribe();
    }
  }
}
