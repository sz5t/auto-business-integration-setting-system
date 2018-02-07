import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridViewComponent } from './cn-gridview.component';

describe('CnGridViewComponent', () => {
  let component: CnGridViewComponent;
  let fixture: ComponentFixture<CnGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
