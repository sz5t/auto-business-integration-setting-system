import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstComponentResolverComponent } from './cnst-component-resolver.component';

describe('CnstComponentResolverComponent', () => {
  let component: CnstComponentResolverComponent;
  let fixture: ComponentFixture<CnstComponentResolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstComponentResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstComponentResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
