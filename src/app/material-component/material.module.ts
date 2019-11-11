import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';

import { ChipsComponent } from './chips/chips.component';
import {MatPaginatorModule} from '@angular/material/paginator';

//Importaciones

import { DesktopComponent } from './desktop/desktop.component';
import { MobileComponent } from './mobile/mobile.component';
import { ChartsModule } from 'ng2-charts';
import { PruebasComponent } from './pruebas/pruebas.component';
import { TablesComponent } from '../components/tables/tables.component';
import { GraphicComponent } from '../components/graphic/graphic.component';

// Reloader
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartsModule,
    MatPaginatorModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,3,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#FE2E2E',
      secondaryColour: '#FE2E2E',
      tertiaryColour: '#FE2E2E',
      fullScreenBackdrop: true
    })
  ],
  providers: [],
  declarations: [
    ChipsComponent,
    DesktopComponent,
    MobileComponent,
    PruebasComponent,
    TablesComponent,
    GraphicComponent
    
  ]
})
export class MaterialComponentsModule { }
