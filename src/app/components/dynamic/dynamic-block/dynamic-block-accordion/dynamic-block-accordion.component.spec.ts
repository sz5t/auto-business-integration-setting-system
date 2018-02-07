import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicBlockAccordionComponent} from './dynamic-block-accordion.component';

describe('CnDynamicBlockAccordionComponent', () => {
  let component: CnDynamicBlockAccordionComponent;
  let fixture: ComponentFixture<CnDynamicBlockAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicBlockAccordionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicBlockAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
