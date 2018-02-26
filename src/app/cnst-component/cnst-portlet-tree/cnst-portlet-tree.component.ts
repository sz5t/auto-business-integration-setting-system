import {Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, EventEmitter, Output} from '@angular/core';
import { ICnstPortlet } from '../cnst-portlet';
declare let $:any;
@Component({
  selector: 'cnst-portlet-tree',
  templateUrl: './cnst-portlet-tree.component.html',
  styleUrls: ['./cnst-portlet-tree.component.css']
})
export class CnstPortletTreeComponent implements OnInit,ICnstPortlet,AfterViewInit {
  @Input() config: any;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  @ViewChild('tree') tree: ElementRef;
  ngOnInit() {
  }

  ngAfterViewInit(){
    $(this.tree.nativeElement).jstree({
      "core": {
        "themes": {
          "responsive": false
        },
        // so that create works
        "check_callback": true,
        'data': [{
          "text": "树节点01",
          "children": [{
            "text": "树节点0101",
            "state": {
              "selected": true
            }
          }, {
            "text": "树节点0102",
            "icon": "fa fa-folder icon-state-danger",
            "children": [
              { "text": "树节点010201", "icon": "fa fa-file icon-state-warning" },
              { "text": "树节点010202", "icon": "fa fa-file icon-state-success" }
            ]
          }]
        },
          "其他节点"
        ]
      },
      "types": {
        "default": {
          "icon": "fa fa-folder icon-state-warning icon-lg"
        },
        "file": {
          "icon": "fa fa-file icon-state-warning icon-lg"
        }
      },
      "state": { "key": "demo2" },
      "plugins": ["dnd", "state", "types"]
    });
  }


}
