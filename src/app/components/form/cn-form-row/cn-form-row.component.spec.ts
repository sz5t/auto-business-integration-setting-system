import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnFormRowComponent} from './cn-form-row.component';

describe('CnFormRowComponent', () => {
  let component: CnFormRowComponent;
  let fixture: ComponentFixture<CnFormRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnFormRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
