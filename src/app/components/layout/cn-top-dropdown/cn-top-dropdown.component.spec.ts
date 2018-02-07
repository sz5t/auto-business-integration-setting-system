import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnTopDropdownComponent } from './cn-top-dropdown.component';

describe('CnTopDropdownComponent', () => {
  let component: CnTopDropdownComponent;
  let fixture: ComponentFixture<CnTopDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnTopDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnTopDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
