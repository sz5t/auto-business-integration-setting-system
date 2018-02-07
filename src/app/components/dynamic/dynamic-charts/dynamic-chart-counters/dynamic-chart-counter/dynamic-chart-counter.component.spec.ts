import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicChartCounterComponent} from './dynamic-chart-counter.component';

describe('CnDynamicChartCounterComponent', () => {
  let component: CnDynamicChartCounterComponent;
  let fixture: ComponentFixture<CnDynamicChartCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicChartCounterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicChartCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
