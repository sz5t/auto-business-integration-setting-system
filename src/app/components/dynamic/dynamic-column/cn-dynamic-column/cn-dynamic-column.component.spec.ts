import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicColumnComponent} from './cn-dynamic-column.component';

describe('CnDynamicColumnComponent', () => {
  let component: CnDynamicColumnComponent;
  let fixture: ComponentFixture<CnDynamicColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicColumnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
