import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicFormsComponent} from './cn-dynamic-forms.component';

describe('CnDynamicFormsComponent', () => {
  let component: CnDynamicFormsComponent;
  let fixture: ComponentFixture<CnDynamicFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicFormsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
