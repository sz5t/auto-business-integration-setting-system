import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IField} from '../../form/form-models/IField';
import {IFieldConfig} from '../../form/form-models/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {CnstFormCodeMirrorComponent} from "./cnst-form-code-mirror/cnst-form-code-mirror.component";
@Component({
  selector: 'cnst-form-code-editor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-form-code-editor.component.html',
  styleUrls: ['./cnst-form-code-editor.component.css']
})
export class CnstFormCodeEditorComponent implements OnInit, AfterViewInit, IField {
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;
  _isShow = false;
  _width;
  _options = new Option('', '', true, true);
  @ViewChild(CnstFormCodeMirrorComponent) codeMirror: CnstFormCodeMirrorComponent;
  @ViewChild('select') select: ElementRef;
  @ViewChild('codeArea') codeArea: ElementRef;
  constructor() {
    this._width = document.body.offsetWidth/3 + 'px';
  }

  ngOnInit() {

  }
  ngAfterViewInit (){
    $(this.codeArea.nativeElement).hide();
    this.select.nativeElement.options.add(this._options);
    $(this.select.nativeElement).bind('click', () => {
      $(this.codeArea.nativeElement).show(100);
      this._isShow = !this._isShow;
      if(!this._isShow){
        const value = this.codeMirror.getValue();
        this._options.value = value;
        this._options.text = value;
        $(this.codeArea.nativeElement).hide(100);
      }
    });
  }
}
