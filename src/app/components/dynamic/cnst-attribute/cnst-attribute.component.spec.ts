import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstAttributeComponent } from './cnst-attribute.component';

describe('CnstAttributeComponent', () => {
  let component: CnstAttributeComponent;
  let fixture: ComponentFixture<CnstAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
