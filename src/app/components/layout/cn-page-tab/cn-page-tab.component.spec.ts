import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnPageTabComponent } from './cn-page-tab.component';

describe('CnPageTabComponent', () => {
  let component: CnPageTabComponent;
  let fixture: ComponentFixture<CnPageTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnPageTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnPageTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
