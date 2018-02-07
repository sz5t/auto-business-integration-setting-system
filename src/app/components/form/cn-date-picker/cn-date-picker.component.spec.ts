import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDatePickerComponent} from './cn-date-picker.component';

describe('CnDatePickerComponent', () => {
  let component: CnDatePickerComponent;
  let fixture: ComponentFixture<CnDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDatePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
