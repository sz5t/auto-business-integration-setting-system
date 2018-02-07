import {Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../services/config.service';
import {ConfigAdapter} from '../../framework/adapter/config.adapter';
import {Broadcaster} from '../../broadcast/broadcaster';
import {GridViewTemplateComponent} from '../grid-view-template/grid-view-template.component';
import {Configuration} from '../../framework/configuration';
import {Subscription} from 'rxjs/Subscription';
import {CnGridViewComponent} from '../../components/grid/cn-gridview/cn-gridview.component';
import {IFieldConfig} from '../../components/form/form-models/IFieldConfig';
import {CommonUtility} from '../../framework/utility/common-utility';
import {MasterGridViewResolver} from '../../framework/resolver/gridview.resolver';
import {EVENT_TYPE} from '../../framework/event/button-event';
import {ClientStorageService} from '../../services/client-storage.service';
declare let $: any;
@Component({
  selector: 'cn-tree-grid-template',
  templateUrl: './tree-grid-template.component.html',
  styleUrls: ['./tree-grid-template.component.css']
})
export class TreeGridTemplateComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(CnGridViewComponent) cnGridView: CnGridViewComponent;

  _treeConfig;
  _gridConfig;
  _rowCallback;
  _selectedItem;
  _broadcastObj: Subscription;

  _formConfig: IFieldConfig[] = [];
  _buttonsConfig: any[];
  _formEventSetting;

  _confirmTitle: string;
  _confirmMessage: string;
  _confirmEventSetting;
  _formDialogTitle = '表单';
  _GUID: string = CommonUtility.uuID(6);

  constructor(private route: ActivatedRoute,
              private configService: ConfigService,
              private _broadcast: Broadcaster,
              private _clientStorage: ClientStorageService) {
    this.route.params.subscribe(params => {
      const data = ConfigAdapter.moduleFinder(
        this.configService.getProjectConfig(),
        params.name
      );
      this._treeConfig = data[0].totalArea.pageConfigs[0];
      this._gridConfig = {
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
          {data: 'qq', visible: false},
          {data: 'ww', visible: false},
          {data: 'ee', visible: false},
          {visible: false, data: 'ABwddCX'},
          {visible: false, data: 'ABqwCX'},
          {visible: false, data: 'ABweCX'},
          {visible: false, data: 'ABvdgCX'},
          {visible: false, data: 'ABsdCX'},
          {visible: false, data: 'ABcsCX'},
          {visible: false, data: 'ABdfCX'},
          {visible: false, data: 'ABcdCX'},
          {visible: false, data: 'ABcceeCX'},
          {visible: false, data: 'ABCwX'},
          {visible: false, data: 'AB4CX'},
          {visible: false, data: 'ABdCX'},
          {visible: false, data: 'AB5CX'},
          {visible: false, data: 'AB6CX'},
          {visible: false, data: 'AB7CX'},
          {visible: false, data: 'AB8CX'},
          {visible: false, data: 'AB9CX'},
          {visible: false, data: 'A0BCX'},
          {visible: false, data: 'ABC--X'},
          {visible: false, data: 'ABC8X'},
        ]
      };
    });
  }

  ngOnChanges(){

  }

  ngOnInit() {
    this._rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td', row).unbind('click');
      $('td', row).bind('click', () => {
        this._selectedItem = data;
      });
    };
    this._broadcastObj = this._broadcast.on<any>('tree_master').subscribe(data => {
      let url;
      this._gridConfig = this.initGrid(data.pageConfigs[0], data.parentItemNode);
    });
  }

  ngOnDestroy(){
    this._broadcastObj.unsubscribe();
  }

  initGrid(config, filterItem = null) {
    let gridConfig: DataTables.Settings = {};
    let buttonsConfig;
    if (config && config.viewCfg) {
      const masterResolver = new MasterGridViewResolver(config.viewCfg, this.getCredential(), "123");
      masterResolver.filterItem = filterItem;
      masterResolver.gridConfig && (() => {
        gridConfig = masterResolver.gridConfig;
        gridConfig.rowCallback = this._rowCallback;
        gridConfig.language = {
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
        };

        const hasButton = masterResolver.buttonConfig
          && (buttonsConfig = masterResolver.buttonConfig);

        // hasButton && (gridConfig.buttons = this.initButton(buttonsConfig));
      })();

    }
    return gridConfig;
  }

  getCredential(): string {
    const onlineUser = this._clientStorage.getCookies('onlineUser');
    return onlineUser ? onlineUser.Token : '';
  }
  initButton(data): any[]{
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
          case EVENT_TYPE.confirm:
            this._confirmMessage = btn.events.text;
            this._confirmTitle = btn.events.title;
            this._confirmEventSetting = btn.events.execution;
            $('#basic_dialog_' + this._GUID).modal('show');
            break;
          case EVENT_TYPE.dialog:
            this._formConfig = btn.formConfig;
            this._formEventSetting = btn.events.execution;
            $('#formDialig_' + this._GUID).modal('show');
            break;
        }
      };
      btns.push(btn);
    }
    return btns;
  }

  reload(){

  }
}
