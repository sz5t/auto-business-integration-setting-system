import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {IFieldConfig} from "../../components/form/form-models/IFieldConfig";
import {Subject} from "rxjs/Subject";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {EVENT_TYPE} from "../../framework/event/button-event";
import {Validators} from "@angular/forms";
import {Configuration} from "../../framework/configuration";
import {ConfigService} from "../../services/config.service";
import {ConfigAdapter} from "../../framework/adapter/config.adapter";
declare let $:any;
@Component({
  selector: 'cn-master-slaver-template',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './master-slaver-template.component.html',
  styleUrls: ['./master-slaver-template.component.css']
})
export class MasterSlaverTemplateComponent implements OnInit {
  /*masterFormConfig:IFieldConfig[];
  slaverFormConfig:IFieldConfig[];

  masterButtonsConfig;
  slaverButtonsConfig;

  masterGridConfig;
  slaverGridConfig;*/
  _masterConfig;
  _slaverConfig;
  constructor(private route:ActivatedRoute,private configService:ConfigService) {
    this.route.params.subscribe(params => {
      const data = ConfigAdapter.moduleFinder(
        this.configService.getProjectConfig(),
        params.name
      );
      this._masterConfig = data[0].totalArea.pageConfigs[0];
      this._slaverConfig = data[0].totalArea.pageConfigs[1];
    });
  }
  ngOnInit(){
    /*this.masterFormConfig = [];
    this.slaverFormConfig = [
      {
        type:'input',
        inputType:'text',
        name:'code',
        label:'资源名称：',
        helpText:'资源编译后自动生成',
        inputClass:'input-inline input-medium',
        placeholder:'例如：Company.cn.app',
        helpClass:'help-inline',
        validation:[Validators.required,Validators.minLength(6)]
      },
      {
        type:'input',
        inputType:'text',
        name:'text',
        label:'命名空间：',
        icon:'fa fa-book',
        iconPstn:'left',
        inputClass:'input-group',
        validation:[Validators.required]
      },
      {
        type:'input',
        inputType:'text',
        name:'shortName',
        label:'程序集：',
        inputClass:'input-medium input-group',
        icon:'fa fa-bookmark-o',
        iconPstn:'right',
        helpClass:'help-inline',
        validation:[Validators.maxLength(20)]
      },
      {
        type:'select',
        placeholder:'--请选择--',
        options:[
          {text:'编译成功',value:'编译成功'},
          {text:'正在定义',value:'正在定义'}
        ],
        name:'BuildName',
        label:'编译状态：',
        value:'',
        inputClass:'input-medium'
      },
      {
        type:'select',
        placeholder:'--请选择--',
        options:[
          {text:'手动',value:'手动'},
          {text:'自动',value:'自动'}
        ],
        name:'BuildMode',
        label:'编译方式：',
        value:'',
        inputClass:'input-medium'
      },
      {
        type:'radio',
        options:[
          {checked:'',disabled:false,value:'1',label:'独立'},
          {checked:'',disabled:false,value:'2',label:'共享'},
          {checked:'',disabled:false,value:'3',label:'指定区域'}
        ],
        name:'shareScope',
        label:'使用范围：',
        inputClass:'mt-radio-list' // mt-checkbox-list
      },
      {
        type:'textarea',
        name:'Note',
        label:'备注：'
      },
      {
        type:'button',
        name:'submit',
        disabled:true
      }
    ];
    this.masterButtonsConfig = [
      {
      id: 'new', text: '新建', color: 'green-jungle', img:'fa fa-plus', type: 'button',
      "events":{
        "eventType":"dialog",
        "execution":{
          "api":"DynamicResModule",
          "method":"post",
          "keyID":"",
          "callback":""
        }
      },
        formConfig:[
          {
            type:'input',
            inputType:'text',
            name:'AssemblyName',
            label:'程序集名称：',
            helpText:'动态读取程序集名称',
            inputClass:'input-inline input-medium',
            placeholder:'例如：Company.cn.app',
            helpClass:'help-inline',
            validation:[Validators.required,Validators.minLength(6)]
          },
          {
            type:'input',
            inputType:'text',
            name:'ContextName',
            label:'上下文名称：',
            icon:'fa fa-book',
            iconPstn:'left',
            inputClass:'input-group',
            validation:[Validators.required]
          },
          {
            type:'input',
            inputType:'text',
            name:'ProviderName',
            label:'提供者：',
            inputClass:'input-medium input-group',
            icon:'fa fa-bookmark-o',
            iconPstn:'right',
            helpClass:'help-inline',
            validation:[Validators.maxLength(20)]
          },
          {
            type:'select',
            placeholder:'--请选择--',
            options:[
              {text:'编译成功',value:'编译成功'},
              {text:'正在定义',value:'正在定义'}
            ],
            name:'BuildState',
            label:'编译状态：',
            value:'',
            inputClass:'input-medium'
          },
          {
            type:'select',
            placeholder:'--请选择--',
            options:[
              {text:'手动',value:'手动'},
              {text:'自动',value:'自动'}
            ],
            name:'BuildMode',
            label:'编译方式：',
            value:'',
            inputClass:'input-medium'
          },
          {
            type:'input',
            inputType:'text',
            name:'DefaultNamespace',
            label:'命名空间：',
            inputClass:'input-group',
            icon:'fa fa-bookmark-o',
            iconPstn:'left',
            helpClass:'help-inline',
            helpText:'默认为程序编译后提供的命名空间',
            validation:[Validators.required]
          },
          {
            type:'input',
            inputType:'text',
            name:'EntitiesName',
            label:'实体名称：',
            inputClass:'input-group',
            icon:'fa fa-bookmark-o',
            iconPstn:'left',
            helpClass:'help-inline',
            helpText:''
          },
          {
            type:'checkbox',
            options:[
              {checked:'checked',disabled:false,value:'1',label:'启用'},
              {checked:'',disabled:false,value:'2',label:'禁用'}
            ],
            name:'shareScope',
            label:'使用范围：',
            inputClass:'mt-checkbox-inline' // mt-checkbox-list
          },
          {
            type:'textarea',
            name:'remark',
            label:'备注：'
          },
          {
            type:'button',
            name:'submit',
            disabled:false
          }
      ]
    },
      {
        id: 'del', text: '删除', color: 'red', img:'fa fa-remove', type: 'button',
        "events":{
          "title":"确认提示",
          "text":"确定要删除选中的记录吗?",
          "eventType":"confirm",
          "execution":{
            "api":"DynamicResModule",
            "method":"delete",
            "keyId":"DrmId"
          }
        }
      },
      {
        id: 'sub', text: '提交', color: 'green', img:'fa fa-save', type: 'button',
        "events":{
          "title":"确认提示",
          "text":"是否提交当前数据?",
          "eventType":"confirm",
          "execution":{
            "api":"DynamicResModule",
            "method":"proc",
            //"keyId":"Id"
          }
        }
      },
      {
        id: 'modify', text: '修改',color: 'yellow', img:'fa fa-edit', type: 'button',
        "events":{
          "eventType":"dialog",
          "execution":{
            "api":"DynamicResModule",
            "method":"put",
            "keyID":"DrmId",
            "callback":""
          }
        },formConfig:[
        {
          type:'input',
          inputType:'text',
          name:'DrmId',
          label:'ID：',
          //helpText:'',
          inputClass:'input-inline input-medium',
          placeholder:'例如：Company.cn.app',
          helpClass:'help-inline',
          validation:[Validators.required,Validators.minLength(6)]
        },
        {
          type:'input',
          inputType:'text',
          name:'AssemblyName',
          label:'程序集名称：',
          helpText:'动态读取程序集名称',
          inputClass:'input-inline input-medium',
          placeholder:'例如：Company.cn.app',
          helpClass:'help-inline',
          validation:[Validators.required,Validators.minLength(6)]
        },
        {
          type:'input',
          inputType:'text',
          name:'ContextName',
          label:'上下文名称：',
          icon:'fa fa-book',
          iconPstn:'left',
          inputClass:'input-group',
          validation:[Validators.required]
        },
        {
          type:'input',
          inputType:'text',
          name:'ProviderName',
          label:'提供者：',
          inputClass:'input-medium input-group',
          icon:'fa fa-bookmark-o',
          iconPstn:'right',
          helpClass:'help-inline',
          validation:[Validators.maxLength(20)]
        },
        {
          type:'select',
          placeholder:'--请选择--',
          options:[
            {text:'编译成功',value:'编译成功'},
            {text:'正在定义',value:'正在定义'}
          ],
          name:'BuildState',
          label:'编译状态：',
          value:'',
          inputClass:'input-medium'
        },
        {
          type:'select',
          placeholder:'--请选择--',
          options:[
            {text:'手动',value:'手动'},
            {text:'自动',value:'自动'}
          ],
          name:'BuildMode',
          label:'编译方式：',
          value:'',
          inputClass:'input-medium'
        },
        {
          type:'input',
          inputType:'text',
          name:'DefaultNamespace',
          label:'命名空间：',
          inputClass:'input-group',
          icon:'fa fa-bookmark-o',
          iconPstn:'left',
          helpClass:'help-inline',
          helpText:'默认为程序编译后提供的命名空间',
          validation:[Validators.required]
        },
        {
          type:'input',
          inputType:'text',
          name:'EntitiesName',
          label:'实体名称：',
          inputClass:'input-group',
          icon:'fa fa-bookmark-o',
          iconPstn:'left',
          helpClass:'help-inline',
          helpText:''
        },
        {
          type:'radio',
          options:[
            {checked:'checked',disabled:false,value:'true',label:'启用'},
            {checked:'',disabled:false,value:'false',label:'禁用'}
          ],
          name:'shareScope',
          label:'启用状态：',
          inputClass:'mt-checkbox-inline' // mt-checkbox-list
        },
        {
          type:'textarea',
          name:'remark',
          label:'备注：'
        },
        {
          type:'button',
          name:'submit',
          disabled:false
        }
      ]
      },
      {
        id: 'search', text: '查询',color: 'blue', img:'fa fa-search', type: 'button',
        "events":{
          "eventType":"dialog",
          "execution":{
            "api":"DynamicResModule",
            "method":"get",
            "keyID":"",
            "callback":""
          }
        }
      }
    ];
    this.slaverButtonsConfig = [
      {
      id: 'new', text: '新建', color: 'green-jungle', img:'fa fa-plus', type: 'button',
      "events":{
        "eventType":"dialog",
        "execution":{
          "api":"ResourceType",
          "method":"get",
          "keyID":"",
          "callback":""
        }
      }
    },
      {
        id: 'del', text: '删除', color: 'red', img:'fa fa-remove', type: 'button',
        "events":{
          "title":"确认提示",
          "text":"确定要删除选中的记录吗?",
          "eventType":"confirm",
          "execution":{
            "api":"ResourceType",
            "method":"delete",
            "keyId":"RtId"
          }
        }
      },
      {
        id: 'sub', text: '提交', color: 'green', img:'fa fa-save', type: 'button',
        "events":{
          "title":"确认提示",
          "text":"是否提交当前数据?",
          "eventType":"confirm",
          "execution":{
            "api":"ResourceType",
            "method":"proc",
            //"keyId":"Id"
          }
        }
      },
      {
        id: 'modify', text: '修改',color: 'yellow', img:'fa fa-edit', type: 'button',
        "events":{
          "eventType":"dialog",
          "execution":{
            "api":"ResourceType",
            "method":"get",
            "keyID":"RtId",
            "callback":""
          }
        }
      },
      {
        id: 'search', text: '查询',color: 'blue', img:'fa fa-search', type: 'button',
        "events":{
          "eventType":"dialog",
          "execution":{
            "api":"ResourceType",
            "method":"get",
            "keyID":"",
            "callback":""
          }
        }
      }];
    this.masterGridConfig = {
      "language": {
        "processing":   "处理中...",
        "lengthMenu":   "显示 _MENU_ 项结果",
        "zeroRecords":  "没有匹配结果",
        "info":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "infoEmpty":    "显示第 0 至 0 项结果，共 0 项",
        "infoFiltered": "(由 _MAX_ 项结果过滤)",
        "infoPostFix":  "",
        "search":       "搜索:",
        "url":          "",
        "emptyTable":     "表中数据为空",
        "loadingRecords": "载入中...",
        "thousands":  ",",
        "paginate": {
          "first":    "首页",
          "previous": "上一页",
          "next":     "下一页",
          "last":     "末页"
        },
        "aria": {
          "sortAscending":  ": 以升序排列此列",
          "sortDescending": ": 以降序排列此列"
        }
      },
      ordering:true,
      paging:true,
      processing:true,
      //scrollX:true,
      searching:true,
      deferRender:true,
      //data:result,
      ajax:{
        url:Configuration.web_api + 'DynamicResModule',
        dataSrc:''
      },
      autoWidth:true,
      destroy:true,
      lengthMenu: [ 5, 10, 20, 30, 40, 50, 100 ],
      rowId:'DrmId',
      pagingType:'full_numbers',
      pageLength:5,
      orderMulti:true,
      select:true,
      responsive: true,
      columnDefs:[
        {
          targets:0,
          orderable:false
        }
      ],
      columns:[
        {
          title:'<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> ' +
          '<input type="checkbox" class="group-checkable" id="checkall" />' +
          ' <span></span> </label>',
          data:'Id',
          render:(data ,type ,row, meta) =>{
            return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> ' +
              '<input type="checkbox" class="group-checkable" name="checkchild" value="'+data+'" />' +
              ' <span></span> </label>';
          },
          className: 'text-center'
        },
        {
          title:'共享范围', data:'ShareScope',
        },
        {
          title:'程序集名称', data:'AssemblyName',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'编译状态', data:'BuildState',
        },
        {
          title:'编译方式', data:'BuildMode',
        },
        {
          title:'错误消息', data:'ErrorMessage',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'编译消息', data:'BuildMessage',
          render:function(data, type, row, meta){
          return data==null?'':data;
          }
        },
        {
          title:'上下文名称', data:'ContextName',
          render:function(data, type, row, meta){
          return data==null?'':data;
        }
        },
        {
          title:'提供者', data:'ProviderName',
          render:function(data, type, row, meta){
          return data==null?'':data;
        }
        },
        {
          title:'默认命名空间', data:'DefaultNamespace',
          render:function(data, type, row, meta){
          return data==null?'':data;
        }
        },
        {
          title:'客户编号', data:'PlatCustomerId',
        },
        {
          title:'是否启用', data:'Enabled',
        },
        {
          title:'创建时间', data:'CreateTime',
        }
      ],
      "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
      buttons:[]
  };
    this.slaverGridConfig = {
      "language": {
        "processing":   "处理中...",
        "lengthMenu":   "显示 _MENU_ 项结果",
        "zeroRecords":  "没有匹配结果",
        "info":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "infoEmpty":    "显示第 0 至 0 项结果，共 0 项",
        "infoFiltered": "(由 _MAX_ 项结果过滤)",
        "infoPostFix":  "",
        "search":       "搜索:",
        "url":          "",
        "emptyTable":     "表中数据为空",
        "loadingRecords": "载入中...",
        "thousands":  ",",
        "paginate": {
          "first":    "首页",
          "previous": "上一页",
          "next":     "下一页",
          "last":     "末页"
        },
        "aria": {
          "sortAscending":  ": 以升序排列此列",
          "sortDescending": ": 以降序排列此列"
        }
      },
      ordering:true,
      paging:true,
      processing:true,
      //scrollX:true,
      searching:true,
      deferRender:true,
      //data:result,
      ajax:{
        url:Configuration.web_api + 'ResourceType',
        dataSrc:''
      },
      autoWidth:true,
      destroy:true,
      lengthMenu: [ 5, 10, 20, 30, 40, 50, 100 ],
      rowId:'DtId',
      pagingType:'full_numbers',
      pageLength:5,
      orderMulti:true,
      select:true,
      responsive: true,
      columnDefs:[
        {
          targets:0,
          orderable:false
        }
      ],
      columns:[
        {
          title:'<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> ' +
          '<input type="checkbox" class="group-checkable" id="checkall" />' +
          ' <span></span> </label>',
          data:'Id',
          render:(data ,type ,row, meta) =>{
            return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> ' +
              '<input type="checkbox" class="group-checkable" name="checkchild" value="'+data+'" />' +
              ' <span></span> </label>';
          },
          className: 'text-center'
        },
        {
          title:'资源名称', data:'Name',
        },
        {
          title:'编译状态', data:'OwnerNameSpace',
        },
        {
          title:'编译方式', data:'OwnerAssembly',
        },
        {
          title:'编译消息', data:'ShareScope',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'上下文名称', data:'BuildMode',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'提供者', data:'BuildState',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'默认命名空间', data:'TableType',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'备注', data:'Note',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'客户编号', data:'PlatCustomerId',
        },
        {
          title:'是否启用', data:'Enabled',
        },
        {
          title:'创建时间', data:'CreateTime',
        }
      ],
      "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
      buttons:[]
    };
    this.filterConfig =  [
      {
        "classType": "SFDW_Classes.TEntityLink",
        "MasterClass": "DynamicResModule",
        "SlaveClass": "ResourceType",
        "PropLinks": [
          {
            "classType": "SFDW_Classes.TPropertyLink",
            "MasterProp": "PlatCustomerId",
            "SlaveProp": "PlatCustomerId"
          },
          {
            "classType": "SFDW_Classes.TPropertyLink",
            "MasterProp": "DrmId",
            "SlaveProp": "DrmId"
          }
        ]
      }
    ]*/
  }
}
