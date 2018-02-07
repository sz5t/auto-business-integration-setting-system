import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicDetailComponent} from './cn-dynamic-detail.component';

describe('CnDynamicDetailComponent', () => {
  let component: CnDynamicDetailComponent;
  let fixture: ComponentFixture<CnDynamicDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
