import { Component, OnInit ,Input} from '@angular/core';
const colClsType: { [type: string]: IValueOffset } = {
  md: { value: 'col-md-', offset: 'col-md-offset-' },
  sm: { value: 'col-sm-', offset: 'col-sm-offset-' },
  lg: { value: 'col-lg-', offset: 'col-lg-offset-' },
  xs: { value: 'col-xs-', offset: 'col-xs-offset-' }
};
@Component({
  selector: 'cnst-page-resolver,[cnst-page-resolver]',
  templateUrl: './cnst-page-resolver.component.html',
  styleUrls: ['./cnst-page-resolver.component.css']
})
export class CnstPageResolverComponent implements OnInit {

  @Input() viewPage;
  //判断是否是数组 Array.isArray(arr)
  _viewPage = [
    [
      {
        "title": "组织机构列表",
        "titleColor": "font-green",
        "titleIcon": "fa fa-cogs",
        "isFullScreen": true,
        "isCollapse": true,
        "blockType": "portlet",
        "size": {
          "xs": {
            "value": "12",
            "offset": ""
          },
          "sm": {
            "value": "12",
            "offset": ""
          },
          "md": {
            "value": "12",
            "offset": ""
          },
          "lg": {
            "value": "12",
            "offset": ""
          }
        },
        tabs:[
          {
            'id': 'tab1',
            'icon': 'fa fa-text',
            'color': 'text-warning',
            'title': '【SQL 语句】',
            'active': 'active in',
            'viewCfg': [
              {
                'viewId':'0001',
                'relation' : [{
                  'relationViewId': '0002',
                  'relationSendContent': [
                     { name: 'selectRow',sender:'0001',receiver:'0002', 
                     relationData: {name: 'refreshAsChild'},data:[{pid:'id',cid:'parentId'}]}
                  ]
                }],
                'component': 'form_view',
                'formHeader': {
                  'header': [
                    { title: '编号', width: '0px' },
                    { title: 'SQL语句', width: 'auto' },
                    { title: '执行方式', width: 'auto' },
                    { title: '执行状态', width: 'auto' },
                  ],
                  'deleteButton': {
                    'show': true
                  },
                  'addButton':{},
                  'keyId':'id'
                },
                'formContents': [
                  {
                    'type': 'input',
                    'inputType': 'text',
                    'name': 'id'
                  },
                  {
                    'type': 'input',
                    'inputType': 'text',
                    'name': 'execSqlStr'
                  },
                  {
                    'type': 'select',
                    'placeholder': '--请选择--',
                    'options': [
                      {
                        'text': '执行一次',
                        'value': '1'
                      },
                      {
                        'text': '执行两次',
                        'value': '2'
                      }
                    ],
                    'name': 'execSqlMethod',
                    'value': '',
                    'inputClass': 'input-medium'
                  },
                  {
                    'type': 'select',
                    'placeholder': '--请选择--',
                    'options': [
                      {
                        'text': '新增状态',
                        'value': 'new'
                      },
                      {
                        'text': '更新状态',
                        'value': 'modify'
                      }
                    ],
                    'name': 'execSqlStatus',
                    'value': '',
                    'inputClass': 'input-medium'
                  }
                ]
              },
              {
                'viewId':'0002',
                'relation' : [{
                  'relationViewId': '0001',
                  'relationType':'grid_grid_child',
                  'relationReceiveContent':[]
                }
              ],
                'component': 'form_view',
                'formHeader': {
                  'header': [
                    { title: '参数名', width: 'auto' },
                    { title: '参数替换字符串', width: 'auto' },
                    { title: '取值方式', width: 'auto' },
                    { title: '为空取值', width: 'auto' },
                    { title: '参数类型', width: 'auto' },
                    { title: '系统参数', width: 'auto' },
                    { title: '父节点id', width: 'auto' }
                  ],
                  'deleteButton': {
                    'show': true
                  },
                  'addButton':{}
                },
                'formContents':[
                  {
                    'type': 'input',
                    'inputType': 'text',
                    'name': 'paramName',
                    'helpClass': 'help-inline'
                  },
                  {
                    'type': 'input',
                    'inputType': 'text',
                    'name': 'paramReplaceStr'
                  },
                  {
                    'type': 'select',
                    'placeholder': '--请选择--',
                    'options': [
                      {
                        'text': '系统生成序号',
                        'value': '系统生成序号'
                      },
                      {
                        'text': '页面字段取当前值',
                        'value': '页面字段取当前值'
                      },
                      {
                        'text': '页面字段取原值',
                        'value': '页面字段取原值'
                      },
                      {
                        'text': '从系统参数取值',
                        'value': '从系统参数取值'
                      }
                    ],
                    'name': 'paramValueFrom',
                    'value': '',
                    'inputClass': 'input-medium'
                  },
                  {
                    'type': 'select',
                    'placeholder': '--请选择--',
                    'options': [
                      {
                        'text': '取数据库空值',
                        'value': '取数据库空值'
                      }
                    ],
                    'name': 'paramNullValue',
                    'value': '',
                    'inputClass': 'input-medium'
                  },
                  {
                    'type': 'select',
                    'placeholder': '--请选择--',
                    'options': [
                      {
                        'text': '字符',
                        'value': '字符'
                      },
                      {
                        'text': '日期',
                        'value': '日期'
                      },
                      {
                        'text': '数值',
                        'value': '数值'
                      },
                      {
                        'text': '布尔',
                        'value': '布尔'
                      }
                    ],
                    'name': 'paramDataType',
                    'value': '',
                    'inputClass': 'input-medium'
                  },
                  {
                    'type': 'select',
                    'placeholder': '--请选择--',
                    'options': [
                      {
                        'text': '用户id',
                        'value': '用户id'
                      },
                      {
                        'text': '部门id',
                        'value': '部门id'
                      },
                      {
                        'text': '角色',
                        'value': '角色'
                      }
                    ],
                    'name': 'paramFromSystem',
                    'value': '',
                    'inputClass': 'input-medium'
                  },
                  {
                    'type': 'input',
                    'inputType': 'text',
                    'name': 'parentId'
                  },
                ]
              }
            ]
          }
        ],
        "viewCfg": {
          "viewId": "area1",
          "component": "grid_view",
          "classType": "GridView",
          "toolbarsConfig": [],
          "ordering": true,
          "paging": true,
          "processing": false,
          "searching": true,
          "deferRender": true,
          "columnConfigClass": "DynamicResModule",
          "columnFilter": "Data",
          "autoWidth": true,
          "destroy": true,
          "lengthMenu": [
            "5",
            "10",
            "20",
            "30",
            "40",
            "50",
            "100"
          ],
          "rowId": "Id",
          "pagingType": "full_numbers",
          "pageLength": "5",
          "orderMulti": true,
          "select": true,
          "responsive": true,
          "columnDefs": [
            {
              "orderable": false,
              "targets": [0]
            }
          ],
          "order": [
            [1, "asc"]
          ],
          "dom": "Bfr<\"table-scrollable\"t>ip",
          "columnConfigs": [
            {
              "title": "<label class=\"mt-checkbox mt-checkbox-single mt-checkbox-outline\"> <input type=\"checkbox\" class=\"group-checkable\" data-set=\".checkboxes\" /> <span></span> </label>",
              "data": "Id",
              "renderName": {
                "type": "checkAll"
              },
              "className": "text-center"
            },
            {
              "title": "共享范围",
              "data": "ShareScope",
              "renderName": {
                "type": "notNull",
                "data": {}
              }
            },
            {
              "title": "程序集名称",
              "data": "AssemblyName",
              "renderName": {
                "type": "notNull",
                "data": {}
              }
            },
            {
              "title": "编译状态",
              "data": "BuildState",
              "renderName": {
                "type": "notNull",
                "data": {}
              }
            },
            {
              "title": "编译方式",
              "data": "BuildMode",
              "renderName": {
                "type": "notNull",
                "data": {}
              }
            },
            {
              "title": "错误消息",
              "data": "ErrorMessage",
              "renderName": {
                "type": "notNull",
                "data": {}
              }
            },
            {
              "title": "编译消息",
              "data": "BuildMessage",
              "renderName": {
                "type": "notNull"
              }
            },
            {
              "title": "上下文名称",
              "data": "ContextName",
              "renderName": {
                "type": "notNull"
              }
            },
            {
              "title": "提供者",
              "data": "ProviderName",
              "renderName": {
                "type": "notNull"
              }
            },
            {
              "title": "默认命名空间",
              "data": "DefaultNamespace",
              "renderName": {
                "type": "notNull"
              }
            },
            {
              "title": "客户编号",
              "data": "PlatCustomerId"
            },
            {
              "title": "创建时间",
              "data": "CreateTime",
              "renderName": {
                "type": "notNull",
                "data": {}
              }
            }
          ]
        }
      }
    ]
  ];
  constructor() { }

  ngOnInit() {
    if(this.viewPage){
      this._viewPage=this.viewPage;
    }
    this.layoutPass();
   

  }


  //布局格式处理
  layoutPass() {
    this._viewPage.forEach(row => {//布局行
      row.forEach(col => {//布局行内列
        if (Array.isArray(col)) {//布局行内列内行
          col.forEach(colRow => {
            //console.log('列内行');
            colRow.forEach(colRowCol => {
            //  console.log('列内行列，二级嵌套列');
              if (colRowCol.size) {
                let colCls = '';
                for (var key in colRowCol.size) {
                  if (colRowCol.size[key].value && colRowCol.size[key].value.length > 0) {
                    colCls += colClsType[key].value;
                    colCls += colRowCol.size[key].value;
                    colCls += ' ';
                  }
                  if (colRowCol.size[key].offset && colRowCol.size[key].offset.length > 0) {
                    colCls += colClsType[key].offset;
                    colCls += colRowCol.size[key].offset;
                    colCls += ' ';
                  }
                }
                colRowCol["Cls"] = colCls;
              }
            });

          });
        }
        else { //渲染具体列
         // console.log('列');
          if (col.size) {
            let colCls = '';
            for (var key in col.size) {
              if (col.size[key].value && col.size[key].value.length > 0) {
                colCls += colClsType[key].value;
                colCls += col.size[key].value;
                colCls += ' ';
              }
              if (col.size[key].offset && col.size[key].offset.length > 0) {
                colCls += colClsType[key].offset;
                colCls += col.size[key].offset;
                colCls += ' ';
              }
            }
            col["Cls"] = colCls;
          }
        }
      });
    });

    //console.log('页面布局', this._viewPage);
  }





}

export interface IValueOffset {
  value: string;
  offset: any;
}
