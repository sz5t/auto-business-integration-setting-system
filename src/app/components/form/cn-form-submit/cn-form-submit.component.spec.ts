import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormSubmitComponent } from './cn-form-submit.component';

describe('CnFormSubmitComponent', () => {
  let component: CnFormSubmitComponent;
  let fixture: ComponentFixture<CnFormSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
