import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstFormCodeMirrorComponent } from './cnst-form-code-mirror.component';

describe('CnstFormCodeMirrorComponent', () => {
  let component: CnstFormCodeMirrorComponent;
  let fixture: ComponentFixture<CnstFormCodeMirrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstFormCodeMirrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstFormCodeMirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
