import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraincompletePageRoutingModule } from './traincomplete-routing.module';

import { TraincompletePage } from './traincomplete.page';

// echart
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraincompletePageRoutingModule,

    NgxEchartsModule
  ],
  declarations: [TraincompletePage]
})
export class TraincompletePageModule {}
