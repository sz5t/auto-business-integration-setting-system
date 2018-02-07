import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicBlockPortletComponent} from './dynamic-block-portlet.component';

describe('CnDynamicBlockPortletComponent', () => {
  let component: CnDynamicBlockPortletComponent;
  let fixture: ComponentFixture<CnDynamicBlockPortletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicBlockPortletComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicBlockPortletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
