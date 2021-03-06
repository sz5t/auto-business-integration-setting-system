import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPageComponent } from './not-page.component';

describe('NotPageComponent', () => {
  let component: NotPageComponent;
  let fixture: ComponentFixture<NotPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
