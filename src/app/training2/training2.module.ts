import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Training2PageRoutingModule } from './training2-routing.module';

import { Training2Page } from './training2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Training2PageRoutingModule
  ],
  declarations: [Training2Page]
})
export class Training2PageModule {}
