import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraincompletePage } from './traincomplete.page';

const routes: Routes = [
  {
    path: '',
    component: TraincompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraincompletePageRoutingModule {}
