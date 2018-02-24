import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstDynamicFormComponent } from './cnst-dynamic-form.component';

describe('CnDynamicFormComponent', () => {
  let component: CnstDynamicFormComponent;
  let fixture: ComponentFixture<CnstDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
