import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterGridTemplateComponent } from './master-grid-template.component';

describe('MasterGridTemplateComponent', () => {
  let component: MasterGridTemplateComponent;
  let fixture: ComponentFixture<MasterGridTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterGridTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterGridTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
