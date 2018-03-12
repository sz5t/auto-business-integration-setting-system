import { Component, OnInit } from '@angular/core';
import {ClientStorageService} from '../services/client-storage.service';

@Component({
  selector: 'cn-not-page',
  templateUrl: './not-page.component.html',
  styleUrls: ['./not-page.component.css']
})
export class NotPageComponent implements OnInit {
  constructor(){
    console.log('页面不存在！');
  }

  ngOnInit() {
  }

}
