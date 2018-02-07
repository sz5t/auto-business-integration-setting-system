import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewTemplateComponent } from './grid-view-template.component';

describe('GridViewTemplateComponent', () => {
  let component: GridViewTemplateComponent;
  let fixture: ComponentFixture<GridViewTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridViewTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
