import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioFinalComponent } from './audio-final.component';
import { AudioRecordComponent } from './components/audio-record/audio-record.component';
import { StartNullComponent } from './components/start-null/start-null.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageRecordComponent } from './components/image-record/image-record.component';
import { AudioClipComponent } from './components/audio-clip/audio-clip.component';
import { StartOldComponent } from './components/start-old/start-old.component';

const routes: Routes = [
{ path: '', component: AudioFinalComponent },
{ path: 'start', component: AudioRecordComponent },
{ path: 'startnull', component: StartNullComponent },
{ path: 'startold', component: StartOldComponent },
{ path: 'imagegallery', component: ImageGalleryComponent },
{ path: 'imagerecord', component: ImageRecordComponent },
{ path: 'audioclip', component: AudioClipComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioFinalRoutingModule { }
