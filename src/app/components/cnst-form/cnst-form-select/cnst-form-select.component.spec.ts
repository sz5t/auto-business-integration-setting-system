import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstFormSelectComponent } from './cnst-form-select.component';

describe('CnFormSelectComponent', () => {
  let component: CnstFormSelectComponent;
  let fixture: ComponentFixture<CnstFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
