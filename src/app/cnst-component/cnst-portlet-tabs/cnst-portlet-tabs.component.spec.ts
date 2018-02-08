import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPortletTabsComponent } from './cnst-portlet-tabs.component';

describe('CnstPortletTabsComponent', () => {
  let component: CnstPortletTabsComponent;
  let fixture: ComponentFixture<CnstPortletTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPortletTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPortletTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
