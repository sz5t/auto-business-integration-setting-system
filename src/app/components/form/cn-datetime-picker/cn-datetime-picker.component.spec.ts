import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDatetimePickerComponent} from './cn-datetime-picker.component';

describe('CnDatetimePickerComponent', () => {
  let component: CnDatetimePickerComponent;
  let fixture: ComponentFixture<CnDatetimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDatetimePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
