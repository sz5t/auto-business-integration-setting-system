import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnTopDropdownItemComponent } from './cn-top-dropdown-item.component';

describe('CnTopDropdownItemComponent', () => {
  let component: CnTopDropdownItemComponent;
  let fixture: ComponentFixture<CnTopDropdownItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnTopDropdownItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnTopDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
