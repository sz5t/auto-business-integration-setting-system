import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ICnComponent} from '../../../component-models/component.interface';
import {Broadcaster} from '../../../../broadcast/broadcaster';
import {Subscription} from 'rxjs/Subscription';
import {diagnosticInfoFromTemplateInfo} from '@angular/language-service/src/utils';
import {CnDynamicFormsComponent} from '../cn-dynamic-form/cn-dynamic-forms.component';
import {ApiService} from '../../../../services/api.service';
import {ButtonEvent} from '../../../../framework/event/button-event';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'cn-dynamic-text-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-dynamic-text-info.component.html',
  styleUrls: ['./cn-dynamic-text-info.component.css']
})
export class CnDynamicTextInfoComponent implements OnInit, ICnComponent, OnDestroy {
  @ViewChild(CnDynamicFormsComponent)
  formView: CnDynamicFormsComponent;
  @Input() componentConfig: any;
  formConfig;
  _subscribe: Subscription;
  _text = '';
  _method = 'get';
  _textInfoCfg;
  constructor(private _broadcast: Broadcaster, private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    /*this.textInfoCfg = this.componentConfig.textInfoCfg;
    console.log(this.textInfoCfg);
    this._detail = this.textInfoCfg.infoDetail.value;
    this._title = this.textInfoCfg.infoTitle.value;

    this._noteType = this.componentConfig.noteType ? this.componentConfig.noteType : '';*/
    this.formConfig = this.componentConfig.formConfig;
    this.registBroadcast();
  }

  registBroadcast() {
    this._subscribe = this._broadcast.on<any>(this.componentConfig.parentViewId).subscribe(data => {
      this.bindInfo(data.parentNodeItem);
      this.bindFormValue(data.parentNodeItem);
    });
  }

  bindInfo(data){
    this._textInfoCfg = this.componentConfig.textInfoCfg;
    const title = data[this._textInfoCfg['infoTitle'].name];
    const text = data[this._textInfoCfg['infoText'].name];
    const detail = data[this._textInfoCfg['infoDetail'].name];
    this._text = `<div class="note ${this._textInfoCfg.noteType}">
                    <div class="note note-info">
                      <h3>${title ? title : '资源异常'}</h3>
                    </div>
                    <div class="well">
                      ${text ? `<h4>${text}</h4>` : ''}
                      ${detail ? `<pre>${detail}</pre>` : ''}
                    </div>
                </div>`;
  }

  bindFormValue(data){
    if (this.formConfig) {
      this.formConfig.forEach((item) => {
        if (data[item.name]){
          this.formView.setValue(item.name, data[item.name]);
        } else {
          this.formView.setValue(item.name, '');
        }
        if (item.type === 'submit'){
          this._method = item.value;
        }
      });
    }
  }

  reload(data?) {
    let url = '';
    let title;
    let text;
    let detail;

    const params = this.formView.getControlValue('params');
    if (data.Value) {
      url = data.Value;
    }
    if (params && params.length > 0){
      url = url + '?' + params;
    }
    const event = new ButtonEvent();
    event.execute(this.apiService, url, this._method).subscribe(
      result => {
        title = data.Value + `<span class="font-green-jungle"> 执行成功 <i class="fa fa-check"></i></span>`;
        text = result.Message;
        detail = this.sanitizer.bypassSecurityTrustHtml(this.syntaxHighlight(result));
        this._text = `<div class="note ${this._textInfoCfg.noteType}">
                    <div class="note note-info">
                      <h3>${title}</h3>
                    </div>
                    <div class="well">
                      ${text ? `<h4>${text}</h4>` : ''}
                      ${detail ? `<pre>${detail}</pre>` : ''}
                    </div>
                </div>`;
        // this._title = '执行成功 状态：' + result.Status;
        // this._text = result.Message;
        // this._detail = this.sanitizer.bypassSecurityTrustHtml(this.syntaxHighlight(result));
      },
      error => {
        title = data.Value + `<span class="font-red"> 出现异常 <i class="fa fa-warning"></i></span>`;
        detail = this.sanitizer.bypassSecurityTrustHtml(this.syntaxHighlight(error));
        this._text = `<div class="note note-danger">
                    <div class="note note-info">
                      <h3>${title}</h3>
                    </div>
                    <div class="well">
                      ${text ? `<h4>${text}</h4>` : ''}
                      ${detail ? `<pre>${detail}</pre>` : ''}
                    </div>
                </div>`;
      }
    );
  }

  syntaxHighlight(json) {
   if (typeof json !== 'string') {
     json = JSON.stringify(json, (key, value) => {
       if (typeof(value) === 'function'){
         return Function.prototype.toString.call(value);
       }
       return value;
     }, 2);
     }
  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
     let cls = 'number';
     if (/^"/.test(match)) {
       if (/:$/.test(match)) {
         cls = 'key';
         } else {
         cls = 'string';
         }
       } else if (/true|false/.test(match)) {
       cls = 'boolean';
       } else if (/null/.test(match)) {
       cls = 'null';
       }
     return '<span class="' + cls + '">' + match + '</span>';
     });
   }

  ngOnDestroy(): void {
    if (this._subscribe) {
      this._subscribe.unsubscribe();
    }
  }
}
