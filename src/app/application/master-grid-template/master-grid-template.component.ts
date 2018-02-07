import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Broadcaster} from "../../broadcast/broadcaster";

@Component({
  selector: 'cn-master-grid-template',
  templateUrl: './master-grid-template.component.html',
  styleUrls: ['./master-grid-template.component.css']
})
export class MasterGridTemplateComponent implements OnInit{
  // @Input() funcName:string;
  @Input() masterConfig;
  _rowCallback:Function;
  _selectedItem;
  constructor(private broadcast:Broadcaster) {

  }
  ngOnInit() {
    this._rowCallback = (row:Node, data:any[] | Object ,index: number) => {
      $('td',row).unbind('click');
      $('td',row).bind('click',() => {
        this._selectedItem = data;
        this.broadcast.broadcast('master', data);
      });
    };
  }
}
