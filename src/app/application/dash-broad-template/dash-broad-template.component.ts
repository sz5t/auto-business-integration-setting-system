import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'cn-dashbroad-template',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dash-broad-template.component.html',
  styleUrls: ['./dash-broad-template.component.css']
})
export class DashBroadTemplateComponent implements OnInit {
  _config = [
    [
      {
        'title': '数据增长区域',
        'titleColor': 'font-green',
        'titleIcon': 'fa fa-cogs',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'note': {
          'type': 'note-info',
          'title': '图表数据',
          'text': '当前数据为固定提供数据类型'
        },
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
          'component': 'chart_counter',
          'classType': 'ChartView',
          'chartConfig': [
            {
              'layout': 'col-lg-3 col-md-3 col-sm-6 col-xs-12',
              'fontColor': 'font-green-sharp',
              'progressColor': 'green',
              'icon': 'icon-pie-chart',
              'title': '营业额',
              'subTitle': '增长',
              'total': 7800,
              'percent': '78%',
              'unit': '万元'
            },
            {
              'layout': 'col-lg-3 col-md-3 col-sm-6 col-xs-12',
              'fontColor': 'font-purple',
              'progressColor': 'purple',
              'icon': 'icon-trophy',
              'title': '总利润',
              'subTitle': '增长',
              'total': 453,
              'percent': '34%',
              'unit': '万'
            },
            {
              'layout': 'col-lg-3 col-md-3 col-sm-6 col-xs-12',
              'fontColor': 'font-blue-sharp',
              'progressColor': 'blue',
              'icon': 'icon-user-following',
              'title': '使用率',
              'subTitle': '增长',
              'total': 6543,
              'percent': '73%',
              'unit': '次/小时'
            },
            {
              'layout': 'col-lg-3 col-md-3 col-sm-6 col-xs-12',
              'fontColor': 'font-red',
              'progressColor': 'red',
              'icon': 'icon-like',
              'title': '好评',
              'subTitle': '增长',
              'total': 1253,
              'percent': '56%',
              'unit': '个'
            }
          ]
        }
      }
    ],
    [
      {
        'title': '柱状图区域',
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
          'component': 'chart_bar',
          'classType': 'ChartView',
          'chartConfig': {
            title: {
              text: '堆叠区域图'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'top'
                  }
                },
                areaStyle: {normal: {}},
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
        }
      },
      {
        'title': '柱状图区域',
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
          'component': 'chart_bar',
          'classType': 'ChartView',
          'chartConfig': {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                  normal: {
                    position: 'inner'
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  {value: 335, name: '直达', selected: true},
                  {value: 679, name: '营销广告'},
                  {value: 1548, name: '搜索引擎'}
                ]
              },
              {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                  normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                      a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                      },
                      // abg: {
                      //     backgroundColor: '#333',
                      //     width: '100%',
                      //     align: 'right',
                      //     height: 22,
                      //     borderRadius: [4, 4, 0, 0]
                      // },
                      hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      b: {
                        fontSize: 16,
                        lineHeight: 33
                      },
                      per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                      }
                    }
                  }
                },
                data: [
                  {value: 335, name: '直达'},
                  {value: 310, name: '邮件营销'},
                  {value: 234, name: '联盟广告'},
                  {value: 135, name: '视频广告'},
                  {value: 1048, name: '百度'},
                  {value: 251, name: '谷歌'},
                  {value: 147, name: '必应'},
                  {value: 102, name: '其他'}
                ]
              }
            ]
          }
        }
      }
    ]
  ];
  constructor() {
  }

  ngOnInit() {
  }

}
