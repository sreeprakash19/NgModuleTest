import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilystartComponent } from './familystart.component';

describe('FamilystartComponent', () => {
  let component: FamilystartComponent;
  let fixture: ComponentFixture<FamilystartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilystartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilystartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
