import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPageSettingComponent } from './sub-page-setting.component';

describe('SubPageSettingComponent', () => {
  let component: SubPageSettingComponent;
  let fixture: ComponentFixture<SubPageSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubPageSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
