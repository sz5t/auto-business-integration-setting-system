import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CnDynamicFormDialogComponent} from './dynamic-form-dialog.component';

describe('CnDynamicFormDialogComponent', () => {
  let component: CnDynamicFormDialogComponent;
  let fixture: ComponentFixture<CnDynamicFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnDynamicFormDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDynamicFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
