import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstFormRadioComponent } from './cnst-form-radio.component';

describe('CnstFormRadioComponent', () => {
  let component: CnstFormRadioComponent;
  let fixture: ComponentFixture<CnstFormRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstFormRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstFormRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
