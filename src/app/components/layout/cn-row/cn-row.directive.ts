import {Directive, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'cnRow',
})
export class CnRowDirective implements OnInit {
  @Input() config;

  constructor() {
  }

  ngOnInit() {

  }
}
