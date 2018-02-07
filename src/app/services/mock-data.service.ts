import {Injectable} from '@angular/core';
declare let Mock: any;
@Injectable()
export class MockDataService {
  constructor() {
  }

  createGridData() {
    Mock.mock('http://api.user', {
      'user|5-30': [{
        'name': '@cname',   // 中文名称
        'nick': '@name',
        'age|1-100': 100,   // 100以内随机整数
        'birthday': '@date("yyyy-MM-dd")',  // 日期
        'city': '@city(true)'   // 中国城市
      }]
    });
  }

  //createChildGridData() {}

  createSelectData() {
    Mock.mock('http://api.category', {
      'category|5-15': [{
        'text': '@city(true)',
        'value|+1': 1
      }]
    });
  }


}
