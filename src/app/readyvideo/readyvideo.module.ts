import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadyvideoPageRoutingModule } from './readyvideo-routing.module';

import { ReadyvideoPage } from './readyvideo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadyvideoPageRoutingModule
  ],
  declarations: [ReadyvideoPage]
})
export class ReadyvideoPageModule {}
