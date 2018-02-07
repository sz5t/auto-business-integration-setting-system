import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnToastComponent } from './cn-toast.component';

describe('CnToastComponent', () => {
  let component: CnToastComponent;
  let fixture: ComponentFixture<CnToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
