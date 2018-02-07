import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ICnComponent} from '../../../component-models/component.interface';
import {CommonUtility} from '../../../../framework/utility/common-utility';
import * as ECharts from 'echarts';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

declare let echarts: any;
@Component({
  selector: 'cn-dynamic-chart-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-chart-bar.component.html',
  styleUrls: ['./dynamic-chart-bar.component.css']
})
export class CnDynamicChartBarComponent implements OnInit, ICnComponent, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() componentConfig;
  @ViewChild('myBar') barDiv: ElementRef;
  _GUID = CommonUtility.uuID(6);
  chart_bar: ECharts.ECharts;
  _obs: Subscription;

  constructor() {
  }

  ngOnInit() {
    this._obs = Observable.fromEvent(window, 'resize')
      .subscribe(event => {
        this.onResize();
      });
  }

  ngAfterViewInit() {
    // this.barDiv.nativeElement.style.width = '50%';
    this.barDiv.nativeElement.style.height = '500px';
    this.chart_bar = echarts.init(this.barDiv.nativeElement);
    this.chart_bar.setOption(this.componentConfig.chartConfig);
  }

  onResize() {
    if (this.chart_bar) {
      this.chart_bar.resize();
    }
  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {
    this._obs.unsubscribe();
  }
}
