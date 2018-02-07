import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSlaverTemplateComponent } from './master-slaver-template.component';

describe('MasterSlaverTemplateComponent', () => {
  let component: MasterSlaverTemplateComponent;
  let fixture: ComponentFixture<MasterSlaverTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSlaverTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSlaverTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
