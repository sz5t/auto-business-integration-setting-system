import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPortletTabconcentComponent } from './cnst-portlet-tabconcent.component';

describe('CnstPortletTabconcentComponent', () => {
  let component: CnstPortletTabconcentComponent;
  let fixture: ComponentFixture<CnstPortletTabconcentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPortletTabconcentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPortletTabconcentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
