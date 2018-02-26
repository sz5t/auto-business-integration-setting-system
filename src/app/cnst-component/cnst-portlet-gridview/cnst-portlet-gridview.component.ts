import {
  Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation,
  EventEmitter, Output
} from '@angular/core';
import { ICnstPortlet } from '../cnst-portlet';
declare let $:any;
@Component({
  selector: 'cnst-portlet-gridview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-portlet-gridview.component.html',
  styleUrls: ['./cnst-portlet-gridview.component.css']
})
export class CnstPortletGridviewComponent implements OnInit, ICnstPortlet,AfterViewInit{
  @Input() config: any;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('gridview') gridview: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    $(this.gridview.nativeElement).bootstrapTable({
      height: 300,
      sortOrder: 'asc',
      striped: false,
      locale: 'zh-CN',
      columns: [{
        field: 'ZD1',
        sortable: true,
        sortOrder: "asc",
        title: '字段1',
        width: 120,
        align: 'center',
      },
      {
        field: 'ZD2',
        sortable: true,
        sortOrder: "asc",
        title: '字段2',
        width: 120,
        align: 'center',
      },
      {
        field: 'ZD3',
        sortable: true,
        sortOrder: "asc",
        title: '字段3',
        width: 120,
        align: 'center',
      }]

    });

  }

}
