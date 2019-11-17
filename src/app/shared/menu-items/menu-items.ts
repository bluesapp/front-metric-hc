import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  // { state: 'starter', name: 'Home', type: 'link', icon: 'home' },
  { state: 'devices', type: 'link', name: 'Devices', icon: 'important_devices' },
  { state: 'desktop', type: 'link', name: 'Desktop', icon: 'laptop_windows' },
  { state: 'mobile', type: 'link', name: 'Mobile', icon: 'mobile_friendly' },
  // { state: 'pruebas', type: 'link', name: 'Pruebas', icon: 'filter_tilt_shift' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
