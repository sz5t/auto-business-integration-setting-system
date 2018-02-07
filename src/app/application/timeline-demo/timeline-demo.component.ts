import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cn-timeline-demo',
  templateUrl: './timeline-demo.component.html',
  styleUrls: ['./timeline-demo.component.css']
})
export class TimelineDemoComponent implements OnInit {
  _config = [
    [
      {
        'title': '时间线',
        'titleColor': 'font-green',
        'titleIcon': 'fa fa-cogs',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'size': {
          'xsCol': {
            'value': '12',
            'offset': ''
          },
          'smCol': {
            'value': '12',
            'offset': ''
          },
          'mdCol': {
            'value': '12',
            'offset': ''
          },
          'lgCol': {
            'value': '12',
            'offset': ''
          }
        },
        'viewCfg': {
          'component': 'timeline_horizontal',
          'classType': 'ChartView',
        }
      }
    ]
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
