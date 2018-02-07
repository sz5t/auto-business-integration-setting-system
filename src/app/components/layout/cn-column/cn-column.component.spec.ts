import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CnColumnComponent} from './cn-column.component';

describe('CnColumnComponent', () => {
  let component: CnColumnComponent;
  let fixture: ComponentFixture<CnColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnColumnComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
