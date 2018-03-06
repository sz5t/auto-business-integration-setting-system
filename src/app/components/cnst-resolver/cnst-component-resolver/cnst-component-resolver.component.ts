import { Component, OnInit, Input,ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { CnstDynamicFormComponent } from '../../cnst-form/cnst-dynamic-form.component';

@Component({
  selector: 'cnst-component-resolver,[cnst-component-resolver]',
  templateUrl: './cnst-component-resolver.component.html',
  styleUrls: ['./cnst-component-resolver.component.css']
})
export class CnstComponentResolverComponent implements OnInit,AfterViewInit {
  componentRef: ComponentRef<CnstDynamicFormComponent>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() configTabs;//标签页
  @Input() config;//组件

 
  _isArray;
  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this._isArray=Array.isArray(this.config);
  }
  ngAfterViewInit(): void {
   
    //创建组件
    if(!this._isArray && this.config){
     
      console.log('this.container:',this.container);
      this.container.clear();
     // const factory = this.resolver.resolveComponentFactory<CnstDynamicFormComponent>();
     // this.componentRef = this.container.createComponent(factory);
      const factory: ComponentFactory<CnstDynamicFormComponent> =
       this.resolver.resolveComponentFactory(CnstDynamicFormComponent);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.configsTitle=this.config.formHeader;
      this.componentRef.instance.ConfigsContent=this.config.formContent;
      this.componentRef.instance.configs=[];
    }

  }

  checkTab(event?, tab?: any){
    this.configTabs.forEach(tabItem => {
      tabItem.active = '';
    });
    const tabIndex = this.configTabs.findIndex(item => {
      return item === tab;
    });
    this.configTabs[tabIndex].active = 'active in';
  }

}
