import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnFormSpinComponent} from './cn-form-spin.component';

describe('CnFormSpinComponent', () => {
  let component: CnFormSpinComponent;
  let fixture: ComponentFixture<CnFormSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnFormSpinComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
