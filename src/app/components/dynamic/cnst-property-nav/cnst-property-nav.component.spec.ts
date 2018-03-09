import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPropertyNavComponent } from './cnst-property-nav.component';

describe('CnstPropertyNavComponent', () => {
  let component: CnstPropertyNavComponent;
  let fixture: ComponentFixture<CnstPropertyNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPropertyNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPropertyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
