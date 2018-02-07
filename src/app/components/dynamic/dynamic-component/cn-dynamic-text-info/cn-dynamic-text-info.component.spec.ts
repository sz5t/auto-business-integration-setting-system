import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnDynamicTextInfoComponent } from './cn-dynamic-text-info.component';

describe('CnDynamicTextInfoComponent', () => {
  let component: CnDynamicTextInfoComponent;
  let fixture: ComponentFixture<CnDynamicTextInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnDynamicTextInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicTextInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
