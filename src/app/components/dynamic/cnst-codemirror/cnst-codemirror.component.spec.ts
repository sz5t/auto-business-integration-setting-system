import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstCodemirrorComponent } from './cnst-codemirror.component';

describe('CnstCodemirrorComponent', () => {
  let component: CnstCodemirrorComponent;
  let fixture: ComponentFixture<CnstCodemirrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstCodemirrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstCodemirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
