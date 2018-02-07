import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnBreadcrumbComponent } from './cn-breadcrumb.component';

describe('CnBreadcrumbComponent', () => {
  let component: CnBreadcrumbComponent;
  let fixture: ComponentFixture<CnBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
