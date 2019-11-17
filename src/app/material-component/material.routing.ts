import { Routes } from '@angular/router';

import { ChipsComponent } from './chips/chips.component';

// Importaciones
import { DesktopComponent } from './desktop/desktop.component';
import { MobileComponent } from './mobile/mobile.component';
import { DevicesComponent } from './devices/devices.component';
import { PruebasComponent } from './pruebas/pruebas.component';

export const MaterialRoutes: Routes = [
 
  {
    path: 'devices',
    component: DevicesComponent
  },
  {
    path: 'desktop',
    component: DesktopComponent
  },
  {
    path: 'mobile',
    component: MobileComponent
  },
  {
    path: 'pruebas',
    component: PruebasComponent
  }
];
