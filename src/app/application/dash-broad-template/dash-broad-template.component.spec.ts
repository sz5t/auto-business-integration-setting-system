import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashBroadTemplateComponent} from './dash-broad-template.component';

describe('DashBroadTemplateComponent', () => {
  let component: DashBroadTemplateComponent;
  let fixture: ComponentFixture<DashBroadTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashBroadTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBroadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
