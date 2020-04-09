import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Training2Page } from './training2.page';

const routes: Routes = [
  {
    path: '',
    component: Training2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Training2PageRoutingModule {}
