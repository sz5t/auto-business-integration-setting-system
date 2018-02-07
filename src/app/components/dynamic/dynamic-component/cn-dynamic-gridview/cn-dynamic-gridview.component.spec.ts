import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicGridviewComponent} from './cn-dynamic-gridview.component';

describe('CnDynamicGridviewComponent', () => {
  let component: CnDynamicGridviewComponent;
  let fixture: ComponentFixture<CnDynamicGridviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicGridviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicGridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
