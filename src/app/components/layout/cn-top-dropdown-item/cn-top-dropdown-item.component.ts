import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[cn-top-dropdown-item],cn-top-dropdown-item',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-top-dropdown-item.component.html',
  styleUrls: ['./cn-top-dropdown-item.component.css']
})
export class CnTopDropdownItemComponent implements OnInit {
  @Input() dropDownType: string;
  constructor() { }

  ngOnInit() {
  }

}
