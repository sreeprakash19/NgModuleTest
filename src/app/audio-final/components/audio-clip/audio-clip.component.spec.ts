import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioClipComponent } from './audio-clip.component';

describe('AudioClipComponent', () => {
  let component: AudioClipComponent;
  let fixture: ComponentFixture<AudioClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
