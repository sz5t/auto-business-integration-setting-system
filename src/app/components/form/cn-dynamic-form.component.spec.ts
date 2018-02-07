import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnDynamicFormComponent } from './cn-dynamic-form.component';

describe('CnDynamicFormComponent', () => {
  let component: CnDynamicFormComponent;
  let fixture: ComponentFixture<CnDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
