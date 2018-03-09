import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnstPageResolverComponent } from './cnst-page-resolver.component';

describe('CnstPageResolverComponent', () => {
  let component: CnstPageResolverComponent;
  let fixture: ComponentFixture<CnstPageResolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnstPageResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnstPageResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
