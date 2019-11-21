import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserUpdateComponent } from './login-user-update.component';

describe('LoginUserUpdateComponent', () => {
  let component: LoginUserUpdateComponent;
  let fixture: ComponentFixture<LoginUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
