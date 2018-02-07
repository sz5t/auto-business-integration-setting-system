import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnPortletComponent } from './cn-portlet.component';

describe('CnPortletComponent', () => {
  let component: CnPortletComponent;
  let fixture: ComponentFixture<CnPortletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnPortletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnPortletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
