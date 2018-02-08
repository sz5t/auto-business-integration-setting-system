import { Component, OnInit,ViewEncapsulation ,Input,AfterViewInit} from '@angular/core';

@Component({
  selector: 'cnst-portlet-tabconcent,[cnst-portlet-tabconcent]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-portlet-tabconcent.component.html',
  styleUrls: ['./cnst-portlet-tabconcent.component.css']
})
export class CnstPortletTabconcentComponent implements OnInit,AfterViewInit {

 @Input() tabconcent:any;//tab标签页内容
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){

  }
}
