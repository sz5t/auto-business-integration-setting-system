import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'cnst-property-nav',
  templateUrl: './cnst-property-nav.component.html',
  styleUrls: ['./cnst-property-nav.component.css']
})
export class CnstPropertyNavComponent implements OnInit, OnChanges {

  @Input() navsData;
  _navString;
  constructor() { }
  ngOnChanges(): void {
    if(this.navsData){
      const s = [];
      this.navsData.forEach(nav => {
        s.push(`【${nav}】`);
      });
      this._navString = s.join('—');
    }
  }
  ngOnInit() {
  }

}
