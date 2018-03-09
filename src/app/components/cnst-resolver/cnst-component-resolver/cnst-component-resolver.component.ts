import {
  Component, OnInit, Input, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver,
  ComponentFactory, ComponentRef, OnChanges
} from '@angular/core';
import { CnstDynamicFormComponent } from '../../cnst-form/cnst-dynamic-form.component';
import { SubjectMessageService } from "../../../services/subject-message.service";

@Component({
  selector: 'cnst-component-resolver,[cnst-component-resolver]',
  templateUrl: './cnst-component-resolver.component.html',
  styleUrls: ['./cnst-component-resolver.component.css']
})
export class CnstComponentResolverComponent implements OnInit, AfterViewInit, OnChanges {
  componentRef: ComponentRef<CnstDynamicFormComponent>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() configTabs; //标签页
  @Input() config; //组件
  _isArray;
  constructor(
    private resolver: ComponentFactoryResolver,
    private subjectMessage: SubjectMessageService
  ) {

  }
  ngOnInit() {
    this._isArray = Array.isArray(this.config);

  }
  ngOnChanges() {

  }
  ngAfterViewInit(): void {

    // 创建组件
    if (!this._isArray && this.config) {
      //this.container.clear();
      // const factory = this.resolver.resolveComponentFactory<CnstDynamicFormComponent>();
      // this.componentRef = this.container.createComponent(factory);
      const factory: ComponentFactory<CnstDynamicFormComponent> =
        this.resolver.resolveComponentFactory(CnstDynamicFormComponent);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.configsTitle = this.config.formHeader;
      this.componentRef.instance.ConfigsContent = this.config.formContents ? this.config.formContents : [];
      this.componentRef.instance.configs = this.config.formContent ? this.config.formContent : [];
      this.componentRef.instance.relation=this.config.relation?this.config.relation:[];
      if (this.subjectMessage) {
        this.subjectMessage.getMessage().subscribe(value => {
          switch (value.type.type) {
            case 'setValue':
              if (Array.isArray(value.data)) {
                value.data.forEach(element => {
                  if (element.viewId === this.config.viewId) {
                    this.componentRef.instance.setViewFormValue(element.viewId, element.data);
                  }
                });
              }
              break;
            case 'getValue':
              this.subjectMessage.sendMessage({ type: 'returnFormValue' }, this.componentRef.instance.getValueByViewId())
              break;
          }
        });
      }

      // 判断组件的关系是否存在
      if (this.config.relation) {
        // 遍历关系，对于每个组件的
        this.config.relation.forEach(relation => {
          // 发布消息 （当自己的某个事件执行时触发），将消息参数传递到组件内部，组件内部定义一个方法数组，
          // 当该方法需要发布消息，则发布消息，if（方法数组，消息参数是true，
          // 发布消息的数据组装格式[{},{}] 可能一个事件会触发多个消息，每个消息的组装都不相同【方法1】，
          // 或者接受的时候，遍历看自己能接收谁发布的消息，但是第一种可以根据相应的关系，组装数据  ）
          if (relation.relationSendContent) {
            relation.relationSendContent.forEach(relationSend => {
             this.componentRef.instance.formSendMessage(relationSend);
             
            });

          }
          // 接收消息 (接收到消息后，触发自己的操作)
          if (relation.relationReceiveContent) {

            this.subjectMessage.getMessage().subscribe(value => {
              switch (value.type.type) {
                case 'relation':
                if(value.data.receiver===this.config.viewId){
                      this.componentRef.instance.formReceiveMessage(value.data);
                   
                }
                break;
              }
           

          });
          }

        });

      }

    }
  }


  //关系结构
  relation = [{
    relationViewId: '有关系的组件标识id',
    relationSendContent: [
      { name: '主表刷新子表',sender:'发给方',receiver:'接收方', data: {} }
    ],
    relationReceiveContent: [
      { name: '子表刷新主表',sender:'发送方', receiver:'接收方', data: {} }
    ]
  }]

  //赋值结构{viewId:,data:[]?{}}

  checkTab(event?, tab?: any) {
    this.configTabs.forEach(tabItem => {
      tabItem.active = '';
    });
    const tabIndex = this.configTabs.findIndex(item => {
      return item === tab;
    });
    this.configTabs[tabIndex].active = 'active in';
  }

}
