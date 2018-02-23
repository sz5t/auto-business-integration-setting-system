import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstDatasourceComponent } from './cnst-datasource.component';

describe('CnstDatasourceComponent', () => {
  let component: CnstDatasourceComponent;
  let fixture: ComponentFixture<CnstDatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstDatasourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
