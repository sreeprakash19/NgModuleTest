import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioFinalRoutingModule } from './audio-final-routing.module';
import { AudioFinalComponent, DialogAudioComponent } from './audio-final.component';
import { AudioRecordComponent, DialogAfterAudio, DialogAfterOldAudio } from './components/audio-record/audio-record.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {OverlayContainer} from '@angular/cdk/overlay';
import { StartNullComponent, DialogAudioNullComponent, DialogVideoNullComponent } from './components/start-null/start-null.component';
import { StartOldComponent, DialogAudioOldComponent, DialogVideoOldComponent } from './components/start-old/start-old.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageRecordComponent } from './components/image-record/image-record.component';
import { AudioClipComponent } from './components/audio-clip/audio-clip.component';

@NgModule({
  declarations: [
    AudioFinalComponent, DialogAudioComponent,
    AudioRecordComponent, 
    DialogAfterAudio, 
    DialogAfterOldAudio, 
    StartNullComponent, DialogAudioNullComponent,DialogVideoNullComponent,
    StartOldComponent, DialogAudioOldComponent, DialogVideoOldComponent, ImageGalleryComponent, ImageRecordComponent, AudioClipComponent
  ],
  imports: [

    AudioFinalRoutingModule,
    CommonModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule

  ],
  entryComponents: [
    DialogAudioComponent,
    DialogAfterAudio,
    DialogAfterOldAudio,
    DialogAudioNullComponent, DialogVideoNullComponent,
    DialogAudioOldComponent, DialogVideoOldComponent
  ]
})
export class AudioFinalModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
 }
