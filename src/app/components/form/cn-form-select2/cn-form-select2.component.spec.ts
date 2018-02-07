import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormSelect2Component } from './cn-form-select2.component';

describe('CnFormSelect2Component', () => {
  let component: CnFormSelect2Component;
  let fixture: ComponentFixture<CnFormSelect2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormSelect2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
