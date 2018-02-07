import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicBlockPortletTabsComponent} from './dynamic-block-portlet-tabs.component';

describe('CnDynamicBlockPortletTabsComponent', () => {
  let component: CnDynamicBlockPortletTabsComponent;
  let fixture: ComponentFixture<CnDynamicBlockPortletTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicBlockPortletTabsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicBlockPortletTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
