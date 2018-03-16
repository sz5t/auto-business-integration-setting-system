
import {InMemoryDbService , RequestInfo } from './in-mem';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

export class InMemoryDataService implements InMemoryDbService {
  createDb( reqInfo?: RequestInfo ) {

    const menus = [
      {
        'icon': 'icon-puzzle',
        'title': '配置效果',
        'type': 'nav-item',
        'active': false,
        'sub': [
          {
            'name': 'layoutSetting',
            'icon': 'fa fa-plus',
            'title': '模板选择',
            'type':'module-item',
            'description': '模板选择',
            'display': true,
            'router': 'layout-setting',
            'sub': []
          },
          {
            'name': 'componentSetting',
            'icon': 'fa fa-cogs',
            'title': '区域设置',
            'type':'module-item',
            'description': '区域设置',
            'display': true,
            'router': 'component-setting',
            'sub': []
          },
          {
            'name': 'componentEditing',
            'icon': 'fa fa-plus',
            'title': '组件编辑',
            'type':'module-item',
            'description': '编辑组件',
            'display': true,
            'router': 'componentEditing',
            'sub': []
          },
          {
            'name': 'contextMenu',
            'icon': 'fa fa-cogs',
            'title': '字段设置',
            'type':'module-item',
            'description': '字段设置',
            'display': true,
            'router': 'contextMenu',
            'sub': []
          },
          {
            'name': 'operationSetting',
            'icon': 'fa fa-cogs',
            'title': '操作设置',
            'type':'module-item',
            'description': '操作设置',
            'display': true,
            'router': 'operationSetting',
            'sub': []
          },
          {
            'name': 'subPageSetting',
            'icon': 'fa fa-cogs',
            'title': '子页面设置',
            'type':'module-item',
            'description': '子页面设置',
            'display': true,
            'router': 'subPageSetting',
            'sub': []
          }
        ]
      }
    ]

    const menuShared = [
      {
        'icon': 'icon-puzzle',
        'title': '系统管理',
        'type': 'nav-item',
        'active': false,
        'sub': [
          {
            'name': 'myTest',
            'icon': 'fa fa-plus',
            'title': '用户管理',
            'type':'module-item',
            'description': '用户管理',
            'display': true,
            'router': 'appuser-setting',
            'sub': []
          },
          {
            'name': 'myTest',
            'icon': 'fa fa-cogs',
            'title': '角色管理',
            'type':'module-item',
            'description': '角色管理',
            'display': true,
            'router': 'role-setting',
            'sub': []
          },
          {
            'name': 'myTest',
            'icon': 'fa fa-cogs',
            'title': '模块管理',
            'type':'module-item',
            'description': '模块管理',
            'display': true,
            'router': 'module-Editing',
            'sub': []
          },
          {
            'name': 'myTest',
            'icon': 'fa fa-cogs',
            'title': '基础信息',
            'type':'module-item',
            'description': '基础信息',
            'display': true,
            'router': 'base-Setting',
            'sub': []
          }
        ]
      }
    ]


    const heroes = [
      { id: 1, name: 'Windstorm' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
    ];

    const nobodies: any[] = [ ];

    // entities with string ids that look like numbers
    const stringers = [
      { id: '10', name: 'Bob String'},
      { id: '20', name: 'Jill String'}
    ];

    // default returnType
    let returnType  = 'object';
    // let returnType  = 'observable';
    // let returnType  = 'promise';
    // demonstrate POST commands/resetDb
    // this example clears the collections if the request body tells it to do so
    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        heroes.length = 0;
        nobodies.length = 0;
        stringers.length = 0;
      }

      // 'returnType` can be 'object' | 'observable' | 'promise'
      returnType = body.returnType || 'object';
    }
    const db = { heroes, nobodies, stringers, menus, menuShared };

    switch (returnType) {
      case ('observable'):
        return of(db).delay(10);
      case ('promise'):
        return new Promise(resolve => {
          setTimeout(() => resolve(db), 10);
        });
      default:
        return db;
    }
  }
}
