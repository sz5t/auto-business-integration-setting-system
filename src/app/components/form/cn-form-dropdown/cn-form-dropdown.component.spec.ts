import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnFormDropdownComponent} from './cn-form-dropdown.component';

describe('CnFormDropdownComponent', () => {
  let component: CnFormDropdownComponent;
  let fixture: ComponentFixture<CnFormDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnFormDropdownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
