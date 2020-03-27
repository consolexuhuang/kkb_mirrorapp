import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadyvideoPage } from './readyvideo.page';

const routes: Routes = [
  {
    path: '',
    component: ReadyvideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadyvideoPageRoutingModule {}
