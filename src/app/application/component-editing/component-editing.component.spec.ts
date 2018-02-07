import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentEditingComponent } from './component-editing.component';

describe('ComponentEditingComponent', () => {
  let component: ComponentEditingComponent;
  let fixture: ComponentFixture<ComponentEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
