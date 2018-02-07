import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CnDynamicChartCountersComponent} from './dynamic-chart-counters.component';

describe('CnDynamicChartCountersComponent', () => {
  let component: CnDynamicChartCountersComponent;
  let fixture: ComponentFixture<CnDynamicChartCountersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicChartCountersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicChartCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
