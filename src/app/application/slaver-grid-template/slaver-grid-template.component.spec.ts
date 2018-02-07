import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaverGridTemplateComponent } from './slaver-grid-template.component';

describe('SlaverGridTemplateComponent', () => {
  let component: SlaverGridTemplateComponent;
  let fixture: ComponentFixture<SlaverGridTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaverGridTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaverGridTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
