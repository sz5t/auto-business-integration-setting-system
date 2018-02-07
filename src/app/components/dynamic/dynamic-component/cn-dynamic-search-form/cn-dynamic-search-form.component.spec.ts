import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicSearchFormComponent} from './cn-dynamic-search-form.component';

describe('CnDynamicSearchFormComponent', () => {
  let component: CnDynamicSearchFormComponent;
  let fixture: ComponentFixture<CnDynamicSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicSearchFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
