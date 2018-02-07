import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicConfirmDialogComponent} from './dynamic-confirm-dialog.component';

describe('CnDynamicConfirmDialogComponent', () => {
  let component: CnDynamicConfirmDialogComponent;
  let fixture: ComponentFixture<CnDynamicConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicConfirmDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
