import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicDetailDialogComponent} from './dynamic-detail-dialog.component';

describe('DynamicDetailDialogComponent', () => {
  let component: DynamicDetailDialogComponent;
  let fixture: ComponentFixture<DynamicDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicDetailDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
