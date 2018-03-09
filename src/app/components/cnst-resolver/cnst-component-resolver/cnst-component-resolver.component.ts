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
      if (this.subjectMessage) {
        this.subjectMessage.getMessage().subscribe(value => {
         switch (value.type.type){
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
             this.subjectMessage.sendMessage({type: 'returnFormValue'}, this.componentRef.instance.getValueByViewId())
             break;
         }
        });
      }
    }
  }

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
