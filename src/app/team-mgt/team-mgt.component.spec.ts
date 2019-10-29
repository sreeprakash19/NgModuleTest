import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMgtComponent } from './team-mgt.component';

describe('TeamMgtComponent', () => {
  let component: TeamMgtComponent;
  let fixture: ComponentFixture<TeamMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
