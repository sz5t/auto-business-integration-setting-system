import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'cn-my-test',
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.css']
})
export class MyTestComponent implements OnInit {
  web_api;
  constructor() {
    this.web_api = environment.web_api +'当前登录用户：'+ $('#sysFlag').val();
  }

  ngOnInit() {
  }

}
