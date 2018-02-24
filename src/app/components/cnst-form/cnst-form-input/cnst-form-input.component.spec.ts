import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormInputComponent } from './cnst-form-input.component';

describe('CnFormInputComponent', () => {
  let component: CnFormInputComponent;
  let fixture: ComponentFixture<CnFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
