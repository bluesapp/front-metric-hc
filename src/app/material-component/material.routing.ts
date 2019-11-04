import { Routes } from '@angular/router';

import { ChipsComponent } from './chips/chips.component';

// Importaciones
import { DesktopComponent } from './desktop/desktop.component';
import { MobileComponent } from './mobile/mobile.component';

export const MaterialRoutes: Routes = [
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'desktop',
    component: DesktopComponent
  },
  {
    path: 'mobile',
    component: MobileComponent
  }
];
