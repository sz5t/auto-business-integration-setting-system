import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGridTemplateComponent } from './tree-grid-template.component';

describe('TreeGridTemplateComponent', () => {
  let component: TreeGridTemplateComponent;
  let fixture: ComponentFixture<TreeGridTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeGridTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGridTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
