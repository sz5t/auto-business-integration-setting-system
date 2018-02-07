import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {LayoutResolver} from '../../../../framework/resolver/layout.resolver';
import {ICnComponent} from '../../../component-models/component.interface';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'cn-dynamic-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-dynamic-detail.component.html',
  styleUrls: ['./cn-dynamic-detail.component.css']
})
export class CnDynamicDetailComponent implements OnInit, ICnComponent, OnChanges {
  @Input() componentConfig: any;
  _title;
  _fields;
  _data;

  constructor(private apiService: ApiService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.componentConfig && this.componentConfig.selectedIds) {
      this.getDetailData();
    }
  }
  ngOnInit() {
    this._title = this.componentConfig.detailViewCfg.title;
    this.componentConfig.detailViewCfg.fields.forEach((items) => {
      items.forEach((item) => {
        item = new LayoutResolver(item).config;
      });
    });
    this._fields = this.componentConfig.detailViewCfg.fields;
  }

  getDetailData() {
    const resource = this.componentConfig.detailConfigClass;
    const id = this.componentConfig.selectedIds.get('detailId');
    const id_key = this.componentConfig['idKey'];
    this.apiService.doGet2<any>(resource, {id_key, id}).subscribe(
      result => {
        this._data = result.data;
      }
    );
  }
}
