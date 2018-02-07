import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ICnComponent} from '../../../component-models/component.interface';
declare let $: any;
@Component({
  selector: 'cn-dynamic-chart-counters',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-chart-counters.component.html',
  styleUrls: ['./dynamic-chart-counters.component.css']
})
export class CnDynamicChartCountersComponent implements OnInit, ICnComponent, AfterViewInit {
  @Input() componentConfig: any;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $('[data-counter=\'counterup\']').counterUp({
      delay: 10,
      time: 600
    });
  }
}
