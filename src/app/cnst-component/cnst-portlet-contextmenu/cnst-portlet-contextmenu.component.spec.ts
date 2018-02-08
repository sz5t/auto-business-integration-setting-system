import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPortletContextmenuComponent } from './cnst-portlet-contextmenu.component';

describe('CnstPortletContextmenuComponent', () => {
  let component: CnstPortletContextmenuComponent;
  let fixture: ComponentFixture<CnstPortletContextmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPortletContextmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPortletContextmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
