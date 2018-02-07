import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplicationTemplateComponent} from './application-template.component';

describe('ApplicationTemplateComponent', () => {
  let component: ApplicationTemplateComponent;
  let fixture: ComponentFixture<ApplicationTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
