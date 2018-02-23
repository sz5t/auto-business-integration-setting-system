import { Component, OnInit,ViewEncapsulation,ViewChild,ElementRef,Input } from '@angular/core';
declare let CodeMirror:any;
@Component({
  selector: 'cnst-codemirror,[cnst-codemirror]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-codemirror.component.html',
  styleUrls: ['./cnst-codemirror.component.css']
})
export class CnstCodemirrorComponent implements OnInit {
  @ViewChild('CodeMirror') codeeditor: ElementRef;
  editor;
  constructor() { }
  ngOnInit() {
      this.editor = CodeMirror.fromTextArea(this.codeeditor.nativeElement, {
      mode: "text/x-sql",
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets : true,
      autofocus: true,
      extraKeys: {"Ctrl-Space": "autocomplete"},
      hintOptions: {tables: {
        users: {name: null, score: null, birthDate: null},
        countries: {name: null, population: null, size: null}
      }}
    });
  }

  getValue(){
    alert( this.editor.getValue());
  };
 

 
}
