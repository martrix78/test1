import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profession',
    loadChildren: () => import('./pages/profession/profession.module').then(m => m.ProfessionPageModule)
  },
  {
    path: 'profession-edit',
    loadChildren: () => import('./pages/profession-edit/profession-edit.module').then(m => m.ProfessionEditPageModule)
  },
  {
    path: 'user-edit',
    loadChildren: () => import('./pages/user-edit/user-edit.module').then(m => m.UserEditPageModule)
  },
  {
    path: 'user-view',
    loadChildren: () => import('./pages/user-view/user-view.module').then(m => m.UserViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
