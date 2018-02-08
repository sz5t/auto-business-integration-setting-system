import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPortletComponent } from './cnst-portlet.component';

describe('CnstPortletComponent', () => {
  let component: CnstPortletComponent;
  let fixture: ComponentFixture<CnstPortletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPortletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPortletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
