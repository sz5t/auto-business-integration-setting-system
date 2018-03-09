import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
declare let CodeMirror: any;
declare let $: any;
@Component({
  selector: 'cnst-form-code-mirror',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-form-code-mirror.component.html',
  styleUrls: ['./cnst-form-code-mirror.component.css']
})
export class CnstFormCodeMirrorComponent implements OnInit, AfterViewInit {
  @ViewChild('CodeMirror') codeEditor: ElementRef;
  editor;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit () {
    this.editor = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
      mode: 'text/x-sql',
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: true,
      extraKeys: {'Ctrl-Space': 'autocomplete'},
      hintOptions: {
        tables: {
          users: {name: null, score: null, birthDate: null},
          countries: {name: null, population: null, size: null}
        }
      }
    });
  }
  getValue(){
    return this.editor.getValue();
  }
}
