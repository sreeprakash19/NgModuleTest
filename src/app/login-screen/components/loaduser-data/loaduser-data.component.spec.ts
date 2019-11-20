import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaduserDataComponent } from './loaduser-data.component';

describe('LoaduserDataComponent', () => {
  let component: LoaduserDataComponent;
  let fixture: ComponentFixture<LoaduserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaduserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaduserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
