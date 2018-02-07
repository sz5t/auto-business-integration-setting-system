import {Component, OnInit, ViewEncapsulation} from '@angular/core';
declare let $: any;
declare let toastr: any;
@Component({
  selector: 'cn-toast',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-toast.component.html',
  styleUrls: ['./cn-toast.component.css']
})
export class CnToastComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }

  showToast(type, title, msg) {
    toastr.option = this[type]();
    const $toast = toastr[type](msg, title);
  }
  private success(){
    return {
      'closeButton': true,
      'debug': false,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '1000',
      'hideDuration': '1000',
      'timeOut': '3000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
  private info(){
    return {
      'closeButton': true,
      'debug': false,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '1000',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
  private warning(){
    return {
      'closeButton': true,
      'debug': false,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '1000',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
  private error(){
    return {
      'closeButton': true,
      'debug': false,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '1000',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
  customer(toastConfig){
    return toastConfig;
  }
}

export class ToastType{
  static TOAST_SUCCESS = 'success';
  static TOAST_INFO = 'info';
  static TOAST_WARNING = 'warning';
  static TOAST_ERROR = 'error';
}
