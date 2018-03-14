import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SubjectMessageService} from "../../services/subject-message.service";
import {CommonData} from "../../data/common-data";
import {LocalStorageService} from "ngx-store";
import {ClientStorageService} from "../../services/client-storage.service";
declare let $: any;
@Component({
  selector: 'cn-sub-page-setting',
  templateUrl: './sub-page-setting.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sub-page-setting.component.css']
})
export class SubPageSettingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectFunc') selectFunc: ElementRef;
  _config = {
    'viewId': 'viewId_subPage',
    'component': 'form_view',
    'formHeader': {
      'header': [
        { title: '子页面编号', width: 'auto' },
        { title: '子页面名称', width: 'auto' },
        { title: '所属功能', width: 'auto' },
        { title: '启用状态', width: 'auto' },
      ],
      'deleteButton': {
        'show': true
      },
      'addButton': {},
      'keyId': 'id'
    },
    'formContents': [
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'id',
        //'disabled': 'disabled'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'subPageName'
      },
      {
        'type': 'input',
        'inputType': 'text',
        'name': 'subPageParentFunc'
      },
    ]
  };
  _subscrib;
  _funcList = CommonData.funcList;
  _subPageList = [];
  constructor(private subject: SubjectMessageService, private localStorage: ClientStorageService) { }
  ngOnInit() {
    const subPageList = this.localStorage.getLocalStorage('subPageList');
    if(subPageList) {
      this._subPageList = subPageList;
    }
    console.log(this._subPageList);
  }

  ngAfterViewInit() {
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectFunc.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue) {
        const funcName = $(this.selectFunc.nativeElement).selectpicker('val');
        let list;
        if(this._subPageList) {
          list = this._subPageList.filter(sub => {
            return sub.subPageParentFunc === funcName;
          });
        } else {
          list = [{subPageParentFunc: funcName}];
        }
        // 向表单组件注册获取表单值的消息和消息内容
        this.subject.sendMessage(
          { type: 'setValue' },
          [
            {
              viewId: 'viewId_subPage',
              data: list
            }
          ]
        );
      }
    });
    //this.subject.sendMessage({ type: 'setValue' }, [{viewId: 'viewId_subPage', data:[{subPageParentFunc: funcName}]}]);
  }

  save(event?) {
    if(!this._subscrib){
      // 接收表单回传的表单值消息
      this._subscrib = this.subject.getMessage().subscribe(formData => {
        if(formData.type.type === 'returnFormValue') {
          const funcName = $(this.selectFunc.nativeElement).selectpicker('val');
          console.log(formData.data.data);
          if(formData.data && (formData.data.viewId === 'viewId_subPage')){

            for (let i = 0; i < this._subPageList.length; i++) {
              if (this._subPageList[i].subPageParentFunc === funcName) {   //如果找到要被删除的数字所在的数组下标
                this._subPageList.splice(i, 1);   //从i位置开始删除1个数字
                i = i - 1;    //解决方案
              }
            }
            formData.data.data.forEach(item => {
              item.subPageParentFunc = funcName;
              this._subPageList.push(item);
            });
            this.localStorage.setLocalStorage('subPageList', this._subPageList);
          }
          // 将子页面信息回写到模块列表中
        }
      });
    }
    // 通知表单回传当前表单值
    this.subject.sendMessage({type: 'getValue'}, [{viewId: 'viewId_subPage'}]);
  }

  ngOnDestroy() {
    if(this._subscrib) {
      this._subscrib.unsubscribe();
    }
  }
}
