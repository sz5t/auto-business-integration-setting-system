import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPortletGridviewComponent } from './cnst-portlet-gridview.component';

describe('CnstPortletGridviewComponent', () => {
  let component: CnstPortletGridviewComponent;
  let fixture: ComponentFixture<CnstPortletGridviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPortletGridviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPortletGridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
