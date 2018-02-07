import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineDemoComponent} from './timeline-demo.component';

describe('TimelineDemoComponent', () => {
  let component: TimelineDemoComponent;
  let fixture: ComponentFixture<TimelineDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineDemoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
