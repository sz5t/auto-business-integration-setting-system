import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormButtonComponent } from './cn-form-button.component';

describe('CnFormButtonComponent', () => {
  let component: CnFormButtonComponent;
  let fixture: ComponentFixture<CnFormButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
