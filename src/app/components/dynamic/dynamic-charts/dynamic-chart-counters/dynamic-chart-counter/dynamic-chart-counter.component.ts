import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ICnComponent} from '../../../../component-models/component.interface';
import {CommonUtility} from '../../../../../framework/utility/common-utility';
declare let $: any;
@Component({
  selector: 'cn-dynamic-chart-counter',
  //encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-chart-counter.component.html',
  styleUrls: ['./dynamic-chart-counter.component.css']
})
export class CnDynamicChartCounterComponent implements OnInit, ICnComponent, AfterViewInit {
  @Input() componentConfig: any;
  _GUID = CommonUtility.uuID(6);

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $('#' + this._GUID).attr('data-value', this.componentConfig.total);
  }
}
