import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnLoginComponent} from './cn-login.component';

describe('CnLoginComponent', () => {
  let component: CnLoginComponent;
  let fixture: ComponentFixture<CnLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
