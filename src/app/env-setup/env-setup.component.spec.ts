import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvSetupComponent } from './env-setup.component';

describe('EnvSetupComponent', () => {
  let component: EnvSetupComponent;
  let fixture: ComponentFixture<EnvSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
