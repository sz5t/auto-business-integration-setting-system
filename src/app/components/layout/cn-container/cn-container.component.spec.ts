import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnContainerComponent } from './cn-container.component';

describe('CnContainerComponent', () => {
  let component: CnContainerComponent;
  let fixture: ComponentFixture<CnContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
