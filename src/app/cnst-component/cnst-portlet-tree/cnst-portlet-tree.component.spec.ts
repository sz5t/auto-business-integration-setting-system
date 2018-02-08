import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPortletTreeComponent } from './cnst-portlet-tree.component';

describe('CnstPortletTreeComponent', () => {
  let component: CnstPortletTreeComponent;
  let fixture: ComponentFixture<CnstPortletTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPortletTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPortletTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
