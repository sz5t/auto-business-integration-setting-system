import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnTreeComponent } from './cn-tree.component';

describe('CnTreeComponent', () => {
  let component: CnTreeComponent;
  let fixture: ComponentFixture<CnTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
