import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Broadcaster} from '../../broadcast/broadcaster';
import {Subscription} from 'rxjs/Subscription';
import {GridViewTemplateComponent} from '../grid-view-template/grid-view-template.component';
import {Configuration} from '../../framework/configuration';

@Component({
  selector: 'cn-slaver-grid-template',
  templateUrl: './slaver-grid-template.component.html',
  styleUrls: ['./slaver-grid-template.component.css']
})
export class SlaverGridTemplateComponent implements OnInit, OnDestroy {
  @ViewChild(GridViewTemplateComponent)
  gridViewTemplateComponent: GridViewTemplateComponent;

  // @Input() funcName;

  @Input() slaverConfig;
  _broadcastObj: Subscription;
  _selectedItem: any;
  _rowCallback: Function;

  constructor(private broadcast: Broadcaster) {

  }
  ngOnInit() {
    this._rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td', row).unbind('click');
      $('td', row).bind('click', () => {
        this._selectedItem = data;
      });
    };
    this._broadcastObj = this.broadcast.on<string>('master').subscribe(data => {
      if (this.slaverConfig.viewCfg && this.slaverConfig.viewCfg.filterConfig) {
        const filter = this.slaverConfig.viewCfg.filterConfig[0];
        let condition = '' ;
        for (const propLink of filter.propLinks) {
          if (data) {
            condition += propLink['slaveProp'] + '=' + data[propLink.masterProp] + '&';
          }
        }
        const url = Configuration.web_api + filter.slaveClass + '?' + condition.substring(0, condition.length - 1);
        this.gridViewTemplateComponent.reload(url);
      }
    });
  }

  ngOnDestroy() {
    this._broadcastObj.unsubscribe();
  }
}
