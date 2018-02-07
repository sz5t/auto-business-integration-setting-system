import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicBlockWizardComponent} from './dynamic-block-wizard.component';

describe('DynamicBlockWizardComponent', () => {
  let component: DynamicBlockWizardComponent;
  let fixture: ComponentFixture<DynamicBlockWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicBlockWizardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBlockWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
