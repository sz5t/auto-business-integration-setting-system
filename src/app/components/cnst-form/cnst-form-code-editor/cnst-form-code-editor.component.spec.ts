import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstFormCodeEditorComponent } from './cnst-form-code-editor.component';

describe('CnstFormCodeEditorComponent', () => {
  let component: CnstFormCodeEditorComponent;
  let fixture: ComponentFixture<CnstFormCodeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstFormCodeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstFormCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
