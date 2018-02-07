import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnContextmenuComponent } from './cn-contextmenu.component';

describe('CnContextmenuComponent', () => {
  let component: CnContextmenuComponent;
  let fixture: ComponentFixture<CnContextmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnContextmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnContextmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
