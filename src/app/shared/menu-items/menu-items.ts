import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'starter', name: 'Home', type: 'link', icon: 'home' },
  { state: 'desktop', type: 'link', name: 'Desktop', icon: 'laptop_windows' },
  { state: 'mobile', type: 'link', name: 'Mobile', icon: 'mobile_friendly' },
  { state: 'pruebas', type: 'link', name: 'Pruebas', icon: 'filter_tilt_shift' },
  //{ state: 'chips', type: 'link', name: 'Prueba HTTP', icon: 'vignette' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
