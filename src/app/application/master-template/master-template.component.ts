import {Component, Input, OnInit} from '@angular/core';
import {IFieldConfig} from '../../components/form/form-models/IFieldConfig';
import {Validators} from '@angular/forms';
import {Configuration} from '../../framework/configuration';
import {AppConfigData, ConfigService} from '../../services/config.service';
import {ActivatedRoute} from '@angular/router';
import {MasterGridViewResolver, SlaverGridViewResolver} from '../../framework/resolver/gridview.resolver';
import {LayoutResolver} from '../../framework/resolver/layout.resolver';
import {ConfigAdapter} from '../../framework/adapter/config.adapter';

@Component({
  selector: 'cn-master-template',
  templateUrl: './master-template.component.html',
  styleUrls: ['./master-template.component.css']
})
export class MasterTemplateComponent implements OnInit {
  _masterConfig;

  constructor(private route: ActivatedRoute, private configService: ConfigService) {
    this.route.params.subscribe(params => {
      this._masterConfig = ConfigAdapter.moduleFinder(
        this.configService.getProjectConfig(),
        params.name
      )[0].totalArea.pageConfigs[0];
    });
  }

  ngOnInit() {
    /*this.masterGridConfig = {
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
        url:Configuration.web_api + 'AppProject',
        dataSrc:''
      },
      autoWidth:true,
      destroy:true,
      lengthMenu: [ 5, 10, 20, 30, 40, 50, 100 ],
      rowId:'Id',
      pagingType:'full_numbers',
      pageLength:10,
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
          title:'Code', data:'Code',
        },
        {
          title:'名称', data:'Name',
          render:function(data, type, row, meta){
            return data==null?'':data;
          }
        },
        {
          title:'简明', data:'ShortName',
        },
        {
          title:'状态', data:'State',
        },
        {
          title:'备注', data:'Remark',
        },
        {
          title:'创建时间', data:'CreateTime',
        }
      ],
      "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
      buttons:[]
    };
    this.masterButtonsConfig = [
      {
        id: 'new', text: '新建', color: 'green-jungle', img:'fa fa-plus', type: 'button',
        "events":{
          "eventType":"dialog",
          "execution":{
            "api":"AppProject",
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
            "api":"AppProject",
            "method":"delete",
            "keyId":"Id"
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
            "api":"AppProject",
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
            "api":"AppProject",
            "method":"get",
            "keyID":"Id",
            "callback":""
          }
        }
      },
      {
        id: 'search', text: '查询',color: 'blue', img:'fa fa-search', type: 'button',
        "events":{
          "eventType":"dialog",
          "execution":{
            "api":"AppProject",
            "method":"get",
            "keyID":"",
            "callback":""
          }
        }
      }
    ];
    this.masterFormConfig = [
      {
        type:'input',
        inputType:'text',
        name:'code',
        label:'编码：',
        helpText:'系统自动生成编码',
        inputClass:'input-inline input-medium',
        placeholder:'Code:NB-001',
        helpClass:'help-inline',
        validation:[Validators.required,Validators.minLength(6)]
      },
      {
        type:'input',
        inputType:'text',
        name:'text',
        label:'名称：',
        icon:'fa fa-book',
        iconPstn:'left',
        inputClass:'input-group',
        validation:[Validators.required]
      },
      {
        type:'input',
        inputType:'text',
        name:'shortName',
        label:'简化名称：',
        inputClass:'input-medium input-group',
        icon:'fa fa-bookmark-o',
        iconPstn:'right',
        helpText:'简化名称建议不超过20个字符',
        helpClass:'help-inline',
        validation:[Validators.maxLength(20)]
      },
      {
        type:'select',
        placeholder:'--请选择--',
        options:[
          {text:'计划',value:'计划'},
          {text:'开始',value:'开始'}
        ],
        name:'status',
        label:'状态：',
        value:'',
        inputClass:'input-medium'
      },
      {
        type:'checkbox',
        options:[
          {checked:'',disabled:false,value:'1',label:'特性1'},
          {checked:'',disabled:false,value:'2',label:'特性2'},
          {checked:'',disabled:false,value:'3',label:'特性3'}
        ],
        name:'feature',
        label:'特性：',
        inputClass:'mt-checkbox-list' // mt-checkbox-inline
      },
      {
        type:'radio',
        options:[
          {checked:'',disabled:false,value:'1',label:'独立'},
          {checked:'',disabled:false,value:'2',label:'共享'},
          {checked:'',disabled:false,value:'3',label:'指定区域'}
        ],
        name:'scope',
        label:'使用范围：',
        inputClass:'mt-radio-list' // mt-checkbox-list
      },
      {
        type:'textarea',
        name:'remark',
        label:'备注：'
      },
      {
        type:'button',
        name:'submit',
        disabled:true
      }
    ];*/
  }

}
