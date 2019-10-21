import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallLoginComponent } from './install-login.component';

describe('InstallLoginComponent', () => {
  let component: InstallLoginComponent;
  let fixture: ComponentFixture<InstallLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
