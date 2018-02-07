import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnTopMenuComponent } from './cn-top-menu.component';

describe('CnTopMenuComponent', () => {
  let component: CnTopMenuComponent;
  let fixture: ComponentFixture<CnTopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnTopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
