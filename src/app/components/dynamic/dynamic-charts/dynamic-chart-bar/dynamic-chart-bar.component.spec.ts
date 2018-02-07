import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicChartBarComponent} from './dynamic-chart-bar.component';

describe('CnDynamicChartBarComponent', () => {
  let component: CnDynamicChartBarComponent;
  let fixture: ComponentFixture<CnDynamicChartBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicChartBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
