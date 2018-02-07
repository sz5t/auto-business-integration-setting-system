import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDateRangePickerComponent} from './cn-date-range-picker.component';

describe('CnDateRangePickerComponent', () => {
  let component: CnDateRangePickerComponent;
  let fixture: ComponentFixture<CnDateRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDateRangePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
