import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnLoginSystemComponent } from './cn-login-system.component';

describe('CnLoginSystemComponent', () => {
  let component: CnLoginSystemComponent;
  let fixture: ComponentFixture<CnLoginSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnLoginSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnLoginSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
