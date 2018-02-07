import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFooterComponent } from './cn-footer.component';

describe('CnFooterComponent', () => {
  let component: CnFooterComponent;
  let fixture: ComponentFixture<CnFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
