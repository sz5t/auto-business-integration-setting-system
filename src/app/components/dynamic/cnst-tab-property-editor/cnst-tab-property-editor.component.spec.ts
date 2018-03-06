import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstTabPropertyEditorComponent } from './cnst-tab-property-editor.component';

describe('CnstTabPropertyEditorComponent', () => {
  let component: CnstTabPropertyEditorComponent;
  let fixture: ComponentFixture<CnstTabPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstTabPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstTabPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
