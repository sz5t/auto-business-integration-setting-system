import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Input, OnChanges, OnInit, Output, Type,
  ViewContainerRef
} from '@angular/core';
import {IDynamicDialog, IDynamicDialogField} from './dynamic-dialog.model';
import {CnDynamicFormDialogComponent} from './dynamic-form-dialog/dynamic-form-dialog.component';
import {CnDynamicConfirmDialogComponent} from './dynamic-confirm-dialog/dynamic-confirm-dialog.component';
import {CnDynamicDetailDialogComponent} from "./dynamic-detail-dialog/dynamic-detail-dialog.component";
const components: { [type: string]: Type<IDynamicDialog> } = {
  form_dialog: CnDynamicFormDialogComponent,
  confirm_dialog: CnDynamicConfirmDialogComponent,
  //detail_dialog: CnDynamicDetailDialogComponent
};


@Directive({
  selector: '[cnDynamicDialog]'
})
export class DynamicDialogDirective implements OnInit, IDynamicDialog, OnChanges {
  dialogConfigField: IDynamicDialogField;
  @Input() GUID;
  @Input() dialogConfig;
  @Input() handleData;
  @Input() selectedIds: Map<string, string> = new Map<string, string>();
  @Output() eventCallback: EventEmitter<any> = new EventEmitter<any>();
  component: ComponentRef<IDynamicDialog>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  ngOnInit(): void {

    this.initField();
    this.buildComponent();
  }

  ngOnChanges() {
    if (this.handleData && this.component) {
      this.component.instance.handleData = this.handleData;
    }
    if (this.selectedIds && this.component) {
      this.component.instance.selectedIds = this.selectedIds;
    }

  }

  initField(): void {
    const confirmDialog: IDynamicDialogField = {
      GUID: this.GUID,
      title: this.dialogConfig.events.title ? this.dialogConfig.events.title : '',
      text: this.dialogConfig.events.text ? this.dialogConfig.events.text : '',
      handleData: this.handleData,
      selectedIds: this.selectedIds,
      eventSetting: this.dialogConfig.events.execution ? this.dialogConfig.events.execution : null,
      dialogConfig: this.dialogConfig.events,
      eventType: this.dialogConfig.events.eventType,
      eventCallBack: this.eventCallback
    };
    const formDialog: IDynamicDialogField = {
      GUID: this.GUID,
      title: this.dialogConfig.events.title ? this.dialogConfig.events.title : '',
      handleData: this.handleData,
      selectedIds: null,
      eventSetting: this.dialogConfig.events.execution ? this.dialogConfig.events.execution : null,
      dialogConfig: this.dialogConfig.formConfig,
      eventType: this.dialogConfig.events.eventType,
      eventCallBack: this.eventCallback
    };
    const dialogConfigCreator: { [type: string]: IDynamicDialogField } = {
      confirm_dialog: confirmDialog,
      form_dialog: formDialog,
    };
    this.dialogConfigField =
      dialogConfigCreator[this.dialogConfig.events.eventType];
  }

  buildComponent(): void {
    const componentFactory = this.resolver.resolveComponentFactory<IDynamicDialog>(components[this.dialogConfig.events.eventType]);
    this.component = this.container.createComponent(componentFactory);
    this.component.instance.dialogConfigField = this.dialogConfigField;
    this.component.instance.handleData = this.handleData;
    this.component.instance.selectedIds = this.selectedIds;
  }
}
