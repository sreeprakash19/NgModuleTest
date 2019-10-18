import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFinalComponent } from './feature-final.component';

describe('FeatureFinalComponent', () => {
  let component: FeatureFinalComponent;
  let fixture: ComponentFixture<FeatureFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
