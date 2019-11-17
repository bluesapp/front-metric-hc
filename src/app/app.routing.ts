import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './material-component/devices/devices.component';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/devices',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: '**',
        redirectTo: '/devices'
      }
    ]

  }

];

// @NgModule({
//   imports: [RouterModule.forRoot(AppRoutes, { useHash: true })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }



