import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationSettingComponent } from './operation-setting.component';

describe('OperationSettingComponent', () => {
  let component: OperationSettingComponent;
  let fixture: ComponentFixture<OperationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
