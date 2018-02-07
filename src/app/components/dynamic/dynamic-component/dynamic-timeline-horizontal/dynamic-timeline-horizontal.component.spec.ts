import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicTimelineHorizontalComponent} from './dynamic-timeline-horizontal.component';

describe('CnDynamicTimelineHorizontalComponent', () => {
  let component: CnDynamicTimelineHorizontalComponent;
  let fixture: ComponentFixture<CnDynamicTimelineHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicTimelineHorizontalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicTimelineHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
