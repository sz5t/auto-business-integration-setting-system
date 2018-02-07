import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnFormSearchButtonComponent} from './cn-form-search-button.component';

describe('CnFormSearchButtonComponent', () => {
  let component: CnFormSearchButtonComponent;
  let fixture: ComponentFixture<CnFormSearchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnFormSearchButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
