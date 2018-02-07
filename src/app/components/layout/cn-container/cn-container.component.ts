import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: '[cn-container],cn-container',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-container.component.html',
  styleUrls: ['./cn-container.component.css']
})
export class CnContainerComponent implements OnInit {
  @HostBinding('class.page-container') hasContainer = true;
  @HostBinding('class.component') component = true;
  constructor() { }

  ngOnInit() {
  }

}
