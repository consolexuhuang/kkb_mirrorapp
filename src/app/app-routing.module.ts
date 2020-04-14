import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./training2/training2.module').then( m => m.Training2PageModule)
    
    // loadChildren: () => import('./training/training.module').then( m => m.TrainingPageModule)
        loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then( m => m.TrainingPageModule)
  },
  {
    path: 'traincomplete',
    loadChildren: () => import('./traincomplete/traincomplete.module').then( m => m.TraincompletePageModule)
  },
  {
    path: 'readyvideo',
    loadChildren: () => import('./readyvideo/readyvideo.module').then( m => m.ReadyvideoPageModule)
  },
  {
    path: 'training2',
    loadChildren: () => import('./training2/training2.module').then( m => m.Training2PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
